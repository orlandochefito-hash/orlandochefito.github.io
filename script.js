// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(12px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(12px)';
    }
    
    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const skillCards = document.querySelectorAll('.skill-card');
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;
    
    skillCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const percent = card.querySelector('.skill-percent').textContent;
            const progressBar = card.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.width = percent;
            }
        }
    });
    skillsAnimated = true;
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Animate stats counter
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

const animateStats = () => {
    if (counted) return;
    
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    stat.textContent = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        }
    });
    counted = true;
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ============================================
// EMAILJS CONFIGURAÇÃO - CONFIGURADO COM SUAS CREDENCIAIS
// ============================================

// Suas credenciais do EmailJS
const EMAILJS_PUBLIC_KEY = "YLbBx8DNU2grP2sdR";
const EMAILJS_SERVICE_ID = "service_s18xec4";
const EMAILJS_TEMPLATE_ID = "template_m4fhkxb";

// Inicializar EmailJS com sua Public Key
emailjs.init(EMAILJS_PUBLIC_KEY);

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando mensagem...';
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject || 'Contato via Portfólio',
            message: message,
            to_email: 'orlandochefito@gmail.com',
            reply_to: email
        };
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email enviado com sucesso!', response);
            showMessage('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            showMessage('❌ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente por email: orlandochefito@gmail.com', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            
            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                if (formMessage.classList.contains('success')) {
                    formMessage.style.display = 'none';
                    formMessage.className = 'form-message';
                }
            }, 5000);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show message helper
function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide messages after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }, 5000);
}

// Handle phone clicks (WhatsApp)
const phoneElements = document.querySelectorAll('.clickable-phone');
phoneElements.forEach(phone => {
    phone.addEventListener('click', () => {
        const phoneNumber = phone.getAttribute('data-phone') || phone.textContent.replace(/\D/g, '');
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        window.open(`https://wa.me/258${cleanNumber}`, '_blank', 'noopener,noreferrer');
    });
});

// Handle email click
const emailElement = document.querySelector('.clickable-email');
if (emailElement) {
    emailElement.addEventListener('click', () => {
        window.location.href = 'mailto:orlandochefito@gmail.com?subject=Contato%20via%20Portfólio';
    });
}

// Handle location click
const locationElement = document.querySelector('.clickable-location');
if (locationElement) {
    locationElement.addEventListener('click', () => {
        window.open('https://www.google.com/maps/search/Matola-Machava-Km15,Maputo,Mozambique', '_blank', 'noopener,noreferrer');
    });
}

// Set current year in footer
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s';
});

// Form input focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});