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

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 6, 23, 0.98)';
        navbar.style.backdropFilter = 'blur(12px)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
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
            const progressBar = card.querySelector('.skill-progress');
            if (progressBar && !card.classList.contains('animated')) {
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                card.classList.add('animated');
            }
        }
    });
    skillsAnimated = true;
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

const animateStats = () => {
    if (counted) return;
    
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const target = parseInt(stat.textContent);
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

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Dynamic year in footer
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s';
    document.body.classList.add('loaded');
});

// Handle email click
const emailElement = document.querySelector('.clickable-email');
if (emailElement) {
    emailElement.addEventListener('click', () => {
        window.location.href = 'mailto:orlandochefito@gmail.com?subject=Contato%20via%20Portfólio';
    });
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

// Handle location click
const locationElement = document.querySelector('.clickable-location');
if (locationElement) {
    locationElement.addEventListener('click', () => {
        window.open('https://www.google.com/maps/search/Matola-Machava-Km15,Maputo,Mozambique', '_blank', 'noopener,noreferrer');
    });
}

// Form validation
const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        }
    });
    
    input.addEventListener('input', () => {
        input.style.borderColor = 'rgba(16, 185, 129, 0.2)';
    });
});

// Social links - garantir que abram em nova aba
document.querySelectorAll('.social-icon').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
    }
    if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ============================================
// EMAILJS CONFIGURAÇÃO - ENVIO DE E-MAIL
// ============================================

emailjs.init("YLbBx8DNU2grP2sdR");

const EMAILJS_SERVICE_ID = "service_s18xec4";
const EMAILJS_TEMPLATE_ID = "template_m4fhkxb";

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.querySelector('#contactForm button[type="submit"]');

function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject || 'Contato via Portfólio',
            message: message,
            to_email: 'orlandochefito@gmail.com'
        };
        
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showMessage('❌ Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            });
    });
}