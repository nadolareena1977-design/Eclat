// Razorpay Configuration
// Update these values with your actual Razorpay credentials

const razorpayConfig = {
    // Test credentials (replace with your actual credentials)
    test: {
        keyId: process.env.RAZORPAY_TEST_KEY_ID || 'rzp_test_RAdCATniIBXTZk',
        keySecret: process.env.RAZORPAY_TEST_KEY_SECRET || 'P1kxOvWgjvk3uFUQc3232h4x'
    },
    
    // Production credentials (use environment variables for security)
    production: {
        keyId: process.env.RAZORPAY_PRODUCTION_KEY_ID || 'rzp_live_RAd775c0eGfxhg',
        keySecret: process.env.RAZORPAY_PRODUCTION_KEY_SECRET || 'ZANbeH0HyaZwbRqSDwDmcLJ3'
    },
    
    // Current environment
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'test',
    
    // Get current configuration
    getCurrentConfig() {
        const config = this[this.environment];
        if (!config) {
            throw new Error(`Invalid environment: ${this.environment}`);
        }
        return config;
    },
    
    // Get key ID for current environment
    getKeyId() {
        const config = this.getCurrentConfig();
        if (!config.keyId) {
            throw new Error(`Razorpay key ID not found for ${this.environment} environment`);
        }
        return config.keyId;
    },
    
    // Get key secret for current environment
    getKeySecret() {
        const config = this.getCurrentConfig();
        if (!config.keySecret) {
            throw new Error(`Razorpay key secret not found for ${this.environment} environment`);
        }
        return config.keySecret;
    },
    
    // Validate configuration
    validateConfig() {
        try {
            const config = this.getCurrentConfig();
            if (!config.keyId || !config.keySecret) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },
    
    // Get environment info
    getEnvironmentInfo() {
        return {
            environment: this.environment,
            isProduction: this.environment === 'production',
            isTest: this.environment === 'test',
            configValid: this.validateConfig()
        };
    }
};

module.exports = razorpayConfig;
