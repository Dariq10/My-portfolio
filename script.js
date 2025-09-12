// Theme toggling
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Check user's preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            themeIcon.textContent = '☀️';
        }
        
        // Listen for changes in the color scheme
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
                themeIcon.textContent = '☀️';
            } else {
                document.documentElement.classList.remove('dark');
                themeIcon.textContent = '🌙';
            }
        });
        
        // Toggle theme manually
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            if (document.documentElement.classList.contains('dark')) {
                themeIcon.textContent = '☀️';
            } else {
                themeIcon.textContent = '🌙';
            }
        });
        
        // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Navigation scroll effect
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Form submission
        const contactForm = document.getElementById('contact-form');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Normally here we'd send the form data to a backend
            
            // Simulate form submission success
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].value = '';
                }
            }
            
            // Show a success message (in a real app we'd have better feedback)
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Your message has been sent successfully!';
            successMessage.style.color = 'var(--primary)';
            successMessage.style.marginTop = '1rem';
            successMessage.style.fontWeight = 'bold';
            
            contactForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
        
        // Current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Animated background
        const animatedBg = document.querySelector('.animated-bg');
        for (let i = 0; i < 10; i++) {
            const span = document.createElement('span');
            span.style.width = `${Math.random() * 30 + 10}px`;
            span.style.height = span.style.width;
            span.style.left = `${Math.random() * 100}%`;
            span.style.animationDelay = `${Math.random() * 5}s`;
            span.style.animationDuration = `${Math.random() * 10 + 5}s`;
            animatedBg.appendChild(span);
        }
        
        // Loading animation
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loading');
            setTimeout(() => {
                loader.classList.add('hide');
            }, 1000);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
// ========================================================================= //
// ========================= EMAILJS CONTACT FORM ========================== //
// ========================================================================= //

(function() {
    // Initialize EmailJS with your Public Key
    emailjs.init({
      publicKey: "6GaDuMSGBMVLClcdQ", // PASTE YOUR PUBLIC KEY HERE
    });
})();

window.addEventListener('load', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the default form submission

            const serviceID = 'service_cirnje9'; // PASTE YOUR SERVICE ID HERE
            const templateID = 'template_7qqcgmn'; // PASTE YOUR TEMPLATE ID HERE
            const status = document.getElementById('status');

            status.innerText = 'Sending...';
            status.style.color = '#0ef'; // Optional: style the text

            // Send the form data using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    status.innerText = 'Message sent successfully!';
                    setTimeout(() => { status.innerText = '' }, 5000); // Message disappears after 5 seconds
                    document.getElementById('contact-form').reset(); // Clear the form
                }, (err) => {
                    status.innerText = 'Failed to send. Please try again.';
                    status.style.color = 'red';
                    console.error('EmailJS Error:', JSON.stringify(err));
                });
        });
    }
});
