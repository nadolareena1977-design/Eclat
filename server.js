const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

app.get('/shipping-returns', (req, res) => {
    res.sendFile(path.join(__dirname, 'shipping-returns.html'));
});

app.get('/terms-of-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'terms-of-service.html'));
});

// Handle 404 for any other routes
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Èclat website is running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} to view your site`);
});
