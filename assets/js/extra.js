// Enhanced interactivity for lab website
// Add this to your extra.js file
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the page to fully load
    setTimeout(function() {
        // Find the first tab (Home)
       if (firstTab) {
            // Create logo image element
            const logoImg = document.createElement('img');
            logoImg.src = '/assets/favicon.png';  // Adjust path to your logo
                logoImg.style.cssText = `
                height: 3px;
                width: 3px;
                border-radius: 70%;
                border: 1px solid rgba(255,255,255,0.3);
                box-shadow: 0 1px 1px rgba(0,0,0,0.2);
                transition: transform 0.3s ease;
                display: block;
            `;
            
            // Clear the existing content (text "Home")
            firstTab.innerHTML = '';
            
            // Add the logo
            firstTab.appendChild(logoImg);
            
            // Adjust the tab styling
            firstTab.style.cssText = `
                padding: 5px;
                margin-right: 1rem;
                display: flex;
                align-items: center;
                opacity: 1 !important;
            `;
            
            // Add hover effect
            firstTab.addEventListener('mouseenter', function() {
                logoImg.style.transform = 'scale(1.1)';
                logoImg.style.borderColor = 'rgba(255,255,255,0.5)';
            });
            
            firstTab.addEventListener('mouseleave', function() {
                logoImg.style.transform = 'scale(1)';
                logoImg.style.borderColor = 'rgba(255,255,255,0.3)';
            });
        }
        
        // Optional: Add divider after logo
        const tabsList = document.querySelector('.md-tabs__list');
        if (tabsList && firstTab) {
            const divider = document.createElement('div');
            divider.style.cssText = `
                width: 10px;
                height: 25px;
                background: rgba(255,255,255,0.3);
                margin: 0 1rem;
            `;
            firstTab.parentElement.after(divider);
        }
    }, 100);
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Typing animation for hero section
    function typeWriter(element, text, speed = 50) {
        if (!element) return;
        
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing animation if hero subtitle exists
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 30);
    }
    
    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Intersection Observer for counter animations
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count) || parseInt(counter.textContent);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Interactive publication search/filter
    function initPublicationFilter() {
        const searchInput = document.getElementById('publication-search');
        const yearFilter = document.getElementById('year-filter');
        const publications = document.querySelectorAll('.publication');
        
        if (!searchInput || !publications.length) return;
        
        function filterPublications() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedYear = yearFilter ? yearFilter.value : '';
            
            publications.forEach(pub => {
                const title = pub.querySelector('.publication-title')?.textContent.toLowerCase() || '';
                const authors = pub.querySelector('.publication-authors')?.textContent.toLowerCase() || '';
                const year = pub.dataset.year || '';
                
                const matchesSearch = title.includes(searchTerm) || authors.includes(searchTerm);
                const matchesYear = !selectedYear || year === selectedYear;
                
                if (matchesSearch && matchesYear) {
                    pub.style.display = 'block';
                    pub.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    pub.style.display = 'none';
                }
            });
        }
        
        searchInput.addEventListener('input', filterPublications);
        if (yearFilter) yearFilter.addEventListener('change', filterPublications);
    }
    
    // Initialize publication filter
    initPublicationFilter();
    
    // Add parallax effect to hero section
    function addParallaxEffect() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Initialize parallax (only on larger screens)
    if (window.innerWidth > 768) {
        addParallaxEffect();
    }
    
    // Add hover effects for team member cards
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Interactive research area cards with tilt effect
    document.querySelectorAll('.research-area').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) return;
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Dynamic copyright year
    const copyrightElement = document.querySelector('.md-footer-copyright__highlight');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace(/\d{4}/, currentYear);
    }
    
    // Add scroll-to-top functionality
    function addScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--md-primary-fg-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effects
        scrollButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        scrollButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
    }
    
    // FAQ accordion functionality
    function initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('span:last-child');
                
                // Toggle active state
                answer.classList.toggle('active');
                
                // Update icon
                if (answer.classList.contains('active')) {
                    icon.textContent = '−';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.textContent = '+';
                    icon.style.transform = 'rotate(0deg)';
                }
                
                // Close other FAQ items (optional - for accordion behavior)
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('span:last-child');
                        otherAnswer.classList.remove('active');
                        otherIcon.textContent = '+';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
            });
        });
    }
    
    // Contact form functionality
    function initContactForm() {
        const form = document.querySelector('.contact-form form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const position = formData.get('position');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }
    
    // Position card interactions
    function initPositionCards() {
        const positionCards = document.querySelectorAll('.position-card');
        
        positionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.borderLeftColor = 'var(--md-accent-fg-color)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.borderLeftColor = 'var(--md-primary-fg-color)';
            });
        });
    }
    
    // Initialize FAQ and form functionality
    initFAQAccordion();
    initContactForm();
    initPositionCards();
    
    // Preloader for the entire site (optional)
    function addPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-spinner">
                <div class="spinner"></div>
                <p>Loading KhaledLab...</p>
            </div>
        `;
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        const spinnerCSS = `
            <style>
            .preloader-spinner {
                text-align: center;
            }
            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid var(--md-primary-fg-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', spinnerCSS);
        document.body.insertAdjacentElement('afterbegin', preloader);
        
        // Remove preloader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        });
    }
    
    // Uncomment to enable preloader
    // addPreloader();
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}