const nodemailer = require('nodemailer');
const { emailConfig, emailTemplates } = require('./email-config');
const InvoiceService = require('./invoice-service');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransporter({
            service: emailConfig.service,
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.secure,
            auth: emailConfig.auth
        });
        
        this.invoiceService = new InvoiceService();
    }

    async sendOrderConfirmation(orderData) {
        try {
            // Generate invoice PDF
            const invoiceResult = await this.invoiceService.generateInvoice(orderData);
            
            // Prepare email data
            const emailData = {
                customerName: orderData.customerName,
                orderId: orderData.orderId,
                orderDate: orderData.orderDate,
                paymentMethod: orderData.paymentMethod,
                items: orderData.items,
                total: orderData.total,
                shippingAddress: orderData.shippingAddress
            };

            // Email options
            const mailOptions = {
                from: emailConfig.from,
                to: orderData.customerEmail,
                subject: emailTemplates.orderConfirmation.subject,
                html: emailTemplates.orderConfirmation.html(emailData),
                attachments: [
                    {
                        filename: invoiceResult.fileName,
                        path: invoiceResult.filePath,
                        contentType: 'application/pdf'
                    }
                ]
            };

            // Send email
            const result = await this.transporter.sendMail(mailOptions);
            
            // Clean up temporary invoice file
            this.invoiceService.cleanupTempFile(invoiceResult.filePath);
            
            return {
                success: true,
                messageId: result.messageId,
                email: orderData.customerEmail
            };

        } catch (error) {
            console.error('Error sending order confirmation email:', error);
            
            // Clean up temp file even if email fails
            if (orderData.invoicePath) {
                this.invoiceService.cleanupTempFile(orderData.invoicePath);
            }
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    async sendTestEmail(toEmail) {
        try {
            const mailOptions = {
                from: emailConfig.from,
                to: toEmail,
                subject: 'Test Email - Èclat Coffee Email Service',
                html: `
                    <h2>Test Email</h2>
                    <p>This is a test email to verify that your email service is working correctly.</p>
                    <p>If you received this email, your email configuration is set up properly!</p>
                    <br>
                    <p>Best regards,<br>Èclat Coffee Team</p>
                `
            };

            const result = await this.transporter.sendMail(mailOptions);
            return {
                success: true,
                messageId: result.messageId
            };

        } catch (error) {
            console.error('Error sending test email:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Verify email configuration
    async verifyConnection() {
        try {
            await this.transporter.verify();
            return { success: true, message: 'Email service is ready' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

module.exports = EmailService;
