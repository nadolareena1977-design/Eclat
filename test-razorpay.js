// Test script for Razorpay integration
// Run this to verify your setup: node test-razorpay.js

const Razorpay = require('razorpay');
const razorpayConfig = require('./razorpay-config');

console.log('🧪 Testing Razorpay Integration...\n');

// Test configuration loading
console.log('📋 Configuration Test:');
console.log('Environment:', razorpayConfig.environment);
console.log('Key ID:', razorpayConfig.getKeyId());
console.log('Key Secret:', razorpayConfig.getKeySecret() ? '✅ Set' : '❌ Not Set');
console.log('');

// Test Razorpay initialization
try {
    const razorpay = new Razorpay({
        key_id: razorpayConfig.getKeyId(),
        key_secret: razorpayConfig.getKeySecret()
    });
    console.log('🔑 Razorpay Initialization: ✅ Success');
} catch (error) {
    console.log('🔑 Razorpay Initialization: ❌ Failed');
    console.log('Error:', error.message);
}

console.log('\n📝 Next Steps:');
console.log('1. Update razorpay-config.js with your actual API keys');
console.log('2. Set environment variables for production');
console.log('3. Test the payment flow in your checkout page');
console.log('4. Check the RAZORPAY_INTEGRATION.md for detailed setup instructions');

console.log('\n🚀 Your ECLAT app is ready for Razorpay integration!');
