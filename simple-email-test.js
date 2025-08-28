// Simple email test to debug authentication
const nodemailer = require('nodemailer');

async function testEmailConnection() {
    console.log('🧪 Simple Email Connection Test\n');
    
    // Test configuration
    const testConfig = {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'eclat.reach@gmail.com',
            pass: 'klxx eqib hzzq tfdj'
        }
    };
    
    console.log('📧 Test Configuration:');
    console.log('Email:', testConfig.auth.user);
    console.log('Password:', testConfig.auth.pass);
    console.log('Host:', testConfig.host);
    console.log('Port:', testConfig.port);
    console.log('Secure:', testConfig.secure);
    console.log('');
    
    try {
        console.log('1. Creating transporter...');
        const transporter = nodemailer.createTransport(testConfig);
        
        console.log('2. Verifying connection...');
        await transporter.verify();
        
        console.log('✅ Email connection successful!');
        
        console.log('3. Testing email sending...');
        const mailOptions = {
            from: 'Èclat Coffee <eclat.reach@gmail.com>',
            to: 'eclat.reach@gmail.com',
            subject: 'Test Email - Èclat Coffee',
            html: '<h2>Test Email</h2><p>This is a test email from your Èclat Coffee website!</p>'
        };
        
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', result.messageId);
        
    } catch (error) {
        console.log('❌ Email test failed:');
        console.log('Error:', error.message);
        
        if (error.message.includes('Invalid login')) {
            console.log('\n🔍 Troubleshooting:');
            console.log('- Check if 2-Step Verification is enabled');
            console.log('- Verify the app password is correct');
            console.log('- Make sure the account is not blocked');
        }
    }
}

// Run test
testEmailConnection();
