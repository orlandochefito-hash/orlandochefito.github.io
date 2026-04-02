// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links (âncoras internas - mesma aba)
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Animate skill bars on scroll
const skillCards = document.querySelectorAll('.skill-card');

const animateSkills = () => {
    skillCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
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
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 500);
}

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const statPosition = stat.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statPosition < screenPosition && !stat.classList.contains('counted')) {
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
                    stat.classList.add('counted');
                }
            };
            
            updateCount();
        }
    });
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Dynamic year in footer
const yearElement = document.querySelector('.footer p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle email click (abre cliente de email - mesma aba)
const emailElement = document.querySelector('.clickable-email');
if (emailElement) {
    emailElement.addEventListener('click', () => {
        window.location.href = 'mailto:orlandochefito@gmail.com?subject=Contacto%20do%20Portfólio';
    });
}

// Handle phone clicks with Moçambique code (+258) - abre WhatsApp em nova aba
const phoneElements = document.querySelectorAll('.clickable-phone');
phoneElements.forEach(phone => {
    phone.addEventListener('click', () => {
        const phoneNumber = phone.dataset.phone || phone.textContent.replace(/\s/g, '');
        window.open(`https://wa.me/258${phoneNumber}`, '_blank', 'noopener noreferrer');
    });
});

// Handle location click - abre Google Maps em nova aba
const locationElement = document.querySelector('.clickable-location');
if (locationElement) {
    locationElement.addEventListener('click', () => {
        window.open('https://www.google.com/maps/search/Matola-Machava-Km15,Maputo,Mozambique', '_blank', 'noopener noreferrer');
    });
}

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            input.classList.remove('error');
        }
    });
});

// Social media link tracking
const whatsappLink = document.querySelector('a[title="WhatsApp"]');
const instagramLink = document.querySelector('a[title="Instagram"]');
const githubLink = document.querySelector('a[title="GitHub"]');

if (whatsappLink) {
    whatsappLink.addEventListener('click', (e) => {
        console.log('Link do WhatsApp clicado - abrindo em nova aba com código +258');
    });
}

if (instagramLink) {
    instagramLink.addEventListener('click', (e) => {
        console.log('Link do Instagram clicado - abrindo em nova aba');
    });
}

if (githubLink) {
    githubLink.addEventListener('click', (e) => {
        console.log('Link do GitHub clicado - abrindo em nova aba');
    });
}

// Garantir que links sociais realmente abram em nova aba
document.querySelectorAll('.social-links a').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
    }
    if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
    
    const href = link.getAttribute('href');
    if (href === '#' || href === '') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Link será atualizado com o seu perfil social em breve!');
        });
    }
});

// ============================================
// EMAILJS CONFIGURAÇÃO - ENVIO DE E-MAIL
// ============================================

// Inicializar EmailJS com sua Public Key
emailjs.init("YLbBx8DNU2grP2sdR");

// Configurações do EmailJS
const EMAILJS_SERVICE_ID = "service_s18xec4";
const EMAILJS_TEMPLATE_ID = "template_m4fhkxb";

// Pegar elementos do formulário
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.querySelector('#contactForm button[type="submit"]');

// Função para mostrar mensagem
function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Função para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Evento de envio do formulário
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
                submitBtn.innerHTML = 'Enviar Mensagem';
            });
    });
}