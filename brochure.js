// ========================================
// GENERATE COMPLETE BROCHURE PDF (All 4 Pages)
// ========================================

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function generateCompleteBrochure() {
    try {
        console.log('📄 Generating Complete Brochure (4 Pages)...');

        // 🔴 LOGO PATH
        const logoPath = path.join(__dirname, 'public', 'images', 'reco_advertising_logo.png');

        // 🔴 IMAGE PATH - Glow Sign Board 5
        const imagePath = path.join(__dirname, 'public', 'images', 'our_recent_works', 'glow_sign_board5.jpg');

        // 🔴 Image ko Base64 mein convert karo
        const logoBuffer = fs.readFileSync(logoPath);
        const logoBase64 = logoBuffer.toString('base64');
        const logoDataUrl = `data:image/png;base64,${logoBase64}`;

        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        const imageDataUrl = `data:image/png;base64,${imageBase64}`;

        console.log('✅ Logo & Image converted to Base64');

        // 🔴 Client Logos Base64
        const clientLogos = [
            { name: "Carlsberg", path: "/images/clients_logo/carlsberg.png" },
            { name: "Royal Canin", path: "/images/clients_logo/royal_canin.png" },
            { name: "Muthoot Fincorp", path: "/images/clients_logo/muthoot_fincorp.png" },
            { name: "Acer", path: "/images/clients_logo/acer.png" },
            { name: "ASUS", path: "/images/clients_logo/asus.png" },
            { name: "MMTC-PAMP", path: "/images/clients_logo/MMTC-PAMP.png" },
            { name: "BenQ", path: "/images/clients_logo/BenQ.png" },
            { name: "McCan", path: "/images/clients_logo/mccain.png" },
            { name: "Voltas", path: "/images/clients_logo/voltas.png" },
            { name: "Redcliffe Labs", path: "/images/clients_logo/redcliffe_labs.png" },
            { name: "RAK Ceramics", path: "/images/clients_logo/rak_ceramics.png" }
        ];

        const clientLogosBase64 = clientLogos.map(client => {
            try {
                const fullPath = path.join(__dirname, 'public', client.path);
                const buffer = fs.readFileSync(fullPath);
                const base64 = buffer.toString('base64');
                const ext = path.extname(fullPath).substring(1);
                return { ...client, data: `data:image/${ext};base64,${base64}` };
            } catch (e) {
                console.log(`⚠️ Client logo not found: ${client.path}`);
                return { ...client, data: '' };
            }
        });

        // 🔴 Recent Works Base64
        const recentWorks = [
            "/images/our_recent_works/acp_letter_board.png",
            "/images/our_recent_works/acp_letter_board2.png",
            "/images/our_recent_works/acp_letter_board3.jpg",
            "/images/our_recent_works/acp_letter_board4.jpg",
            "/images/our_recent_works/glow_sign_board1.jpg",
            "/images/our_recent_works/glow_sign_board2.jpg",
            "/images/our_recent_works/glow_sign_board3.jpg",
            "/images/our_recent_works/glow_sign_board4.jpg",
            "/images/our_recent_works/glow_sign_board6.jpg",
            "/images/our_recent_works/glow_sign_board7.jpg",
            "/images/our_recent_works/glow_sign_board8.png"
        ];

        const worksBase64 = recentWorks.map(imgPath => {
            try {
                const fullPath = path.join(__dirname, 'public', imgPath);
                const buffer = fs.readFileSync(fullPath);
                const base64 = buffer.toString('base64');
                const ext = path.extname(fullPath).substring(1);
                return { path: imgPath, data: `data:image/${ext};base64,${base64}` };
            } catch (e) {
                console.log(`⚠️ Work image not found: ${imgPath}`);
                return { path: imgPath, data: '' };
            }
        });

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        // 🔴 WhatsApp Messages
        const whatsappMessage = `Hi Reco Advertising,%0A%0AI have gone through your brochure and I'm really impressed with your branding solutions.%0A%0AI would like to discuss how we can work together for my business branding needs.%0A%0APlease arrange a callback at your earliest convenience.%0A%0AThank you!`;
        const contactMsg = `Hi Reco Advertising,%0A%0AI have gone through your brochure and I'm really impressed with your work.%0A%0AI would like to discuss how we can work together for my business branding needs.%0A%0APlease arrange a callback at your earliest convenience.%0A%0AThank you!`;

        // 🔴 Client Brands List
        const brands = [
            "Carlsberg", "Royal Canin", "Muthoot Fincorp", "Acer", "ASUS",
            "MMTC-PAMP", "BenQ", "McCan", "Voltas", "Redcliffe Labs", "RAK Ceramics"
        ];

        const brandsHtml = brands.map(brand =>
            `<span class="brand-tag">${brand}</span>`
        ).join('');

        // 🔴 14 Branding Products
        const coverProducts = [
            { name: "3D Signage", desc: "Premium glow signs & displays" },
            { name: "LED Video Walls", desc: "High-impact digital displays" },
            { name: "LED Running Boards", desc: "Dynamic scrolling displays" },
            { name: "Roll Up Standee", desc: "Portable display solutions" },
            { name: "Acrylic Signs", desc: "Elegant indoor signage" },
            { name: "Wall Branding", desc: "Complete wall transformations" },
            { name: "Vehicle Branding", desc: "Mobile advertising solutions" },
            { name: "Corporate Gifting", desc: "Branded premium gifts" },
            { name: "Hoardings / Billboards", desc: "Large format outdoor ads" },
            { name: "Floor Display Units", desc: "In-store promotional displays" },
            { name: "Directional Signs", desc: "Wayfinding & guidance systems" },
            { name: "Lollipop Signage", desc: "Eye-catching outdoor signs" },
            { name: "Retail Branding", desc: "Complete store branding" },
            { name: "Glass Branding", desc: "Decorative glass solutions" }
        ];
        const coverProductsHtml = coverProducts.map(product => `
            <div class="product-item">
                <div class="product-dot"></div>
                <div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-desc">${product.desc}</div>
                </div>
            </div>
        `).join('');

        // 🔴 6 Products for Products Page
        const pageProducts = [
            {
                code: "C2MPL048",
                name: "Roll up standee",
                category: "Ad & Promotion",
                subcategory: "branding",
                image: "https://dl3.pushbulletusercontent.com/5e4kVP64PWiMaEdMYFCJEUjIKYxdE7w1/image.png",
                price: "N/A"
            },
            {
                code: "C2MPL049",
                name: "Luxury Roll up standee",
                category: "Ad & Promotion",
                subcategory: "branding",
                image: "https://dl3.pushbulletusercontent.com/w1vjoProg3RQPGP29i4I2Z4qMowzCoVM/image.png",
                price: "N/A"
            },
            {
                code: "C2MPL050",
                name: "MS Standee",
                category: "Ad & Promotion",
                subcategory: "branding",
                image: "https://dl3.pushbulletusercontent.com/c4HVXMEf0E2EwSETzyIbEHEzVpd5frrw/image.png",
                price: "N/A"
            },
            {
                code: "C2MPL051",
                name: "X Banner Stand",
                category: "Ad & Promotion",
                subcategory: "branding",
                image: "https://dl3.pushbulletusercontent.com/pbbt3fSD6H1kIbWgTChgqrHq3Fs6LspU/image.png",
                price: "N/A"
            },
            {
                code: "C2MPL052",
                name: "Backdrop Stand",
                category: "Ad & Promotion",
                subcategory: "branding",
                image: "https://dl3.pushbulletusercontent.com/Bn1QTLg6qrhEAVKRYZUJlzOvvolltz8v/image.png",
                price: "N/A"
            },
            {
                code: "C2MPL053",
                name: "Portable Backdrop",
                category: "Ad & Promotion",
                subcategory: "branding",
                image: "https://dl3.pushbulletusercontent.com/VpJyHVvKJxSyPl42JWDXPOfWVaU4LKmv/image.png",
                price: "N/A"
            }
        ];

        const pageProductsHtml = pageProducts.map((product) => {
            const productWhatsappMsg = `Hi Reco Advertising,%0A%0AI'm interested in: ${product.name}%0AProduct Code: ${product.code}%0ACategory: ${product.category}%0A%0AI would like to know more about pricing and availability.%0A%0APlease share details.`;

            return `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" onerror="this.outerHTML='<div class=\\'img-placeholder\\'><i class=\\'fas fa-image\\'></i></div>'">
                </div>
                <div class="product-details">
                    <div class="product-code">${product.code}</div>
                    <h3>${product.name}</h3>
                    <p>${product.category} • ${product.subcategory}</p>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                        <a href="https://wa.me/919717413445?text=${productWhatsappMsg}" target="_blank" class="btn-enquire">
                            <i class="fab fa-whatsapp"></i> Enquire Now
                        </a>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        // 🔴 Clients HTML
        const clientsHtml = clientLogosBase64.map(client => `
            <div class="client-item">
                <img src="${client.data}" alt="${client.name}" onerror="this.outerHTML='<div class=\\'client-placeholder\\'>${client.name}</div>'">
                <span>${client.name}</span>
            </div>
        `).join('');

        // 🔴 Works HTML
        const worksHtml = worksBase64.map(work => `
            <div class="work-item">
                <img src="${work.data}" alt="Recent Work" onerror="this.outerHTML='<div class=\\'work-placeholder\\'><i class=\\'fas fa-image\\'></i></div>'">
            </div>
        `).join('');

        // ============================================================
        // PAGE 1: COVER HTML
        // ============================================================
        const coverHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reco Advertising - Cover</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #ffffff; display: flex; align-items: flex-start; justify-content: center; min-height: 100vh; padding: 0; }
                .cover { max-width: 900px; width: 100%; min-height: 100vh; background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); border-radius: 0; padding: 2.5% 5% 1.5%; text-align: center; position: relative; overflow: hidden; box-shadow: none; border: none; display: flex; flex-direction: column; justify-content: flex-start; }
                .cover::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; }
                @keyframes shimmer { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 200% 0%; } }
                .cover .circle-1 { position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(233,69,96,0.04) 0%, transparent 70%); pointer-events: none; }
                .cover .circle-2 { position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,46,0.03) 0%, transparent 70%); pointer-events: none; }
                .logo-wrapper { position: relative; z-index: 1; margin-bottom: 5px; margin-top: 8px; }
                .logo-wrapper img { max-height: 75px; width: auto; display: block; margin: 0 auto; }
                .divider { width: 50px; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81); margin: 4px auto 6px; border-radius: 2px; position: relative; z-index: 1; }
                .tagline { font-size: 12px; color: #e94560; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; position: relative; z-index: 1; margin-bottom: 3px; }
                .main-title { font-size: 34px; font-weight: 800; color: #1a1a2e; line-height: 1.1; margin-bottom: 5px; position: relative; z-index: 1; }
                .main-title span { color: #e94560; position: relative; }
                .main-title span::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, #e94560, #ff6b81); border-radius: 2px; }
                .description { font-size: 15px; color: #444; max-width: 620px; margin: 0 auto 8px; line-height: 1.8; position: relative; z-index: 1; }
                .description strong { color: #e94560; }
                .brands-section { margin: 8px auto 10px; position: relative; z-index: 1; max-width: 700px; }
                .brands-section .brands-label { font-size: 11px; color: #999; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 5px; font-weight: 600; }
                .brands-section .brands-label span { color: #e94560; }
                .brand-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
                .brand-tag { background: rgba(233,69,96,0.06); color: #555; padding: 3px 12px; border-radius: 20px; font-size: 10px; font-weight: 500; border: 1px solid rgba(233,69,96,0.08); }
                .premium-image { margin: 0 auto 8px; position: relative; z-index: 1; max-width: 78%; }
                .premium-image img { width: 100%; max-height: 230px; object-fit: contain; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.04); background: #ffffff; }
                .buttons { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; margin-top: 4px; position: relative; z-index: 1; }
                .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 9px 28px; border-radius: 30px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; min-width: 170px; flex: 1 0 auto; }
                .btn-website { background: linear-gradient(135deg, #e94560, #c73e54); color: #ffffff; box-shadow: 0 4px 15px rgba(233,69,96,0.25); }
                .btn-website:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(233,69,96,0.35); }
                .btn-whatsapp { background: #25d366; color: #ffffff; box-shadow: 0 4px 15px rgba(37,211,102,0.25); }
                .btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,211,102,0.35); }
                .btn i { font-size: 13px; }
                .products-section { margin: 6px auto 8px; position: relative; z-index: 1; max-width: 700px; width: 100%; }
                .products-section .products-label { font-size: 11px; color: #999; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; }
                .products-section .products-label span { color: #e94560; }
                .products-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px 12px; text-align: left; }
                .product-item { display: flex; align-items: flex-start; gap: 8px; padding: 5px 8px; background: rgba(255,255,255,0.6); border-radius: 6px; border: 1px solid rgba(0,0,0,0.03); }
                .product-dot { width: 7px; height: 7px; min-width: 7px; border-radius: 50%; background: linear-gradient(135deg, #e94560, #ff6b81); margin-top: 4px; }
                .product-name { font-size: 11px; font-weight: 700; color: #1a1a2e; line-height: 1.3; }
                .product-desc { font-size: 9px; color: #888; line-height: 1.3; }
                .footer { background: linear-gradient(135deg, #1a1a2e, #16213e); margin-top: auto; margin-bottom: 4px; padding: 12px 20px 10px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; position: relative; z-index: 1; border: 1px solid rgba(255,255,255,0.05); }
                .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); border-radius: 12px 12px 0 0; }
                .footer-info { display: flex; flex-wrap: wrap; gap: 14px; font-size: 10px; color: rgba(255,255,255,0.65); }
                .footer-info span { display: flex; align-items: center; gap: 5px; }
                .footer-info i { color: #e94560; font-size: 10px; }
                .footer-social { display: flex; gap: 10px; }
                .footer-social a { color: rgba(255,255,255,0.35); font-size: 13px; transition: all 0.3s ease; }
                .footer-social a:hover { color: #e94560; transform: translateY(-2px); }
                .footer .footer-rights { font-size: 8px; color: rgba(255,255,255,0.25); width: 100%; text-align: center; margin-top: 2px; letter-spacing: 1px; }
                @media (max-width: 768px) { .cover { padding: 2% 4% 2%; } .main-title { font-size: 28px; } .logo-wrapper img { max-height: 55px; } .description { font-size: 14px; } .premium-image { max-width: 85%; } .premium-image img { max-height: 190px; } .btn { padding: 8px 20px; font-size: 12px; min-width: 140px; } .products-grid { grid-template-columns: 1fr 1fr; gap: 6px 12px; } .product-name { font-size: 11px; } .product-desc { font-size: 9px; } .footer { flex-direction: column; text-align: center; padding: 12px 16px 10px; } .footer-info { justify-content: center; } .brand-tag { font-size: 9px; padding: 2px 10px; } }
                @media (max-width: 480px) { .cover { padding: 1.5% 3% 2%; } .main-title { font-size: 22px; } .logo-wrapper img { max-height: 40px; } .tagline { font-size: 10px; letter-spacing: 3px; } .description { font-size: 13px; } .buttons { flex-direction: column; width: 100%; gap: 8px; } .btn { width: 100%; padding: 8px 16px; font-size: 12px; min-width: unset; } .premium-image { max-width: 95%; } .premium-image img { max-height: 140px; } .products-grid { grid-template-columns: 1fr 1fr; gap: 4px 8px; } .product-item { padding: 4px 6px; } .product-name { font-size: 10px; } .product-desc { font-size: 8px; } .brand-tags { gap: 4px; } .brand-tag { font-size: 8px; padding: 2px 8px; } .footer-info { font-size: 9px; gap: 6px; } .footer-social a { font-size: 11px; } .footer .footer-rights { font-size: 7px; } }
            </style>
        </head>
        <body>
            <div class="cover">
                <div class="circle-1"></div>
                <div class="circle-2"></div>
                <div class="logo-wrapper"><img src="${logoDataUrl}" alt="RECO Advertising"></div>
                <div class="divider"></div>
                <div class="tagline">Complete Retail Branding</div>
                <div class="main-title">Premium <span>Advertising</span> Solutions</div>
                <div class="description">Reco Advertising has been a trusted name in experiential marketing for over a decade. We specialize in creating interactive campaigns that spark conversations, build emotional connections, and foster lasting relationships with your audience.<br><br>From <strong>concept to execution</strong>, we deliver excellence in branding, printing, signage, and corporate gifting. Our <strong>expert team</strong> combines creative innovation with technical precision to bring your brand vision to life.</div>
                <div class="brands-section"><div class="brands-label">Trusted by <span>Industry Leaders</span></div><div class="brand-tags">${brandsHtml}</div></div>
                <div class="premium-image"><img src="${imageDataUrl}" alt="Premium Branding" onerror="this.outerHTML='<div style=\\'padding:30px;background:#f8f9fa;border-radius:10px;color:#999;font-size:13px;\\'>Premium Branding Image</div>'"></div>
                <div class="buttons"><a href="https://recoadvertising.in" target="_blank" class="btn btn-website"><i class="fas fa-globe"></i> Visit Website</a><a href="https://wa.me/919717413445?text=${whatsappMessage}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a></div>
                <div class="products-section"><div class="products-label">Most <span>Trusted</span> Solutions</div><div class="products-grid">${coverProductsHtml}</div></div>
                <div class="footer"><div class="footer-info"><span><i class="fas fa-map-marker-alt"></i> 22, Om Nagar, Badarpur, New Delhi - 110044</span><span><i class="fas fa-phone-alt"></i> +91 78360 18188</span><span><i class="fas fa-envelope"></i> recoadvt@gmail.com</span></div><div class="footer-social"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-linkedin-in"></i></a><a href="#"><i class="fab fa-youtube"></i></a></div><div class="footer-rights">&copy; 2024 Reco Advertising. All rights reserved.</div></div>
            </div>
        </body>
        </html>
        `;

        // ============================================================
        // PAGE 2: ABOUT US HTML
        // ============================================================
        const aboutHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reco Advertising - About Us</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #ffffff; display: flex; align-items: flex-start; justify-content: center; min-height: 100vh; padding: 0; }
                .about-page { max-width: 900px; width: 100%; min-height: 100vh; background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); border-radius: 0; padding: 2.5% 5% 1.5%; text-align: center; position: relative; overflow: hidden; box-shadow: none; border: none; display: flex; flex-direction: column; justify-content: flex-start; }
                .about-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; }
                @keyframes shimmer { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 200% 0%; } }
                .about-page .circle-1 { position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(233,69,96,0.04) 0%, transparent 70%); pointer-events: none; }
                .about-page .circle-2 { position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,46,0.03) 0%, transparent 70%); pointer-events: none; }
                .logo-wrapper { position: relative; z-index: 1; margin-bottom: 5px; margin-top: 8px; }
                .logo-wrapper img { max-height: 75px; width: auto; display: block; margin: 0 auto; }
                .divider { width: 50px; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81); margin: 4px auto 6px; border-radius: 2px; position: relative; z-index: 1; }
                .tagline { font-size: 12px; color: #e94560; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; position: relative; z-index: 1; margin-bottom: 3px; }
                .page-title { font-size: 34px; font-weight: 800; color: #1a1a2e; margin-bottom: 5px; position: relative; z-index: 1; }
                .page-title span { color: #e94560; }
                .about-description { position: relative; z-index: 1; margin-bottom: 8px; }
                .about-description p { font-size: 15px; color: #444; max-width: 620px; margin: 0 auto; line-height: 1.8; }
                .about-description strong { color: #e94560; }
                .vmv-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; position: relative; z-index: 1; margin-bottom: 10px; }
                .vmv-card { background: rgba(255,255,255,0.85); border-radius: 12px; padding: 18px 16px 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border: 1px solid rgba(233,69,96,0.06); text-align: center; }
                .vmv-card .icon { font-size: 28px; color: #e94560; margin-bottom: 6px; display: block; }
                .vmv-card h3 { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
                .vmv-card p { font-size: 12px; color: #666; line-height: 1.5; }
                .values-section { position: relative; z-index: 1; margin-top: 2px; }
                .values-section .values-label { font-size: 13px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
                .values-section .values-label span { color: #e94560; }
                .values-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; }
                .value-item { background: rgba(255,255,255,0.85); border-radius: 8px; padding: 10px 8px; border: 1px solid rgba(233,69,96,0.05); text-align: center; }
                .value-item .value-icon { font-size: 18px; color: #e94560; display: block; margin-bottom: 3px; }
                .value-item h4 { font-size: 11px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }
                .value-item p { font-size: 9px; color: #888; line-height: 1.3; }
                .footer { background: linear-gradient(135deg, #1a1a2e, #16213e); margin-top: auto; margin-bottom: 4px; padding: 12px 20px 10px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; position: relative; z-index: 1; border: 1px solid rgba(255,255,255,0.05); }
                .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); border-radius: 12px 12px 0 0; }
                .footer-info { display: flex; flex-wrap: wrap; gap: 14px; font-size: 10px; color: rgba(255,255,255,0.65); }
                .footer-info span { display: flex; align-items: center; gap: 5px; }
                .footer-info i { color: #e94560; font-size: 10px; }
                .footer-social { display: flex; gap: 10px; }
                .footer-social a { color: rgba(255,255,255,0.35); font-size: 13px; transition: all 0.3s ease; }
                .footer-social a:hover { color: #e94560; transform: translateY(-2px); }
                .footer .footer-rights { font-size: 8px; color: rgba(255,255,255,0.25); width: 100%; text-align: center; margin-top: 2px; letter-spacing: 1px; }
                @media (max-width: 768px) { .about-page { padding: 2% 4% 2%; } .page-title { font-size: 28px; } .logo-wrapper img { max-height: 55px; } .about-description p { font-size: 14px; } .vmv-grid { grid-template-columns: 1fr; gap: 12px; } .vmv-card { padding: 14px; } .values-grid { grid-template-columns: 1fr 1fr; gap: 6px; } .footer { flex-direction: column; text-align: center; padding: 12px 16px 10px; } .footer-info { justify-content: center; } }
                @media (max-width: 480px) { .about-page { padding: 1.5% 3% 2%; } .page-title { font-size: 22px; } .logo-wrapper img { max-height: 40px; } .about-description p { font-size: 13px; } .vmv-grid { grid-template-columns: 1fr; gap: 10px; } .vmv-card { padding: 12px; } .vmv-card .icon { font-size: 22px; } .vmv-card h3 { font-size: 13px; } .vmv-card p { font-size: 11px; } .values-grid { grid-template-columns: 1fr 1fr; gap: 5px; } .value-item { padding: 6px 4px; } .value-item .value-icon { font-size: 14px; } .value-item h4 { font-size: 9px; } .value-item p { font-size: 8px; } .footer-info { font-size: 9px; gap: 6px; } .footer-social a { font-size: 11px; } .footer .footer-rights { font-size: 7px; } }
            </style>
        </head>
        <body>
            <div class="about-page">
                <div class="circle-1"></div><div class="circle-2"></div>
                <div class="page-title">About <span>Us</span></div>
                <div class="about-description">
    <p>For over a decade, <strong>Reco Advertising</strong> has been delivering premium branding, printing, signage, and experiential marketing solutions that help businesses create a powerful market presence, earning the trust of leading brands such as <strong>Carlsberg, Royal Canin, Muthoot Fincorp, Acer, ASUS, MMTC-PAMP, BenQ, McCain Foods, Voltas, Redcliffe Labs, and RAK Ceramics</strong>. <br><br>From creative strategy and design to production, installation, and nationwide execution, our dedicated team transforms ideas into impactful brand experiences with uncompromising quality, innovation, and precision, building long-term partnerships through reliability, timely delivery, and exceptional customer service.</p>
</div>
                <div class="vmv-grid"><div class="vmv-card"><span class="icon"><i class="fas fa-eye"></i></span><h3>Our Vision</h3><p>To be the most trusted partner for brands seeking meaningful engagement with their audiences through innovative advertising solutions.</p></div><div class="vmv-card"><span class="icon"><i class="fas fa-rocket"></i></span><h3>Our Mission</h3><p>To establish Reco Advertising as the leading advertising organization in North India and Bihar by delivering innovative, reliable, and hassle-free services.</p></div><div class="vmv-card"><span class="icon"><i class="fas fa-heart"></i></span><h3>Our Values</h3><p>We believe in personal touch, collaborative approach, innovative ideas, and quality assurance in everything we do.</p></div></div>
                <div class="values-section"><div class="values-label">Our <span>Core Values</span></div><div class="values-grid"><div class="value-item"><span class="value-icon"><i class="fas fa-handshake"></i></span><h4>Integrity</h4><p>Honesty & transparency</p></div><div class="value-item"><span class="value-icon"><i class="fas fa-lightbulb"></i></span><h4>Innovation</h4><p>Creative & cutting-edge</p></div><div class="value-item"><span class="value-icon"><i class="fas fa-star"></i></span><h4>Quality</h4><p>Excellence in every project</p></div><div class="value-item"><span class="value-icon"><i class="fas fa-users"></i></span><h4>Customer Focus</h4><p>Understanding client needs</p></div></div></div>
                <div class="footer"><div class="footer-info"><span><i class="fas fa-map-marker-alt"></i> 22, Om Nagar, Badarpur, New Delhi - 110044</span><span><i class="fas fa-phone-alt"></i> +91 78360 18188</span><span><i class="fas fa-envelope"></i> recoadvt@gmail.com</span></div><div class="footer-social"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-linkedin-in"></i></a><a href="#"><i class="fab fa-youtube"></i></a></div><div class="footer-rights">&copy; 2024 Reco Advertising. All rights reserved.</div></div>
            </div>
        </body>
        </html>
        `;

        // ============================================================
        // PAGE 3: PRODUCTS HTML
        // ============================================================
        const productsHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reco Advertising - Products</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #ffffff; display: flex; align-items: flex-start; justify-content: center; min-height: 100vh; padding: 0; }
                .products-page { max-width: 900px; width: 100%; min-height: 100vh; background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); border-radius: 0; padding: 2.5% 5% 1.5%; text-align: center; position: relative; overflow: hidden; box-shadow: none; border: none; display: flex; flex-direction: column; justify-content: flex-start; }
                .products-page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; }
                @keyframes shimmer { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 200% 0%; } }
                .products-page .circle-1 { position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(233,69,96,0.04) 0%, transparent 70%); pointer-events: none; }
                .products-page .circle-2 { position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,46,0.03) 0%, transparent 70%); pointer-events: none; }
                .logo-wrapper { position: relative; z-index: 1; margin-bottom: 5px; margin-top: 8px; }
                .logo-wrapper img { max-height: 75px; width: auto; display: block; margin: 0 auto; }
                .divider { width: 50px; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81); margin: 4px auto 6px; border-radius: 2px; position: relative; z-index: 1; }
                .tagline { font-size: 12px; color: #e94560; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; position: relative; z-index: 1; margin-bottom: 3px; }
                .page-title { font-size: 34px; font-weight: 800; color: #1a1a2e; margin-bottom: 10px; position: relative; z-index: 1; }
                .page-title span { color: #e94560; }
                .products-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; position: relative; z-index: 1; margin-bottom: 14px; }
                .product-card { background: rgba(255,255,255,0.85); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid rgba(233,69,96,0.06); text-align: left; transition: all 0.3s ease; display: flex; flex-direction: column; }
                .product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
                .product-img { width: 100%; height: 160px; background: #f8f9fa; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .product-img img { width: 100%; height: 100%; object-fit: cover; }
                .img-placeholder { color: #ccc; font-size: 40px; }
                .product-details { padding: 14px 16px 16px; }
                .product-code { font-size: 10px; color: #e94560; font-weight: 600; letter-spacing: 1px; margin-bottom: 2px; }
                .product-details h3 { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; }
                .product-details p { font-size: 12px; color: #666; line-height: 1.5; margin-bottom: 10px; }
                .product-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.04); }
                .product-price { font-size: 16px; font-weight: 700; color: #e94560; }
                .btn-enquire { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; background: #25d366; color: #ffffff; border-radius: 25px; font-size: 12px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; }
                .btn-enquire:hover { transform: scale(1.03); box-shadow: 0 4px 15px rgba(37,211,102,0.3); }
                .btn-enquire i { font-size: 14px; }
                .view-more-container { position: relative; z-index: 1; margin-top: 4px; margin-bottom: 8px; }
                .btn-view-more { display: inline-flex; align-items: center; gap: 8px; padding: 10px 30px; background: transparent; color: #1a1a2e; border: 2px solid #e94560; border-radius: 30px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; }
                .btn-view-more:hover { background: #e94560; color: #ffffff; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(233,69,96,0.3); }
                .btn-view-more i { font-size: 14px; transition: transform 0.3s ease; }
                .btn-view-more:hover i { transform: translateX(5px); }
                .footer { background: linear-gradient(135deg, #1a1a2e, #16213e); margin-top: auto; margin-bottom: 4px; padding: 12px 20px 10px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; position: relative; z-index: 1; border: 1px solid rgba(255,255,255,0.05); }
                .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); border-radius: 12px 12px 0 0; }
                .footer-info { display: flex; flex-wrap: wrap; gap: 14px; font-size: 10px; color: rgba(255,255,255,0.65); }
                .footer-info span { display: flex; align-items: center; gap: 5px; }
                .footer-info i { color: #e94560; font-size: 10px; }
                .footer-social { display: flex; gap: 10px; }
                .footer-social a { color: rgba(255,255,255,0.35); font-size: 13px; transition: all 0.3s ease; }
                .footer-social a:hover { color: #e94560; transform: translateY(-2px); }
                .footer .footer-rights { font-size: 8px; color: rgba(255,255,255,0.25); width: 100%; text-align: center; margin-top: 2px; letter-spacing: 1px; }
                @media (max-width: 768px) { .products-page { padding: 2% 4% 2%; } .page-title { font-size: 28px; } .logo-wrapper img { max-height: 55px; } .products-grid { grid-template-columns: 1fr; gap: 14px; } .product-img { height: 140px; } .product-footer { flex-wrap: wrap; gap: 8px; } .btn-enquire { font-size: 11px; padding: 6px 14px; } .footer { flex-direction: column; text-align: center; padding: 12px 16px 10px; } .footer-info { justify-content: center; } }
                @media (max-width: 480px) { .products-page { padding: 1.5% 3% 2%; } .page-title { font-size: 22px; } .logo-wrapper img { max-height: 40px; } .products-grid { gap: 12px; } .product-img { height: 120px; } .product-details { padding: 10px 12px 12px; } .product-details h3 { font-size: 13px; } .product-details p { font-size: 11px; } .product-price { font-size: 14px; } .btn-enquire { font-size: 10px; padding: 5px 12px; } .btn-enquire i { font-size: 12px; } .btn-view-more { padding: 8px 20px; font-size: 12px; } .footer-info { font-size: 9px; gap: 6px; } .footer-social a { font-size: 11px; } }
            </style>
        </head>
        <body>
            <div class="products-page">
                <div class="circle-1"></div><div class="circle-2"></div>
                <div class="page-title">Our <span>Products</span></div>
                <div class="products-grid">${pageProductsHtml}</div>
                <div class="view-more-container"><a href="https://recoadvertising.in/#products" target="_blank" class="btn-view-more">View All Products <i class="fas fa-arrow-right"></i></a></div>
               
            </div>
        </body>
        </html>
        `;

        // ============================================================
        // PAGE 4: CLIENTS + WORKS HTML
        // ============================================================
        const clientsWorksHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reco Advertising - Clients & Works</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #ffffff; display: flex; align-items: flex-start; justify-content: center; min-height: 100vh; padding: 0; }
                .page { max-width: 900px; width: 100%; min-height: 100vh; background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); border-radius: 0; padding: 2.5% 5% 1.5%; text-align: center; position: relative; overflow: hidden; box-shadow: none; border: none; display: flex; flex-direction: column; justify-content: flex-start; }
                .page::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; }
                @keyframes shimmer { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 200% 0%; } }
                .page .circle-1 { position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(233,69,96,0.04) 0%, transparent 70%); pointer-events: none; }
                .page .circle-2 { position: absolute; bottom: -60px; left: -60px; width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,46,0.03) 0%, transparent 70%); pointer-events: none; }
                .logo-wrapper { position: relative; z-index: 1; margin-top: 4px; margin-bottom: 3px; }
                .logo-wrapper img { max-height: 60px; width: auto; display: block; margin: 0 auto; }
                .divider { width: 50px; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81); margin: 2px auto 4px; border-radius: 2px; position: relative; z-index: 1; }
                .tagline { font-size: 10px; color: #e94560; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; position: relative; z-index: 1; margin-bottom: 2px; }
                .page-title { font-size: 30px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; position: relative; z-index: 1; }
                .page-title span { color: #e94560; }
                .section-label { font-size: 13px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; position: relative; z-index: 1; text-align: left; padding-left: 4px; }
                .section-label span { color: #e94560; }
                .clients-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; position: relative; z-index: 1; margin-bottom: 12px; }
                .client-item { background: rgba(255,255,255,0.85); border-radius: 8px; padding: 8px 6px; border: 1px solid rgba(233,69,96,0.06); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60px; }
                .client-item img { max-height: 30px; width: auto; max-width: 80%; object-fit: contain; display: block; margin: 0 auto 3px; }
                .client-item span { font-size: 9px; color: #555; font-weight: 500; }
                .client-placeholder { font-size: 10px; color: #888; font-weight: 600; }
                .works-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; position: relative; z-index: 1; margin-bottom: 12px; }
                .work-item { border-radius: 8px; overflow: hidden; aspect-ratio: 1 / 1; background: #f8f9fa; border: 1px solid rgba(0,0,0,0.04); }
                .work-item img { width: 100%; height: 100%; object-fit: cover; }
                .work-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #ccc; font-size: 24px; background: #f8f9fa; }
                .contact-container { position: relative; z-index: 1; margin: 4px 0 8px; }
                .btn-contact { display: inline-flex; align-items: center; gap: 8px; padding: 10px 30px; background: linear-gradient(135deg, #25d366, #128C7E); color: #ffffff; border-radius: 30px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(37,211,102,0.25); }
                .btn-contact:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,211,102,0.35); }
                .btn-contact i { font-size: 18px; }
                .footer { background: linear-gradient(135deg, #1a1a2e, #16213e); margin-top: auto; margin-bottom: 4px; padding: 8px 16px 6px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px; position: relative; z-index: 1; border: 1px solid rgba(255,255,255,0.05); }
                .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b81, #e94560); border-radius: 10px 10px 0 0; }
                .footer-info { display: flex; flex-wrap: wrap; gap: 10px; font-size: 8px; color: rgba(255,255,255,0.65); }
                .footer-info span { display: flex; align-items: center; gap: 3px; }
                .footer-info i { color: #e94560; font-size: 8px; }
                .footer-social { display: flex; gap: 6px; }
                .footer-social a { color: rgba(255,255,255,0.35); font-size: 11px; transition: all 0.3s ease; }
                .footer-social a:hover { color: #e94560; transform: translateY(-2px); }
                .footer .footer-rights { font-size: 6px; color: rgba(255,255,255,0.25); width: 100%; text-align: center; margin-top: 2px; letter-spacing: 1px; }
                @media (max-width: 768px) { .page { padding: 2% 4% 2%; } .page-title { font-size: 24px; } .logo-wrapper img { max-height: 50px; } .clients-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; } .works-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; } .footer { flex-direction: column; text-align: center; padding: 8px 12px 6px; } .footer-info { justify-content: center; } }
                @media (max-width: 480px) { .page { padding: 1.5% 3% 2%; } .page-title { font-size: 20px; } .logo-wrapper img { max-height: 40px; } .clients-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; } .client-item { padding: 6px 4px; min-height: 50px; } .client-item img { max-height: 25px; } .client-item span { font-size: 8px; } .works-grid { grid-template-columns: repeat(2, 1fr); gap: 5px; } .btn-contact { padding: 8px 20px; font-size: 12px; } .btn-contact i { font-size: 15px; } .footer-info { font-size: 7px; gap: 4px; } .footer-social a { font-size: 10px; } }
            </style>
        </head>
        <body>
            <div class="page">
                <div class="circle-1"></div><div class="circle-2"></div>
                <div class="page-title">Our <span>Clients</span> & <span>Works</span></div>
                <div class="section-label">Our <span>Corporate Clients</span></div>
                <div class="clients-grid">${clientsHtml}</div>
                <div class="section-label">Our <span>Recent Works</span></div>
                <div class="works-grid">${worksHtml}</div>
                <div class="contact-container"><a href="https://wa.me/919717413445?text=${contactMsg}" target="_blank" class="btn-contact"><i class="fab fa-whatsapp"></i> Contact Us</a></div>
                <div class="footer"><div class="footer-info"><span><i class="fas fa-map-marker-alt"></i> 22, Om Nagar, Badarpur, New Delhi - 110044</span><span><i class="fas fa-phone-alt"></i> +91 78360 18188</span><span><i class="fas fa-envelope"></i> recoadvt@gmail.com</span></div><div class="footer-social"><a href="#"><i class="fab fa-facebook-f"></i></a><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-linkedin-in"></i></a><a href="#"><i class="fab fa-youtube"></i></a></div><div class="footer-rights">&copy; 2024 Reco Advertising. All rights reserved.</div></div>
            </div>
        </body>
        </html>
        `;

        // ========== GENERATE ALL 4 PDFS ==========
        const pdfBuffers = [];

        // Page 1: Cover
        const page1 = await browser.newPage();
        await page1.setContent(coverHtml, { waitUntil: 'networkidle0' });
        await page1.evaluate(() => new Promise(r => {
            const imgs = document.querySelectorAll('img');
            let c = 0, t = imgs.length;
            if (!t) r();
            imgs.forEach(i => { i.onload = i.onerror = () => { if (++c === t) r(); }; if (i.complete) c++; if (c === t) r(); });
        }));
        pdfBuffers.push(await page1.pdf({ format: 'A4', printBackground: true, margin: { top: '4px', bottom: '4px', left: '6px', right: '6px' } }));
        await page1.close();

        // Page 2: About Us
        const page2 = await browser.newPage();
        await page2.setContent(aboutHtml, { waitUntil: 'networkidle0' });
        await page2.evaluate(() => new Promise(r => {
            const imgs = document.querySelectorAll('img');
            let c = 0, t = imgs.length;
            if (!t) r();
            imgs.forEach(i => { i.onload = i.onerror = () => { if (++c === t) r(); }; if (i.complete) c++; if (c === t) r(); });
        }));
        pdfBuffers.push(await page2.pdf({ format: 'A4', printBackground: true, margin: { top: '4px', bottom: '4px', left: '6px', right: '6px' } }));
        await page2.close();

        // Page 3: Products
        const page3 = await browser.newPage();
        await page3.setContent(productsHtml, { waitUntil: 'networkidle0' });
        await page3.evaluate(() => new Promise(r => {
            const imgs = document.querySelectorAll('img');
            let c = 0, t = imgs.length;
            if (!t) r();
            imgs.forEach(i => { i.onload = i.onerror = () => { if (++c === t) r(); }; if (i.complete) c++; if (c === t) r(); });
        }));
        pdfBuffers.push(await page3.pdf({ format: 'A4', printBackground: true, margin: { top: '4px', bottom: '4px', left: '6px', right: '6px' } }));
        await page3.close();

        // Page 4: Clients + Works
        const page4 = await browser.newPage();
        await page4.setContent(clientsWorksHtml, { waitUntil: 'networkidle0' });
        await page4.evaluate(() => new Promise(r => {
            const imgs = document.querySelectorAll('img');
            let c = 0, t = imgs.length;
            if (!t) r();
            imgs.forEach(i => { i.onload = i.onerror = () => { if (++c === t) r(); }; if (i.complete) c++; if (c === t) r(); });
        }));
        pdfBuffers.push(await page4.pdf({ format: 'A4', printBackground: true, margin: { top: '4px', bottom: '4px', left: '6px', right: '6px' } }));
        await page4.close();

        await browser.close();

        // ========== MERGE ALL 4 PDFS ==========
        const mergedPdf = await PDFDocument.create();
        for (const buffer of pdfBuffers) {
            const doc = await PDFDocument.load(buffer);
            const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const mergedPdfPath = path.join(__dirname, 'public', 'reco-advertising-brochure.pdf');
        fs.writeFileSync(mergedPdfPath, mergedPdfBytes);

        console.log('✅ Complete Brochure generated (4 pages):', mergedPdfPath);
        console.log('   📄 Page 1: Cover');
        console.log('   📄 Page 2: About Us');
        console.log('   📄 Page 3: Products');
        console.log('   📄 Page 4: Clients & Works');
        return mergedPdfPath;

    } catch (error) {
        console.error('❌ PDF generation error:', error.message);
        return null;
    }
}

// Run
generateCompleteBrochure();
module.exports = generateCompleteBrochure;