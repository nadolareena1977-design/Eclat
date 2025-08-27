// Razorpay Configuration
// Update these values with your actual Razorpay credentials

const razorpayConfig = {
    // Test credentials (replace with your actual credentials)
    test: {
        keyId: 'rzp_test_YOUR_TEST_KEY_ID',
        keySecret: 'YOUR_TEST_KEY_SECRET'
    },
    
    // Production credentials (replace with your actual credentials)
    production: {
        keyId: 'rzp_live_YOUR_LIVE_KEY_ID',
        keySecret: 'YOUR_LIVE_KEY_SECRET'
    },
    
    // Current environment
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'test',
    
    // Get current configuration
    getCurrentConfig() {
        return this[this.environment];
    },
    
    // Get key ID for current environment
    getKeyId() {
        return this.getCurrentConfig().keyId;
    },
    
    // Get key secret for current environment
    getKeySecret() {
        return this.getCurrentConfig().keySecret;
    }
};

module.exports = razorpayConfig;
