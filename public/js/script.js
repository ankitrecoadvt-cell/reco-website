// ========================================
// WAIT FOR DOM TO LOAD COMPLETELY
// ========================================
document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // HAMBURGER MENU TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ========================================
    // HERO SLIDER
    // ========================================
    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const progressBar = document.querySelector('.progress-bar');
        
        if (!slides.length) {
            console.log('⚠️ No slides found');
            return;
        }
        
        let currentSlide = 0;
        let totalSlides = slides.length;
        let autoPlayInterval = null;
        let progressInterval = null;
        let isPlaying = true;
        const slideDuration = 5000;
        const progressUpdateInterval = 50;

        function goToSlide(index) {
            slides.forEach(function(slide) { 
                slide.classList.remove('active'); 
            });
            dots.forEach(function(dot) { 
                dot.classList.remove('active'); 
            });
            
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
            resetProgress();
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function startAutoPlay() {
            if (autoPlayInterval) return;
            isPlaying = true;
            autoPlayInterval = setInterval(nextSlide, slideDuration);
            startProgress();
        }

        function pauseAutoPlay() {
            isPlaying = false;
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            pauseProgress();
        }

        function startProgress() {
            let progress = 0;
            const step = (progressUpdateInterval / slideDuration) * 100;
            progressInterval = setInterval(function() {
                progress += step;
                if (progress >= 100) progress = 0;
                if (progressBar) progressBar.style.width = progress + '%';
            }, progressUpdateInterval);
        }

        function pauseProgress() {
            clearInterval(progressInterval);
            progressInterval = null;
        }

        function resetProgress() {
            pauseProgress();
            if (progressBar) progressBar.style.width = '0%';
            if (isPlaying) startProgress();
        }

        // Event Listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                pauseAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                pauseAutoPlay();
                nextSlide();
                startAutoPlay();
            });
        }

        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                pauseAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });

        // Keyboard
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                pauseAutoPlay();
                prevSlide();
                startAutoPlay();
            }
            if (e.key === 'ArrowRight') {
                pauseAutoPlay();
                nextSlide();
                startAutoPlay();
            }
        });

        // Pause on hover
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', pauseAutoPlay);
            slider.addEventListener('mouseleave', startAutoPlay);
        }

        // Touch
        let touchStartX = 0, touchEndX = 0;
        if (slider) {
            slider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            slider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                const threshold = 50;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > threshold) {
                    pauseAutoPlay();
                    if (diff > 0) nextSlide();
                    else prevSlide();
                    startAutoPlay();
                }
            });
        }

        // Start
        goToSlide(0);
        startAutoPlay();
        console.log('✅ Hero Slider initialized with ' + totalSlides + ' slides');
    }

    // ========================================
    // PRODUCTS DATA
    // ========================================
    const products = [
        {
            code: "C2MPL048",
            name: "Roll up standee",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/5e4kVP64PWiMaEdMYFCJEUjIKYxdE7w1/image.png",
            price: "N/A",
            moq: "5",
            timeline: "24-48"
        },
        {
            code: "C2MPL049",
            name: "Luxury Roll up standee",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/w1vjoProg3RQPGP29i4I2Z4qMowzCoVM/image.png",
            price: "N/A",
            moq: "5",
            timeline: "24-48"
        },
        {
            code: "C2MPL050",
            name: "MS Standee",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/c4HVXMEf0E2EwSETzyIbEHEzVpd5frrw/image.png",
            price: "N/A",
            moq: "1",
            timeline: "48-72"
        },
        {
            code: "C2MPL051",
            name: "X Banner Stand",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/pbbt3fSD6H1kIbWgTChgqrHq3Fs6LspU/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL052",
            name: "Backdrop Stand",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/Bn1QTLg6qrhEAVKRYZUJlzOvvolltz8v/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL053",
            name: "Portable Backdrop",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/VpJyHVvKJxSyPl42JWDXPOfWVaU4LKmv/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL054",
            name: "Promo Umbrella",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/saQcCQ1mP7EozpeYQ3eyk3wzRsp7Ly2J/image.png",
            price: "N/A",
            moq: "1",
            timeline: "48-72"
        },
        {
            code: "C2MPL055",
            name: "Promo Flags",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/TMKZHyZF0BwhLpP2p1Gtbc53gIAN59gO/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL056",
            name: "Promo Table",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/CWFQCNUUGhUUgKYWzq2foVhHXRE2gsOt/image.png",
            price: "N/A",
            moq: "1",
            timeline: "48-72"
        },
        {
            code: "C2MPL057",
            name: "Canopy/Kiosk",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/pkdBLoYKI0v9VAhzNioPNKYMDEuKHH4G/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL058",
            name: "Pagoda / Tent",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/YeQC43k5674eZOFVIJs9mUl3DNPcucgY/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL059",
            name: "Cut out display",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/07UgpQ7Vcypb8LqGrWN3797ORLeqEtvM/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL060",
            name: "Arch Gates",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/2QdaY2oZhfHv75JwfpdlWq7fBm1neYBE/image.png",
            price: "N/A",
            moq: "1",
            timeline: "48-72"
        },
        {
            code: "C2MPL061",
            name: "Drop Downs",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/qLqFpI4wP95t5nRgAlLXtdqYEHdn7pQl/image.png",
            price: "N/A",
            moq: "1",
            timeline: "72-168"
        },
        {
            code: "C2MPL062",
            name: "Hoardings / Bill Boards",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/XBxQNYRU1wF9dPjD2FORrS6iOG7rMima/image.png",
            price: "N/A",
            moq: "1",
            timeline: "24-48"
        },
        {
            code: "C2MPL063",
            name: "Vehicle Ads",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/a4YnXXSH2tAFGFD8IHH8JKs0FMAoc54t/image.png",
            price: "N/A",
            moq: "1",
            timeline: "Custom"
        },
        {
            code: "C2MPL064",
            name: "OOH Ads",
            category: "Ad & Promotion",
            subcategory: "branding",
            image: "https://dl3.pushbulletusercontent.com/bcFpfaqEJb9YtOC7oG95Cb9CB4h8COXW/image.png",
            price: "N/A",
            moq: "NA",
            timeline: "Custom"
        }
    ];

    // ========================================
    // CLIENTS DATA
    // ========================================
    const clients = [
        { name: "Carlsberg", logo: "/images/clients_logo/carlsberg.png" },
        { name: "Royal Canin", logo: "/images/clients_logo/royal_canin.png" },
        { name: "Muthoot Fincorp", logo: "/images/clients_logo/muthoot_fincorp.png" },
        { name: "Acer", logo: "/images/clients_logo/acer.png" },
        { name: "ASUS", logo: "/images/clients_logo/asus.png" },
        { name: "MMTC-PAMP", logo: "/images/clients_logo/MMTC-PAMP.png" },
        { name: "BenQ", logo: "/images/clients_logo/BenQ.png" },
        { name: "McCan", logo: "/images/clients_logo/mccain.png" },
        { name: "Voltas", logo: "/images/clients_logo/voltas.png" },
        { name: "Redcliffe Labs", logo: "/images/clients_logo/redcliffe_labs.png" },
        { name: "RAK Ceramics", logo: "/images/clients_logo/rak_ceramics.png" }
    ];

    // ========================================
    // RECENT WORKS DATA
    // ========================================
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

    // ========================================
    // RENDER PRODUCTS
    // ========================================
    function renderProducts() {
        const grid = document.getElementById('productGrid');
        if (!grid) {
            console.error('❌ productGrid not found');
            return;
        }
        
        if (!products || products.length === 0) {
            grid.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">No products available</p>';
            return;
        }
        
        let html = '';
        products.forEach(function(product) {
            html += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
                        <div class="product-badge">${product.category}</div>
                        <div class="product-overlay">
                            <a href="#contact" class="quick-view">Inquire Now</a>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.subcategory}</div>
                        <h3>${product.name}</h3>
                        <p><strong>Code:</strong> ${product.code}</p>
                        <p><strong>MOQ:</strong> ${product.moq} | <strong>Timeline:</strong> ${product.timeline} hrs</p>
                        <div class="product-footer">
                            <span class="product-price">${product.price}</span>
                            <a href="#contact" class="btn-inquire">
                                <i class="fas fa-arrow-right"></i> Inquire
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        grid.innerHTML = html;
        console.log('✅ Products rendered: ' + products.length);
    }

    // ========================================
    // RENDER CLIENTS
    // ========================================
    function renderClients() {
        const grid = document.getElementById('clientGrid');
        if (!grid) {
            console.error('❌ clientGrid not found');
            return;
        }
        
        if (!clients || clients.length === 0) {
            grid.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">No clients available</p>';
            return;
        }
        
        let html = '';
        clients.forEach(function(client) {
            html += `
                <div class="client-card">
                    <div class="client-logo">
                        <img src="${client.logo}" alt="${client.name}" loading="lazy" onerror="this.style.display='none'">
                        <div class="client-overlay">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                    </div>
                    <h4>${client.name}</h4>
                </div>
            `;
        });
        
        grid.innerHTML = html;
        console.log('✅ Clients rendered: ' + clients.length);
    }

    // ========================================
    // RENDER RECENT WORKS
    // ========================================
    function renderWorks() {
        const grid = document.getElementById('worksGrid');
        if (!grid) {
            console.error('❌ worksGrid not found');
            return;
        }
        
        if (!recentWorks || recentWorks.length === 0) {
            grid.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">No works available</p>';
            return;
        }
        
        let html = '';
        recentWorks.forEach(function(image) {
            html += `
                <div class="work-item">
                    <img src="${image}" alt="Recent Work" loading="lazy" onerror="this.style.display='none'">
                    <div class="work-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            `;
        });
        
        grid.innerHTML = html;
        console.log('✅ Recent Works rendered: ' + recentWorks.length);
    }

    // ========================================
    // CONTACT FORM - NODE.JS VERSION (ONLY ONE)
    // ========================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const statusDiv = document.getElementById('formStatus');
            const submitBtn = this.querySelector('.submit-btn');
            
            // Validation
            let isValid = true;
            
            if (name.length < 2) {
                showError('name', 'nameError');
                isValid = false;
            } else {
                hideError('name', 'nameError');
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email', 'emailError');
                isValid = false;
            } else {
                hideError('email', 'emailError');
            }
            
            if (!subject) {
                showError('subject', 'subjectError');
                isValid = false;
            } else {
                hideError('subject', 'subjectError');
            }
            
            if (message.length < 10) {
                showError('message', 'messageError');
                isValid = false;
            } else {
                hideError('message', 'messageError');
            }
            
            if (!isValid) return;
            
            // Show loading
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
            
            console.log('📤 Sending to Node.js:', { name, email, subject });
            
            // Data send karo Node.js server ko
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, subject, message })
            })
            .then(function(response) {
                console.log('📥 Response status:', response.status);
                return response.json();
            })
            .then(function(data) {
                console.log('📥 Response data:', data);
                
                if (data.success) {
                    statusDiv.className = 'form-status success';
                    statusDiv.textContent = '✅ ' + data.message;
                    statusDiv.style.display = 'block';
                    contactForm.reset();
                } else {
                    statusDiv.className = 'form-status error';
                    statusDiv.textContent = '❌ ' + data.message;
                    statusDiv.style.display = 'block';
                }
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                
                setTimeout(function() {
                    statusDiv.style.display = 'none';
                }, 8000);
            })
            .catch(function(error) {
                console.error('❌ Fetch Error:', error);
                statusDiv.className = 'form-status error';
                statusDiv.textContent = '❌ Network error. Please try again.';
                statusDiv.style.display = 'block';
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            });
        });
    }

    // ========================================
    // NEWSLETTER - NODE.JS VERSION
    // ========================================
    function initNewsletter() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input[type="email"]');
            const message = this.querySelector('.newsletter-message');
            const email = input.value.trim();
            
            if (!email) {
                message.textContent = '⚠️ Please enter your email';
                message.style.color = '#ff6b6b';
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                message.textContent = '⚠️ Please enter a valid email';
                message.style.color = '#ff6b6b';
                return;
            }
            
            message.textContent = '⏳ Subscribing...';
            message.style.color = '#ffd93d';
            
            console.log('📤 Sending newsletter to Node.js:', { email });
            
            fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success) {
                    message.textContent = '✅ ' + data.message;
                    message.style.color = '#4caf50';
                    input.value = '';
                } else {
                    message.textContent = '❌ ' + data.message;
                    message.style.color = '#ff6b6b';
                }
                
                setTimeout(function() {
                    message.textContent = '';
                }, 5000);
            })
            .catch(function(error) {
                console.error('❌ Newsletter Error:', error);
                message.textContent = '❌ Network error. Please try again.';
                message.style.color = '#ff6b6b';
            });
        });
    }

    // ========================================
    // HELPER FUNCTIONS
    // ========================================
    function showError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.add('error');
        if (error) error.classList.add('show');
    }

    function hideError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.remove('error');
        if (error) error.classList.remove('show');
    }

    // ========================================
    // ACTIVE NAV LINK
    // ========================================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    function initScrollTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SCROLL ANIMATION
    // ========================================
    function initScrollAnimations() {
        // Animate product cards
        document.querySelectorAll('.product-card').forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        // Animate client cards
        document.querySelectorAll('.client-card').forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        // Animate work items
        document.querySelectorAll('.work-item').forEach(function(item) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
        });
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.product-card, .client-card, .work-item').forEach(function(el) {
            observer.observe(el);
        });
    }

    // ========================================
    // VIEW MORE BUTTONS - SCROLL TRIGGER
    // ========================================

    // 🟢 View More Products
    const viewMoreProducts = document.getElementById('viewMoreProducts');
    if (viewMoreProducts) {
        viewMoreProducts.addEventListener('click', function() {
            const grid = document.getElementById('productGrid');
            // Show all 17 products
            grid.innerHTML = products.map(function(product) {
                return `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
                            <div class="product-badge">${product.category}</div>
                            <div class="product-overlay">
                                <a href="#contact" class="quick-view">Inquire Now</a>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-category">${product.subcategory}</div>
                            <h3>${product.name}</h3>
                            <p><strong>Code:</strong> ${product.code}</p>
                            <p><strong>MOQ:</strong> ${product.moq} | <strong>Timeline:</strong> ${product.timeline} hrs</p>
                            <div class="product-footer">
                                <span class="product-price">${product.price}</span>
                                <a href="#contact" class="btn-inquire">
                                    <i class="fas fa-arrow-right"></i> Inquire
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            this.style.display = 'none';
            console.log('✅ All products shown');
        });
    }

    // 🟢 View More Clients
    const viewMoreClients = document.getElementById('viewMoreClients');
    if (viewMoreClients) {
        viewMoreClients.addEventListener('click', function() {
            const grid = document.getElementById('clientGrid');
            grid.innerHTML = clients.map(function(client) {
                return `
                    <div class="client-card">
                        <div class="client-logo">
                            <img src="${client.logo}" alt="${client.name}" loading="lazy" onerror="this.style.display='none'">
                            <div class="client-overlay">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                        </div>
                        <h4>${client.name}</h4>
                    </div>
                `;
            }).join('');
            
            this.style.display = 'none';
            console.log('✅ All clients shown');
        });
    }

    // 🟢 View More Works
    const viewMoreWorks = document.getElementById('viewMoreWorks');
    if (viewMoreWorks) {
        viewMoreWorks.addEventListener('click', function() {
            const grid = document.getElementById('worksGrid');
            grid.innerHTML = recentWorks.map(function(image) {
                return `
                    <div class="work-item">
                        <img src="${image}" alt="Recent Work" loading="lazy" onerror="this.style.display='none'">
                        <div class="work-overlay">
                            <i class="fas fa-search-plus"></i>
                        </div>
                    </div>
                `;
            }).join('');
            
            this.style.display = 'none';
            console.log('✅ All works shown');
        });
    }

    // ========================================
    // SCROLL TRIGGER - SHOW VIEW MORE BUTTONS
    // ========================================

    function initViewMoreTriggers() {
        const sections = [
            { id: 'products', btnId: 'viewMoreProducts' },
            { id: 'clients', btnId: 'viewMoreClients' },
            { id: 'recent-works', btnId: 'viewMoreWorks' }
        ];
        
        sections.forEach(function(section) {
            const el = document.getElementById(section.id);
            const btn = document.getElementById(section.btnId);
            
            if (!el || !btn) return;
            
            // Initially hide button
            btn.style.display = 'none';
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            
            // Show button when user scrolls to section
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        btn.style.display = 'inline-flex';
                        // Trigger animation after a small delay
                        setTimeout(function() {
                            btn.classList.add('visible');
                        }, 300);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(el);
        });
    }

    // ========================================
    // INITIALIZE EVERYTHING
    // ========================================
    console.log('🚀 Reco Advertising Website Loading...');
    
    renderProducts();
    renderClients();
    renderWorks();
    initHeroSlider();
    initContactForm();
    initNewsletter();
    initActiveNav();
    initScrollTop();
    initScrollAnimations();
    initViewMoreTriggers();
    
    console.log('✅ Website fully loaded!');

}); // END DOMContentLoaded