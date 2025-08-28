const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class InvoiceService {
    constructor() {
        this.companyInfo = {
            name: 'Èclat Coffee',
            website: 'https://eclat.com',
            phone: '+91 98765 43210',
            email: 'support@eclat.com',
            address: '123 Coffee Street, Brew City, India 123456',
            gstin: 'GSTIN12345678901'
        };
    }

    async generateInvoice(orderData) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({
                    size: 'A4',
                    margin: 50
                });

                const fileName = `invoice_${orderData.orderId}_${Date.now()}.pdf`;
                const filePath = path.join(__dirname, 'temp', fileName);
                
                // Ensure temp directory exists
                const tempDir = path.dirname(filePath);
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir, { recursive: true });
                }

                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                // Header
                this.addHeader(doc, orderData);
                
                // Company and Customer Info
                this.addCompanyInfo(doc);
                this.addCustomerInfo(doc, orderData);
                
                // Order Details
                this.addOrderDetails(doc, orderData);
                
                // Items Table
                this.addItemsTable(doc, orderData);
                
                // Total and Footer
                this.addTotalSection(doc, orderData);
                this.addFooter(doc);

                doc.end();

                stream.on('finish', () => {
                    resolve({ filePath, fileName });
                });

                stream.on('error', (error) => {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    addHeader(doc, orderData) {
        // Company Logo/Name
        doc.fontSize(24)
           .font('Helvetica-Bold')
           .fillColor('#1a472a')
           .text('Èclat Coffee', 50, 50);

        doc.fontSize(12)
           .font('Helvetica')
           .fillColor('#666')
           .text('Premium Coffee Mugs', 50, 80);

        // Invoice Title
        doc.fontSize(20)
           .font('Helvetica-Bold')
           .fillColor('#D4AF37')
           .text('INVOICE', 400, 50);

        // Invoice Details
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text(`Invoice #: ${orderData.orderId}`, 400, 80)
           .text(`Date: ${orderData.orderDate}`, 400, 95)
           .text(`Payment: ${orderData.paymentMethod}`, 400, 110);
    }

    addCompanyInfo(doc) {
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text(this.companyInfo.address, 50, 120)
           .text(`Phone: ${this.companyInfo.phone}`, 50, 135)
           .text(`Email: ${this.companyInfo.email}`, 50, 150)
           .text(`GSTIN: ${this.companyInfo.gstin}`, 50, 165);
    }

    addCustomerInfo(doc, orderData) {
        const customerY = 200;
        
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#1a472a')
           .text('Bill To:', 300, customerY);

        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text(orderData.customerName, 300, customerY + 20)
           .text(orderData.shippingAddress, 300, customerY + 35);
    }

    addOrderDetails(doc, orderData) {
        const orderY = 280;
        
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#1a472a')
           .text('Order Summary:', 50, orderY);
    }

    addItemsTable(doc, orderData) {
        const tableY = 310;
        const colWidths = [50, 250, 80, 80, 80]; // Sr, Item, Qty, Price, Total
        
        // Table Headers
        const headers = ['Sr', 'Item Description', 'Qty', 'Price', 'Total'];
        let currentY = tableY;
        
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .fillColor('#1a472a');

        headers.forEach((header, index) => {
            doc.text(header, 50 + colWidths.slice(0, index).reduce((a, b) => a + b, 0), currentY);
        });

        currentY += 20;

        // Table Content
        doc.fontSize(9)
           .font('Helvetica')
           .fillColor('#333');

        orderData.items.forEach((item, index) => {
            const rowY = currentY + (index * 20);
            
            // Sr No
            doc.text((index + 1).toString(), 50, rowY);
            
            // Item Name
            doc.text(item.name, 100, rowY);
            
            // Quantity
            doc.text(item.quantity.toString(), 350, rowY);
            
            // Price
            doc.text(`Rs ${item.price}`, 430, rowY);
            
            // Total
            const itemTotal = item.quantity * item.price;
            doc.text(`Rs ${itemTotal}`, 510, rowY);
        });

        // Separator line
        currentY += (orderData.items.length * 20) + 10;
        doc.strokeColor('#D4AF37')
           .lineWidth(1)
           .moveTo(50, currentY)
           .lineTo(550, currentY)
           .stroke();
    }

    addTotalSection(doc, orderData) {
        const totalY = 450;
        
        // Subtotal
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333')
           .text('Subtotal:', 430, totalY)
           .text(`Rs ${orderData.total}`, 510, totalY);

        // GST (if applicable)
        const gst = Math.round(orderData.total * 0.18); // 18% GST
        doc.text('GST (18%):', 430, totalY + 20)
           .text(`Rs ${gst}`, 510, totalY + 20);

        // Total
        const grandTotal = orderData.total + gst;
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#D4AF37')
           .text('Total Amount:', 430, totalY + 45)
           .text(`Rs ${grandTotal}`, 510, totalY + 45);
    }

    addFooter(doc) {
        const footerY = 550;
        
        doc.fontSize(8)
           .font('Helvetica')
           .fillColor('#666')
           .text('Thank you for choosing Èclat Coffee!', 50, footerY, { align: 'center' })
           .text('For any queries, please contact our support team.', 50, footerY + 15, { align: 'center' })
           .text(`© 2024 ${this.companyInfo.name}. All rights reserved.`, 50, footerY + 30, { align: 'center' });
    }

    // Clean up temporary files
    cleanupTempFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.error('Error cleaning up temp file:', error);
        }
    }
}

module.exports = InvoiceService;
