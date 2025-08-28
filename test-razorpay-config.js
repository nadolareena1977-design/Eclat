// Test script to verify Razorpay configuration
const razorpayConfig = require('./razorpay-config');

console.log('🔍 Testing Razorpay Configuration...\n');

try {
    // Display environment info
    const envInfo = razorpayConfig.getEnvironmentInfo();
    console.log('📊 Environment Information:');
    console.log(`   Environment: ${envInfo.environment}`);
    console.log(`   Is Production: ${envInfo.isProduction}`);
    console.log(`   Is Test: ${envInfo.isTest}`);
    console.log(`   Config Valid: ${envInfo.configValid}\n`);

    // Test key retrieval
    const keyId = razorpayConfig.getKeyId();
    const keySecret = razorpayConfig.getKeySecret();
    
    console.log('🔑 Current Configuration:');
    console.log(`   Key ID: ${keyId.substring(0, 20)}...`);
    console.log(`   Key Secret: ${keySecret.substring(0, 10)}...`);
    
    // Validate configuration
    if (razorpayConfig.validateConfig()) {
        console.log('\n✅ Configuration is valid and ready to use!');
        
        if (envInfo.isProduction) {
            console.log('🚀 Running in PRODUCTION mode - Live transactions enabled');
        } else {
            console.log('🧪 Running in TEST mode - Test transactions only');
        }
    } else {
        console.log('\n❌ Configuration validation failed');
    }

} catch (error) {
    console.error('\n❌ Error testing configuration:', error.message);
    console.log('\n💡 Make sure to:');
    console.log('   1. Set NODE_ENV=production for live environment');
    console.log('   2. Set RAZORPAY_PRODUCTION_KEY_ID and RAZORPAY_PRODUCTION_KEY_SECRET');
    console.log('   3. Verify your keys in Razorpay dashboard');
}
