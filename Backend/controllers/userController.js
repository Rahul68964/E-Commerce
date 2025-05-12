import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
import userModel from '../models/userModel.js'



const createtoken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {   
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createtoken(user._id)
            return res.json({success:true, token})
        }
        else{
            return res.json({success:false, message:"Inavalid username or password"});
        }  
        
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message})
    }
}


const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const exist = await userModel.findOne({email})

        if(exist){
            return res.json({success: false , message:'User already exist'})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false , message:'Please enter valid email '})
        }
        if(password.length < 8 ){
            return res.json({success: false , message:'Please enter a strong password'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const user = await newuser.save();
        const token = createtoken(user._id);
        
        res.json({success:true, token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }


    
}


const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Invalid credentials"})
    }
}


export {loginUser, registerUser, adminLogin}