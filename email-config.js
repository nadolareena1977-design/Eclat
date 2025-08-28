// Email Configuration for Èclat Coffee
const emailConfig = {
    // Email service configuration
    service: process.env.EMAIL_SERVICE || 'gmail', // gmail, outlook, yahoo, etc.
    
    // SMTP configuration
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    
    // Authentication
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    },
    
    // Default sender
    from: process.env.EMAIL_FROM || 'Èclat Coffee <noreply@eclat.com>',
    
    // Company information
    company: {
        name: 'Èclat Coffee',
        website: 'https://eclat.com',
        phone: '+91 98765 43210',
        address: '123 Coffee Street, Brew City, India 123456'
    }
};

// Email templates
const emailTemplates = {
    orderConfirmation: {
        subject: 'Order Confirmation - Èclat Coffee',
        html: (orderData) => `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Order Confirmation - Èclat Coffee</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1a472a 0%, #030f08 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .header h1 { margin: 0; color: #D4AF37; font-size: 28px; }
                    .content { background: #f9f9f9; padding: 30px; }
                    .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                    .order-item:last-child { border-bottom: none; }
                    .total { background: #D4AF37; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; }
                    .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
                    .btn { display: inline-block; background: #D4AF37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Èclat Coffee</h1>
                        <p>Order Confirmation</p>
                    </div>
                    
                    <div class="content">
                        <h2>Thank you for your order!</h2>
                        <p>Dear ${orderData.customerName},</p>
                        <p>Your order has been successfully placed and is being processed. Here are your order details:</p>
                        
                        <div class="order-details">
                            <h3>Order Information</h3>
                            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                            <p><strong>Order Date:</strong> ${orderData.orderDate}</p>
                            <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
                            
                            <h4>Items Ordered:</h4>
                            ${orderData.items.map(item => `
                                <div class="order-item">
                                    <span>${item.name} x ${item.quantity}</span>
                                    <span>Rs ${item.price}</span>
                                </div>
                            `).join('')}
                            
                            <div class="total">
                                Total: Rs ${orderData.total}
                            </div>
                        </div>
                        
                        <div class="order-details">
                            <h3>Shipping Address</h3>
                            <p>${orderData.shippingAddress}</p>
                        </div>
                        
                        <p>We'll send you a shipping confirmation email once your order is dispatched.</p>
                        
                        <div style="text-align: center;">
                            <a href="${emailConfig.company.website}" class="btn">Visit Our Website</a>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>If you have any questions, please contact us:</p>
                        <p>📧 support@eclat.com | 📞 ${emailConfig.company.phone}</p>
                        <p>© 2024 Èclat Coffee. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    }
};

module.exports = { emailConfig, emailTemplates };
