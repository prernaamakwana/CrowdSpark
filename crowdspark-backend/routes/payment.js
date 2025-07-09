
const express = require('express');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
// Ensure dotenv is loaded before using process.env
// This is important to access environment variables like RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("🧪 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("🧪 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`, 
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Failed to create order", error: err });
  }
});

module.exports = router;
