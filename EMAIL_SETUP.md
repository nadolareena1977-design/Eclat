# 📧 Email & Invoice System Setup Guide

## 🚀 What's Been Implemented

Your Èclat Coffee website now includes:
- ✅ **Order Confirmation Emails** - Sent automatically after successful orders
- ✅ **PDF Invoice Generation** - Professional invoices attached to emails
- ✅ **Email Templates** - Beautiful, branded email designs
- ✅ **COD & Online Payment Support** - Both payment methods supported

## 📋 Prerequisites

1. **Node.js** (version 18 or higher)
2. **Gmail Account** (or other email provider)
3. **Gmail App Password** (for security)

## 🔧 Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in your project root with:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Èclat Coffee <noreply@eclat.com>

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Server Configuration
PORT=8000
NODE_ENV=development
```

### 3. Gmail App Password Setup
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled
4. Go to **App Passwords**
5. Generate a new app password for "Mail"
6. Use this password in your `.env` file

## 📧 Email Service Features

### **Order Confirmation Emails**
- **Automatic sending** after successful orders
- **Professional HTML templates** with your branding
- **Order details included** (items, total, shipping info)
- **PDF invoice attached** automatically

### **Email Templates**
- **Responsive design** for all devices
- **Brand colors** (dark green and gold)
- **Order summary** with itemized list
- **Shipping information** clearly displayed
- **Company contact details** included

## 🧾 Invoice Generation

### **PDF Features**
- **Professional layout** with your branding
- **Order details** clearly organized
- **GST calculation** (18% for Indian orders)
- **Company information** prominently displayed
- **Automatic cleanup** of temporary files

### **Invoice Contents**
- Company logo and details
- Customer shipping information
- Itemized order list with quantities
- Price calculations and totals
- GST breakdown
- Professional footer

## 🔄 How It Works

### **Online Payment Flow**
1. User completes checkout
2. Payment processed through Razorpay
3. Payment verified on server
4. Order processed and email sent
5. Invoice generated and attached
6. Success message displayed

### **COD Flow**
1. User selects Cash on Delivery
2. Order processed directly
3. Confirmation email sent
4. Invoice generated and attached
5. Success message displayed

## 🧪 Testing

### **Test Email Endpoint**
```bash
POST /api/test-email
{
  "email": "test@example.com"
}
```

### **Email Status Check**
```bash
GET /api/email-status
```

## 🚨 Troubleshooting

### **Common Issues**

1. **Email Not Sending**
   - Check Gmail app password
   - Verify 2-Step Verification is enabled
   - Check firewall/network settings

2. **PDF Generation Fails**
   - Ensure `temp` directory is writable
   - Check disk space
   - Verify PDFKit installation

3. **Order Processing Errors**
   - Check server logs
   - Verify all environment variables
   - Ensure database connectivity

### **Debug Mode**
Enable detailed logging by setting:
```env
NODE_ENV=development
DEBUG=email:*,invoice:*
```

## 📱 Customization

### **Email Template**
Edit `email-config.js` to modify:
- Email subject lines
- HTML template design
- Company information
- Styling and colors

### **Invoice Design**
Edit `invoice-service.js` to modify:
- PDF layout and styling
- Company branding
- Tax calculations
- Footer information

## 🔒 Security Notes

- **Never commit** `.env` files to version control
- **Use app passwords** instead of regular passwords
- **Enable 2FA** on your email account
- **Regularly rotate** app passwords

## 📞 Support

If you encounter issues:
1. Check server console logs
2. Verify environment variables
3. Test email service status
4. Check network connectivity

---

**🎉 Your Èclat Coffee website now has a complete email and invoice system!**
