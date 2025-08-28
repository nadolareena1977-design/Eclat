# 📧 Èclat Coffee Email Setup Guide
## Using: reach.eclat@gmail.com

## 🎯 **Quick Setup (2 minutes)**

### **Step 1: Set Up Gmail App Password**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. **Security** → **2-Step Verification** (enable if not already)
3. **Security** → **App Passwords**
4. Generate password for "Mail"
5. Copy the 16-character password

### **Step 2: Run Setup Script**
```bash
node setup-eclat-email.js
```
- Enter your 16-character app password when prompted
- The script will configure everything automatically

### **Step 3: Test & Start**
```bash
# Test email service
node test-email.js

# Start your server
npm start
```

## 🔑 **What's Already Configured**

✅ **Email Account**: `reach.eclat@gmail.com`  
✅ **Razorpay Test Keys**: Ready to use  
✅ **Razorpay Live Keys**: Ready for production  
✅ **Server Configuration**: Port 8000  
✅ **Email Templates**: Beautiful Èclat branding  

## 📧 **What You Need to Provide**

🔐 **Gmail App Password** (16 characters)  
- This is NOT your regular Gmail password
- Must be generated from Google Account settings
- Required for security reasons

## 🚀 **After Setup, Your System Will:**

1. **Send emails from**: `Èclat Coffee <reach.eclat@gmail.com>`
2. **Order confirmations**: Beautiful HTML emails with your branding
3. **PDF invoices**: Professional invoices attached to emails
4. **Automatic sending**: After every successful order
5. **Both payment types**: Razorpay and Cash on Delivery

## 🧪 **Testing Commands**

### **Test Email Service**
```bash
node test-email.js
```

### **Test API Endpoints**
```bash
# Check email status
curl http://localhost:8000/api/email-status

# Send test email
curl -X POST http://localhost:8000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"reach.eclat@gmail.com"}'
```

## 🚨 **Troubleshooting**

### **"Invalid login" Error**
- ✅ Use App Password, not regular password
- ✅ Ensure 2-Step Verification is enabled
- ✅ Check that app password is exactly 16 characters

### **"Connection failed" Error**
- ✅ Check your internet connection
- ✅ Verify Gmail account is active
- ✅ Ensure no firewall blocking SMTP

### **"Email not sending"**
- ✅ Check server logs for errors
- ✅ Verify `.env` file exists and is correct
- ✅ Test with `node test-email.js`

## 📁 **Files Created/Updated**

- ✅ `.env` - Your email configuration
- ✅ `setup-eclat-email.js` - Easy setup script
- ✅ `test-email.js` - Test your email service
- ✅ All email and invoice services ready

## 🎉 **You're Ready!**

Your Èclat Coffee website now has:
- **Professional email confirmations** from reach.eclat@gmail.com
- **PDF invoice generation** for every order
- **Beautiful email templates** with your branding
- **Automatic email sending** after orders
- **Full Razorpay integration** ready to go

---

**🚀 Run `node setup-eclat-email.js` to get started!**
