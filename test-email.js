// Test script for Èclat Coffee email service
const EmailService = require('./email-service');

async function testEmailService() {
    console.log('🧪 Testing Èclat Coffee Email Service...\n');
    
    try {
        // Initialize email service
        const emailService = new EmailService();
        
        // Test email service connection
        console.log('1. Testing email service connection...');
        const connectionStatus = await emailService.verifyConnection();
        console.log('Connection Status:', connectionStatus);
        
        if (connectionStatus.success) {
            console.log('✅ Email service is ready!\n');
            
            // Test sending a test email to eclat.reach@gmail.com
            console.log('2. Testing test email...');
            const testEmailResult = await emailService.sendTestEmail('eclat.reach@gmail.com');
            console.log('Test Email Result:', testEmailResult);
            
            if (testEmailResult.success) {
                console.log('✅ Test email sent successfully!');
                console.log('📧 Message ID:', testEmailResult.messageId);
                console.log('📧 Check eclat.reach@gmail.com inbox for the test email!');
            } else {
                console.log('❌ Test email failed:', testEmailResult.error);
            }
        } else {
            console.log('❌ Email service connection failed:', connectionStatus.error);
        }
        
    } catch (error) {
        console.error('❌ Error testing email service:', error);
    }
}

// Run test
testEmailService();
