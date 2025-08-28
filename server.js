const express = require('express');
const path = require('path');
const Razorpay = require('razorpay');
const razorpayConfig = require('./razorpay-config');
const EmailService = require('./email-service');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8000;

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

// Domain redirect middleware - must be first
app.use((req, res, next) => {
    const host = req.get('host');
    
    // Handle Punycode and incorrect domain redirects
    // xn--clat-9na.com = âclat.com (incorrect domain)
    // xn--clat-4oa.com = èclat.com (correct domain)
    if (host === 'www.xn--clat-9na.com' || 
        host === 'xn--clat-9na.com' || 
        host === 'âclat.com' ||
        host === 'www.âclat.com' ||
        host === 'www.èclat.com') {
        return res.redirect(301, `https://èclat.com${req.url}`);
    }
    
    next();
});

// Middleware
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || razorpayConfig.getKeyId(),
    key_secret: process.env.RAZORPAY_KEY_SECRET || razorpayConfig.getKeySecret()
});

// Initialize Email Service
const emailService = new EmailService();

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});

app.get('/razorpay-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'razorpay-test.html'));
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

// Get Razorpay configuration for testing
app.get('/api/config', (req, res) => {
    res.json({
        environment: razorpayConfig.environment,
        keyId: razorpayConfig.getKeyId(),
        keySecret: '***hidden***' // Don't expose the actual secret
    });
});

// Create test order endpoint
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        
        if (!amount || !receipt) {
            return res.status(400).json({ error: 'Amount and receipt are required' });
        }

        const options = {
            amount: amount, // Amount should already be in paise
            currency,
            receipt,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        res.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: order.status
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
});

// Razorpay payment creation endpoint
app.post('/api/create-payment', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        
        if (!amount || !receipt) {
            return res.status(400).json({ error: 'Amount and receipt are required' });
        }

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
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
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Payment verification parameters are required' });
        }

        // Verify the payment signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const crypto = require('crypto');
        const signature = crypto
            .createHmac('sha256', razorpayConfig.getKeySecret())
            .update(text)
            .digest('hex');

        if (signature === razorpay_signature) {
            // Process successful payment and send confirmation email
            try {
                const orderResult = await processOrder(orderData, 'Online Payment', razorpay_payment_id);
                res.json({ 
                    success: true, 
                    message: 'Payment verified successfully',
                    orderId: orderResult.orderId,
                    paymentId: razorpay_payment_id,
                    emailSent: orderResult.emailSent
                });
            } catch (orderError) {
                console.error('Error processing order:', orderError);
                res.json({ 
                    success: true, 
                    message: 'Payment verified but order processing failed',
                    orderId: razorpay_order_id,
                    paymentId: razorpay_payment_id,
                    emailSent: false
                });
            }
        } else {
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

// Process COD order endpoint
app.post('/api/process-cod-order', async (req, res) => {
    try {
        const { orderData } = req.body;
        
        if (!orderData) {
            return res.status(400).json({ error: 'Order data is required' });
        }

        const orderResult = await processOrder(orderData, 'Cash on Delivery');
        res.json({
            success: true,
            message: 'COD order processed successfully',
            orderId: orderResult.orderId,
            emailSent: orderResult.emailSent
        });

    } catch (error) {
        console.error('Error processing COD order:', error);
        res.status(500).json({ error: 'Failed to process COD order' });
    }
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email address is required' });
        }

        const result = await emailService.sendTestEmail(email);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Test email sent successfully',
                messageId: result.messageId 
            });
        } else {
            res.status(500).json({ error: 'Failed to send test email', details: result.error });
        }

    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ error: 'Failed to send test email' });
    }
});

// Check email service status
app.get('/api/email-status', async (req, res) => {
    try {
        const status = await emailService.verifyConnection();
        res.json(status);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve static files after API routes
app.use(express.static(__dirname));

// Handle 404 for any other routes
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Helper function to process orders and send confirmation emails
async function processOrder(orderData, paymentMethod, paymentId = null) {
    try {
        // Generate unique order ID
        const orderId = `ECLAT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        
        // Prepare order data for email
        const emailOrderData = {
            orderId: orderId,
            orderDate: new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            paymentMethod: paymentMethod,
            customerName: `${orderData.firstName} ${orderData.lastName}`,
            customerEmail: orderData.email,
            items: orderData.items,
            total: orderData.total,
            shippingAddress: `${orderData.address}, ${orderData.city}, ${orderData.postalCode}, ${orderData.country}`,
            paymentId: paymentId
        };

        // Send confirmation email with invoice
        const emailResult = await emailService.sendOrderConfirmation(emailOrderData);
        
        console.log(`Order ${orderId} processed successfully. Email sent: ${emailResult.success}`);
        
        return {
            orderId: orderId,
            emailSent: emailResult.success,
            emailError: emailResult.error || null
        };

    } catch (error) {
        console.error('Error processing order:', error);
        throw error;
    }
}

app.listen(PORT, () => {
    console.log(`🚀 Èclat website is running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} to view your site`);
    console.log(`💳 Razorpay integration is ready!`);
    console.log(`📧 Email service initialized!`);
    console.log(`⚠️  Remember to set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables`);
    console.log(`📧 Set EMAIL_USER and EMAIL_PASS for email functionality`);
});
