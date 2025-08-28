#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎉 Welcome to Èclat Coffee Email Setup!');
console.log('This script will help you configure your email service.\n');

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function setupEmail() {
    try {
        console.log('📧 Email Configuration Setup\n');
        
        // Ask for email service
        const emailService = await askQuestion('Which email service are you using? (gmail/outlook/yahoo): ');
        
        // Ask for email address
        const emailUser = await askQuestion('Enter your email address: ');
        
        // Ask for app password
        const emailPass = await askQuestion('Enter your app password (not regular password): ');
        
        // Ask for sender name
        const senderName = await askQuestion('Enter sender name (e.g., Èclat Coffee): ');
        
        // Ask for Razorpay keys
        console.log('\n💳 Razorpay Configuration');
        const razorpayKeyId = await askQuestion('Enter your Razorpay Key ID: ');
        const razorpayKeySecret = await askQuestion('Enter your Razorpay Key Secret: ');
        
        // Create .env content
        const envContent = `# Email Configuration
EMAIL_SERVICE=${emailService}
EMAIL_HOST=smtp.${emailService}.com
EMAIL_PORT=587
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}
EMAIL_FROM=${senderName} <${emailUser}>

# Razorpay Configuration
RAZORPAY_KEY_ID=${razorpayKeyId}
RAZORPAY_KEY_SECRET=${razorpayKeySecret}

# Server Configuration
PORT=8000
NODE_ENV=development
`;
        
        // Write to .env file
        fs.writeFileSync('.env', envContent);
        
        console.log('\n✅ Configuration saved to .env file!');
        console.log('\n📋 Next Steps:');
        console.log('1. Make sure 2-Step Verification is enabled on your email account');
        console.log('2. Generate an App Password for "Mail"');
        console.log('3. Test the email service with: node test-email.js');
        console.log('4. Start your server with: npm start');
        
        // Ask if they want to test now
        const testNow = await askQuestion('\nWould you like to test the email service now? (y/n): ');
        
        if (testNow.toLowerCase() === 'y' || testNow.toLowerCase() === 'yes') {
            console.log('\n🧪 Testing email service...');
            
            // Update test-email.js with their email
            const testEmailContent = `// Test script for email service
const EmailService = require('./email-service');

async function testEmailService() {
    console.log('🧪 Testing Email Service...\\n');
    
    try {
        // Initialize email service
        const emailService = new EmailService();
        
        // Test email service connection
        console.log('1. Testing email service connection...');
        const connectionStatus = await emailService.verifyConnection();
        console.log('Connection Status:', connectionStatus);
        
        if (connectionStatus.success) {
            console.log('✅ Email service is ready!\\n');
            
            // Test sending a test email
            console.log('2. Testing test email...');
            const testEmailResult = await emailService.sendTestEmail('${emailUser}');
            console.log('Test Email Result:', testEmailResult);
            
            if (testEmailResult.success) {
                console.log('✅ Test email sent successfully!');
                console.log('📧 Message ID:', testEmailResult.messageId);
                console.log('📧 Check your inbox for the test email!');
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
            
            console.log('\\n🚀 Running email test...');
            require('child_process').exec('node test-email.js', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error running test:', error);
                    return;
                }
                console.log(stdout);
                if (stderr) console.error(stderr);
            });
        }
        
    } catch (error) {
        console.error('❌ Error during setup:', error);
    } finally {
        rl.close();
    }
}

// Run setup
setupEmail();
