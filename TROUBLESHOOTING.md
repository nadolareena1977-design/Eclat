# 🔧 Email Authentication Troubleshooting Guide

## 🚨 **Current Issue: Invalid Login Error**

The app password `gwgktgwcoqptjwzg` is not working for `eclat.reach@gmail.com`.

## 🔍 **Step-by-Step Troubleshooting**

### **1. Verify 2-Step Verification is Enabled**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Sign in with `eclat.reach@gmail.com`
3. Click **Security** (left sidebar)
4. Check if **2-Step Verification** shows "On"
5. If not enabled, enable it first

### **2. Generate a New App Password**
1. In **Security** section, find **App Passwords**
2. Click **App Passwords**
3. Select **Mail** from the dropdown
4. Click **Generate**
5. **Copy the new 16-character password**

### **3. Common App Password Issues**
- ❌ **Wrong format**: `gwgktgwcoqptjwzg` (should be 16 chars)
- ❌ **Wrong account**: Make sure you're using `eclat.reach@gmail.com`
- ❌ **2FA not enabled**: Must enable 2-Step Verification first
- ❌ **Old password**: App passwords can expire

### **4. Test the New Password**
Once you have a new app password:
```bash
# Update .env file with new password
echo "EMAIL_PASS=YOUR_NEW_16_CHAR_PASSWORD" > temp.txt
sed 's/EMAIL_PASS=.*/EMAIL_PASS=YOUR_NEW_16_CHAR_PASSWORD/' .env > .env.new
mv .env.new .env

# Test email service
node test-email.js
```

## 🎯 **Quick Fix Steps**

### **Option A: Generate New App Password**
1. Enable 2-Step Verification
2. Generate new App Password for "Mail"
3. Update .env file
4. Test again

### **Option B: Use Different Email**
If `eclat.reach@gmail.com` continues to have issues:
1. Use a different Gmail account
2. Or use `reach.eclat@gmail.com` (the original one)
3. Generate app password for that account

### **Option C: Check Account Status**
1. Verify `eclat.reach@gmail.com` is active
2. Check if account has any restrictions
3. Ensure no security blocks

## 📧 **What We Need**

✅ **Working Gmail account** with 2FA enabled  
✅ **Valid 16-character App Password**  
✅ **Account not blocked or restricted**  

## 🚀 **Next Steps**

1. **Check 2-Step Verification** is enabled
2. **Generate a new App Password**
3. **Test with the new password**
4. **Let me know the result**

---

**🔑 The key is getting a valid App Password from Google!**
