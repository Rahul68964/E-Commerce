import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//payment routes
orderRouter.post('/place', auth, placeOrder);
orderRouter.post('/stripe', auth, placeOrderStripe);
orderRouter.post('/razorpay', auth, placeOrderRazorpay);

//User routes
orderRouter.post('/userorders', auth, userOrders);

//verify payments
orderRouter.post('/verifyStripe', auth, verifyStripe)
orderRouter.post('/verifyRazorpay', auth, verifyRazorpay)


export default orderRouter;

