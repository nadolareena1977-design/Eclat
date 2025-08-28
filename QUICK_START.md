# 🚀 Quick Start Guide - Èclat Email System

## ⚡ Get Started in 3 Steps

### 1. **Run the Setup Script**
```bash
node setup-email.js
```
This will:
- Ask for your email credentials
- Configure Razorpay keys
- Create your `.env` file
- Optionally test the email service

### 2. **Set Up Gmail App Password**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. **Security** → **2-Step Verification** (enable if not already)
3. **Security** → **App Passwords**
4. Generate password for "Mail"
5. Use this password in the setup script

### 3. **Test & Start**
```bash
# Test email service
node test-email.js

# Start your server
npm start
```

## 🔑 Required Information

### **Email Setup**
- ✅ Gmail account with 2FA enabled
- ✅ App password (not regular password)
- ✅ Sender name (e.g., "Èclat Coffee")

### **Razorpay Setup**
- ✅ Key ID (starts with `rzp_test_` or `rzp_live_`)
- ✅ Key Secret

## 📧 What Happens After Setup

1. **User places order** → Order processed
2. **Email sent automatically** → Beautiful confirmation
3. **PDF invoice attached** → Professional invoice
4. **Success message** → User sees confirmation

## 🧪 Testing

### **Test Email Endpoint**
```bash
curl -X POST http://localhost:8000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com"}'
```

### **Email Status Check**
```bash
curl http://localhost:8000/api/email-status
```

## 🚨 Troubleshooting

### **Email Not Working?**
- Check `.env` file exists
- Verify Gmail app password
- Ensure 2FA is enabled
- Check server logs

### **Need Help?**
- Run `node setup-email.js` again
- Check `EMAIL_SETUP.md` for detailed guide
- Verify all environment variables

---

**🎯 Goal: Get your email system working in under 5 minutes!**
