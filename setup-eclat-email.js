#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎉 Èclat Coffee Email Setup for reach.eclat@gmail.com');
console.log('===================================================\n');

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function setupEclatEmail() {
    try {
        console.log('📧 Setting up email service for reach.eclat@gmail.com\n');
        
        // Ask for Gmail app password
        console.log('🔐 You need to set up a Gmail App Password:');
        console.log('1. Go to https://myaccount.google.com/');
        console.log('2. Security → 2-Step Verification (enable if not already)');
        console.log('3. Security → App Passwords');
        console.log('4. Generate password for "Mail"');
        console.log('5. Copy the 16-character password\n');
        
        const emailPass = await askQuestion('Enter your Gmail App Password (16 characters): ');
        
        if (emailPass.length !== 16) {
            console.log('❌ App password should be 16 characters long. Please try again.');
            rl.close();
            return;
        }
        
        // Update .env file with the app password
        const envContent = `# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=reach.eclat@gmail.com
EMAIL_PASS=${emailPass}
EMAIL_FROM=Èclat Coffee <reach.eclat@gmail.com>

# Razorpay Configuration
RAZORPAY_TEST_KEY_ID=rzp_test_RAdCATniIBXTZk
RAZORPAY_TEST_KEY_SECRET=P1kxOvWgjvk3uFUQc3232h4x
RAZORPAY_PRODUCTION_KEY_ID=rzp_live_RAd775c0eGfxhg
RAZORPAY_PRODUCTION_KEY_SECRET=ZANbeH0HyaZwbRqSDwDmcLJ3

# Server Configuration
PORT=8000
NODE_ENV=development
`;
        
        // Write to .env file
        fs.writeFileSync('.env', envContent);
        
        console.log('\n✅ Configuration saved! Your .env file is now ready.');
        console.log('\n📋 Next Steps:');
        console.log('1. ✅ Email: reach.eclat@gmail.com');
        console.log('2. ✅ App Password: Configured');
        console.log('3. ✅ Razorpay: Already configured');
        console.log('4. 🔄 Test the email service');
        console.log('5. 🚀 Start your server');
        
        // Ask if they want to test now
        const testNow = await askQuestion('\nWould you like to test the email service now? (y/n): ');
        
        if (testNow.toLowerCase() === 'y' || testNow.toLowerCase() === 'yes') {
            console.log('\n🧪 Testing email service...');
            
            // Update test-email.js to use reach.eclat@gmail.com
            const testEmailContent = `// Test script for Èclat Coffee email service
const EmailService = require('./email-service');

async function testEmailService() {
    console.log('🧪 Testing Èclat Coffee Email Service...\\n');
    
    try {
        // Initialize email service
        const emailService = new EmailService();
        
        // Test email service connection
        console.log('1. Testing email service connection...');
        const connectionStatus = await emailService.verifyConnection();
        console.log('Connection Status:', connectionStatus);
        
        if (connectionStatus.success) {
            console.log('✅ Email service is ready!\\n');
            
            // Test sending a test email to reach.eclat@gmail.com
            console.log('2. Testing test email...');
            const testEmailResult = await emailService.sendTestEmail('reach.eclat@gmail.com');
            console.log('Test Email Result:', testEmailResult);
            
            if (testEmailResult.success) {
                console.log('✅ Test email sent successfully!');
                console.log('📧 Message ID:', testEmailResult.messageId);
                console.log('📧 Check reach.eclat@gmail.com inbox for the test email!');
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
`;
            
            fs.writeFileSync('test-email.js', testEmailContent);
            
            console.log('\n🚀 Running email test...');
            require('child_process').exec('node test-email.js', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error running test:', error);
                    return;
                }
                console.log(stdout);
                if (stderr) console.error(stderr);
            });
        } else {
            console.log('\n📝 To test later, run: node test-email.js');
            console.log('🚀 To start server, run: npm start');
        }
        
    } catch (error) {
        console.error('❌ Error during setup:', error);
    } finally {
        rl.close();
    }
}

// Run setup
setupEclatEmail();
