// ========================================
// SERVER.JS - GOOGLE SHEETS API + BROCHURE DOWNLOAD
// ========================================

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========================================
// GOOGLE SHEETS SETUP
// ========================================

// 🟢 Load credentials
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// 🟢 Apni Google Sheet ID daalo (URL se)
const SPREADSHEET_ID = '1wqVxGBd-d88_dd2TZ0kAR-Qx2iQK3qSt6tdFKvMwEnk'; // 👈 Change karo

// 🟢 Sheet ka naam
const SHEET_NAME = 'reco_website_leads';

// Initialize Google Sheets client
async function getSheetsClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    
    return sheets;
  } catch (error) {
    console.error('❌ Google Sheets auth error:', error.message);
    throw error;
  }
}

// ========================================
// ADD DATA TO SHEETS
// ========================================

async function addToSheet(name, email, phone, subject, message, type) {
  try {
    const sheets = await getSheetsClient();
    
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    });
    
    const values = [
      [timestamp, name, email, phone, subject, message, type]
    ];
    
    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: values
      }
    };
    
    const response = await sheets.spreadsheets.values.append(request);
    
    console.log('✅ Data added to Google Sheets:', {
      name,
      email,
      type,
      timestamp
    });
    
    return { success: true, data: response.data };
    
  } catch (error) {
    console.error('❌ Google Sheets error:', error.message);
    return { success: false, error: error.message };
  }
}

// ========================================
// CREATE HEADERS (RUN ONCE)
// ========================================

async function createHeaders() {
  try {
    const sheets = await getSheetsClient();
    
    const headers = [
      ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Type']
    ];
    
    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:G1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: headers
      }
    };
    
    await sheets.spreadsheets.values.update(request);
    console.log('✅ Headers created!');
    
  } catch (error) {
    console.error('❌ Failed to create headers:', error.message);
  }
}

// ========================================
// 📄 BROCHURE DOWNLOAD ROUTE (NEW)
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
// API ROUTES
// ========================================

// 🟢 Contact Form Submit
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    console.log('📝 Contact form received:', { name, email, subject });
    
    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All required fields are mandatory'
      });
    }
    
    // Add to Google Sheets
    const result = await addToSheet(name, email, phone, subject, message, 'Contact');
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Form submitted successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save data: ' + result.error
      });
    }
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// 🟢 Newsletter Subscribe
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('📧 Newsletter subscription:', email);
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    // Add to Google Sheets
    const result = await addToSheet('Newsletter Subscriber', email, '', 'Newsletter', 'Subscribed to newsletter', 'Newsletter');
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Subscribed successfully!'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save: ' + result.error
      });
    }
    
  } catch (error) {
    console.error('❌ Newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// 🟢 Get all submissions (Optional - Admin)
app.get('/api/submissions', async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    
    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
    };
    
    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return res.json({ success: true, data: [] });
    }
    
    // Headers + Data
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i] || '';
      });
      return obj;
    });
    
    res.json({
      success: true,
      data: data
    });
    
  } catch (error) {
    console.error('❌ Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 🟢 Test API endpoint (to check if server is running)
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    endpoints: {
      contact: 'POST /api/contact',
      newsletter: 'POST /api/newsletter',
      brochure: 'GET /api/download-brochure',
      submissions: 'GET /api/submissions'
    }
  });
});

// ========================================
// RENDER VIEWS
// ========================================

app.get('/', (req, res) => {
  res.render('index');
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, async () => {
  console.log(`========================================`);
  console.log(`✅ RECO Advertising Server Running`);
  console.log(`========================================`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📊 Google Sheets integration active`);
  console.log(`📁 Sheet ID: ${SPREADSHEET_ID}`);
  console.log(`📄 Brochure: GET /api/download-brochure`);
  console.log(`📧 Contact: POST /api/contact`);
  console.log(`📰 Newsletter: POST /api/newsletter`);
  console.log(`📋 Submissions: GET /api/submissions`);
  console.log(`🧪 Test API: GET /api/test`);
  console.log(`========================================`);
  
  // Optional: Create headers on startup
  try {
    await createHeaders();
  } catch(e) {
    console.log('⚠️ Headers already exist or error:', e.message);
  }
});
