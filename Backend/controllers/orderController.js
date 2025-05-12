import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import Razorpay from 'razorpay'

//Payment gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


const currency  = 'usd'
const deliveryCharge = 10;

const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData  = {
            userId,
            items,                  
            address,                
            amount,                
            paymentMethod: 'COD',   
            payment:false,         
            date:Date.now()        
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({success:true, message:'Order Placed'})
    
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});

    }
}



const placeOrderStripe = async (req, res) => {
     try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;
        const orderData  = {
            userId,
            items,                  
            address,                
            amount,                
            paymentMethod: 'Stripe',   
            payment:false,         
            date:Date.now()        
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges',
                },
                unit_amount:deliveryCharge*100,
            },  
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true, session_url:session.url})
    
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});

    }
}


const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body;
    console.log('success  ',success);
    console.log('orderId  ',orderId);
    try {
        if(success=== 'true'){
            await OrderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true})
        } else{
            await OrderModel.findByIdAndDelete(orderId);
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }

}


const placeOrderRazorpay = async (req, res) => {
    try {
        
        const {userId, items, amount, address} = req.body;
        const orderData  = {
            userId,
            items,                  
            address,                
            amount,                
            paymentMethod: 'Razorpay',   
            payment:false,         
            date:Date.now()        
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        const options = {
            amount : amount * 100,
            currency:currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order) =>{
            if(error){
                console.log(error);
                res.json({success:false, message:error.message});
            } else {
                res.json({success:true, order})
            }
        })



    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});

    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log('orderInfo', orderInfo);
        if(orderInfo.status === 'paid'){
            await OrderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true, message:'Payment Successful'})
        }
        else{
            res.json({success:false, message:'Payment Failed'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
    
}

const allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({success:true, orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
        
    }
}


const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await OrderModel.find({userId});
        res.json({success:true, orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }

}



const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        const updatedOrder = await OrderModel.findOneAndUpdate({_id:orderId}, {status});
        res.json({success:true, message:"Updated status "})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus , verifyStripe, verifyRazorpay};

