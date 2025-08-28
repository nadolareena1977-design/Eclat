# SSL Troubleshooting Guide for Èclat.com

## Current Issue
```
This site can't provide a secure connection
èclat.com uses an unsupported protocol.
ERR_SSL_VERSION_OR_CIPHER_MISMATCH
```

## What We Fixed

### 1. Updated `render.yaml`
- Added `forceHTTPS: true` to both domains
- Added `ssl: true` to ensure SSL certificates are provisioned
- This tells Render to automatically handle SSL certificates

### 2. Updated `server.js`
- Added HTTPS enforcement middleware for production
- Ensures all traffic is redirected to HTTPS
- Handles `x-forwarded-proto` header properly

## Immediate Steps to Fix SSL

### Step 1: Deploy the Changes
```bash
git add .
git commit -m "Fix SSL configuration and force HTTPS"
git push
```

### Step 2: Wait for Render to Provision SSL
- Render will automatically provision SSL certificates
- This can take 5-15 minutes after deployment
- You'll see SSL status in your Render dashboard

### Step 3: Verify SSL in Render Dashboard
1. Go to your Render dashboard
2. Click on your `eclat-coffee-website` service
3. Go to "Settings" → "Custom Domains"
4. Check that both domains show "SSL: Active"

## If SSL Still Doesn't Work

### Option 1: Manual SSL Provision
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Click on `èclat.com`
4. Click "Provision SSL Certificate"
5. Wait for completion

### Option 2: Check DNS Configuration
Ensure your DNS records point to Render:
```
Type: CNAME
Name: èclat.com
Value: your-service-name.onrender.com
```

### Option 3: Force SSL Renewal
1. In Render dashboard, go to your domain
2. Click "Renew SSL Certificate"
3. Wait for completion

## Testing SSL

### Test 1: Direct HTTPS Access
```
https://èclat.com
```
Should work without SSL errors

### Test 2: Check SSL Certificate
```bash
openssl s_client -connect èclat.com:443 -servername èclat.com
```

### Test 3: SSL Labs Test
Visit: https://www.ssllabs.com/ssltest/
Enter: `èclat.com`

## Common SSL Issues & Solutions

### Issue: "Unsupported Protocol"
- **Cause**: SSL certificate not provisioned or expired
- **Solution**: Force SSL provisioning in Render

### Issue: "Certificate Mismatch"
- **Cause**: Wrong domain in SSL certificate
- **Solution**: Verify domain configuration in Render

### Issue: "Mixed Content"
- **Cause**: HTTP resources on HTTPS page
- **Solution**: Ensure all resources use HTTPS

## Render SSL Best Practices

1. **Always use `forceHTTPS: true`** in render.yaml
2. **Let Render handle SSL** - don't upload custom certificates
3. **Use `ssl: true`** to ensure automatic provisioning
4. **Wait for SSL provisioning** before testing

## Expected Timeline

- **Immediate**: Deploy changes
- **5-15 minutes**: Render provisions SSL certificates
- **15-30 minutes**: DNS propagation (if needed)
- **Total**: Usually resolved within 30 minutes

## Monitoring

Check these in Render dashboard:
- ✅ Service status: "Live"
- ✅ Custom domains: "SSL: Active"
- ✅ Recent deployments: "Successful"

## If All Else Fails

1. **Contact Render Support** with your service URL
2. **Check Render Status Page** for any ongoing issues
3. **Verify domain ownership** in your domain registrar
4. **Check for DNS conflicts** with other services

## Notes

- Render automatically handles SSL certificate renewal
- SSL certificates are valid for 90 days
- Free tier includes automatic SSL provisioning
- Custom domains require SSL to be active before working
