# Razorpay Integration Guide for ECLAT

This guide explains how to set up and use Razorpay payment gateway in your ECLAT coffee mugs e-commerce application.

## 🚀 What's Been Added

- **Razorpay Node.js SDK** integration
- **Payment creation** endpoint (`/api/create-payment`)
- **Payment verification** endpoint (`/api/verify-payment`)
- **Dynamic key loading** for secure frontend integration
- **Multiple payment methods** support (Card, UPI, Net Banking, COD)
- **Secure payment flow** with server-side verification

## 📋 Prerequisites

1. **Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **API Keys**: Get your test and live API keys from Razorpay Dashboard
3. **Node.js**: Version 18.0.0 or higher
4. **Express.js**: Already installed in your project

## ⚙️ Setup Instructions

### 1. Get Razorpay API Keys

1. Log in to your Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Generate a new key pair
4. Copy both **Key ID** and **Key Secret**

### 2. Configure API Keys

#### Option A: Environment Variables (Recommended for Production)
```bash
export RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
export RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET
```

#### Option B: Update Configuration File
Edit `razorpay-config.js`:
```javascript
const razorpayConfig = {
    test: {
        keyId: 'rzp_test_YOUR_ACTUAL_TEST_KEY_ID',
        keySecret: 'YOUR_ACTUAL_TEST_KEY_SECRET'
    },
    production: {
        keyId: 'rzp_live_YOUR_ACTUAL_LIVE_KEY_ID',
        keySecret: 'YOUR_ACTUAL_LIVE_KEY_SECRET'
    },
    // ... rest of the config
};
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
npm start
```

## 🔧 How It Works

### Payment Flow

1. **User selects payment method** (Card, UPI, Net Banking, or COD)
2. **For online payments**:
   - Frontend calls `/api/create-payment` to create Razorpay order
   - Server creates order with Razorpay
   - Frontend opens Razorpay checkout modal
   - User completes payment
   - Frontend calls `/api/verify-payment` to verify payment
   - Server verifies payment signature
   - Order is marked as successful

3. **For COD**:
   - Order is processed directly without payment
   - User pays on delivery

### API Endpoints

#### `GET /api/razorpay-key`
Returns the Razorpay Key ID for frontend integration.

#### `POST /api/create-payment`
Creates a new payment order with Razorpay.

**Request Body:**
```json
{
    "amount": 1500,
    "currency": "INR",
    "receipt": "eclat_1234567890"
}
```

**Response:**
```json
{
    "orderId": "order_ABC123",
    "amount": 150000,
    "currency": "INR"
}
```

#### `POST /api/verify-payment`
Verifies the payment signature from Razorpay.

**Request Body:**
```json
{
    "razorpay_order_id": "order_ABC123",
    "razorpay_payment_id": "pay_XYZ789",
    "razorpay_signature": "generated_signature"
}
```

## 🎨 Customization

### Payment Methods
Edit the payment methods in `checkout.html`:
```html
<div class="payment-method" data-method="card">
    <i class="fas fa-credit-card"></i>
    <div>Credit/Debit Card</div>
</div>
```

### Styling
The Razorpay checkout modal uses your brand color (`#D4AF37`). Update the theme in the checkout options:
```javascript
theme: {
    color: '#D4AF37' // Your brand color
}
```

### Currency
Currently set to INR (Indian Rupees). To change:
1. Update the currency in `placeOrder()` function
2. Update Razorpay order creation
3. Consider exchange rate handling

## 🧪 Testing

### Test Mode
- Use test API keys for development
- Test with Razorpay's test card numbers
- No real money is charged

### Test Cards
- **Visa**: 4111 1111 1111 1111
- **Mastercard**: 5555 5555 5555 4444
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### Test UPI
- Use any valid UPI ID format: `test@upi`

## 🚀 Production Deployment

### Environment Variables
Set these in your production environment:
```bash
NODE_ENV=production
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

### Security Considerations
1. **Never expose Key Secret** in frontend code
2. **Always verify payments** on the server
3. **Use HTTPS** in production
4. **Implement proper error handling**
5. **Add logging** for payment events

### Monitoring
- Monitor payment success/failure rates
- Set up webhook notifications
- Track order completion rates
- Monitor for failed payments

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid Key ID" Error**
   - Check your API key configuration
   - Ensure you're using the correct environment (test/live)

2. **Payment Verification Fails**
   - Check server logs for signature verification errors
   - Ensure Key Secret is correctly set

3. **Checkout Modal Doesn't Open**
   - Check browser console for JavaScript errors
   - Verify Razorpay SDK is loaded
   - Check network requests to `/api/razorpay-key`

4. **Order Creation Fails**
   - Check server logs for Razorpay API errors
   - Verify your Razorpay account is active
   - Check API key permissions

### Debug Mode
Enable debug logging in your server:
```javascript
console.log('Razorpay Config:', {
    keyId: razorpayConfig.getKeyId(),
    environment: razorpayConfig.environment
});
```

## 📞 Support

- **Razorpay Documentation**: [docs.razorpay.com](https://docs.razorpay.com)
- **Razorpay Support**: [support.razorpay.com](https://support.razorpay.com)
- **ECLAT Development**: Check your project documentation

## 🔄 Updates and Maintenance

### Regular Tasks
1. **Monitor API usage** and limits
2. **Update Razorpay SDK** when new versions are released
3. **Review payment logs** for any anomalies
4. **Test payment flow** after any code changes

### Version Updates
```bash
npm update razorpay
```

---

**Note**: This integration is configured for the Indian market (INR currency). For international expansion, additional configuration may be required.
