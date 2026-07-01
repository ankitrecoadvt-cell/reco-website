// ========================================
// SERVER.JS - WEBSITE + BROCHURE DOWNLOAD
// ========================================

const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========================================
// 🟢 BROCHURE DOWNLOAD ROUTE
// ========================================
app.get('/api/download-brochure', (req, res) => {
    try {
        console.log('📄 Brochure download requested');
        
        // 🔴 PDF file ka path
        const pdfPath = path.join(__dirname, 'public', 'reco-advertising-brochure.pdf');
        
        // Check if file exists
        if (!fs.existsSync(pdfPath)) {
            console.error('❌ Brochure file not found:', pdfPath);
            return res.status(404).json({
                success: false,
                message: 'Brochure not found'
            });
        }
        
        // Download file
        res.download(pdfPath, 'Reco_Advertising_Brochure.pdf', (err) => {
            if (err) {
                console.error('❌ Download error:', err);
                res.status(500).send('Error downloading brochure');
            } else {
                console.log('✅ Brochure downloaded successfully');
            }
        });
        
    } catch (error) {
        console.error('❌ Download error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ========================================
// 🏠 HOME PAGE
// ========================================
app.get('/', (req, res) => {
    res.render('index');
});

// ========================================
// 🚀 START SERVER
// ========================================
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📄 Brochure: /api/download-brochure`);
});