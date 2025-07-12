<script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Navigation active state
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            // Close mobile menu when clicking a link
            if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
                document.getElementById('mobile-menu').classList.add('hidden');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form validation
        const contactForm = document.getElementById('contact-form');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset errors
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Validate name
            if (!name.value.trim()) {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                document.getElementById('subject-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                document.getElementById('message-error').classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - you would typically send the data to a server here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });

        // Animate skill bars on scroll
        const animateBars = () => {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            bar.style.width = width;
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(bar.parentElement);
            });
        };

        // Call when the skills section is loaded
        animateBars();
    </script>
