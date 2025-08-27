const express = require('express');
const path = require('path');
const Razorpay = require('razorpay');
const razorpayConfig = require('./razorpay-config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || razorpayConfig.getKeyId(),
    key_secret: process.env.RAZORPAY_KEY_SECRET || razorpayConfig.getKeySecret()
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

app.get('/shipping-returns', (req, res) => {
    res.sendFile(path.join(__dirname, 'shipping-returns.html'));
});

app.get('/terms-of-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'terms-of-service.html'));
});

// Get Razorpay key ID for frontend
app.get('/api/razorpay-key', (req, res) => {
    res.json({ keyId: razorpayConfig.getKeyId() });
});

// Razorpay payment creation endpoint
app.post('/api/create-payment', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        
        if (!amount || !receipt) {
            return res.status(400).json({ error: 'Amount and receipt are required' });
        }

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

// Razorpay payment verification endpoint
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Payment verification parameters are required' });
        }

        // Verify the payment signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const crypto = require('crypto');
        const signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_TEST_KEY_SECRET')
            .update(text)
            .digest('hex');

        if (signature === razorpay_signature) {
            res.json({ 
                success: true, 
                message: 'Payment verified successfully',
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id
            });
        } else {
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

// Handle 404 for any other routes
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Èclat website is running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} to view your site`);
    console.log(`💳 Razorpay integration is ready!`);
    console.log(`⚠️  Remember to set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables`);
});
