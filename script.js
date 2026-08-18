/* =============================================
   Orlando Gito - Scripts principais do portfólio
   ============================================= */

(function() {
    'use strict';

    // ------------------------------------------------------------
    // Orlando Gito - Menu mobile e navegação
    // ------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Orlando Gito - Fecha menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Rolagem suave para links âncora
    // ------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ------------------------------------------------------------
    // Orlando Gito - Efeito de scroll na navbar e destaque do link ativo
    // ------------------------------------------------------------
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        // Orlando Gito - Muda opacidade da navbar
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(2, 6, 23, 0.98)';
            navbar.style.backdropFilter = 'blur(12px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(12px)';
        }

        // Orlando Gito - Destaca o link da seção visível
        let current = '';
        document.querySelectorAll('section').forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ------------------------------------------------------------
    // Orlando Gito - Anima as barras de habilidade ao entrar na viewport
    // ------------------------------------------------------------
    const skillCards = document.querySelectorAll('.skill-card');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;
        skillCards.forEach(function(card) {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const progressBar = card.querySelector('.skill-progress');
                if (progressBar && !card.classList.contains('animated')) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    setTimeout(function() {
                        progressBar.style.width = width;
                    }, 100);
                    card.classList.add('animated');
                }
            }
        });
        skillsAnimated = true;
    }

    window.addEventListener('scroll', animateSkills);
    window.addEventListener('load', animateSkills);

    // ------------------------------------------------------------
    // Orlando Gito - Efeito de máquina de escrever no subtítulo do hero
    // ------------------------------------------------------------
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // ------------------------------------------------------------
    // Orlando Gito - Contador animado para as estatísticas
    // ------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function animateStats() {
        if (counted) return;
        statNumbers.forEach(function(stat) {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const target = parseInt(stat.textContent, 10);
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                function updateCount() {
                    if (count < target) {
                        count += increment;
                        stat.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                }
                updateCount();
            }
        });
        counted = true;
    }

    window.addEventListener('scroll', animateStats);
    window.addEventListener('load', animateStats);

    // ------------------------------------------------------------
    // Orlando Gito - Efeito parallax no hero
    // ------------------------------------------------------------
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Atualiza o ano no rodapé dinamicamente
    // ------------------------------------------------------------
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ------------------------------------------------------------
    // Orlando Gito - Loading fade-in
    // ------------------------------------------------------------
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s';
        document.body.classList.add('loaded');
    });

    // ------------------------------------------------------------
    // Orlando Gito - Clique no e-mail (abre cliente de e-mail)
    // ------------------------------------------------------------
    const emailElement = document.querySelector('.clickable-email');
    if (emailElement) {
        emailElement.addEventListener('click', function() {
            window.location.href = 'mailto:orlandochefito@gmail.com?subject=Contato%20via%20Portfólio';
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Clique nos telefones (abre WhatsApp)
    // ------------------------------------------------------------
    document.querySelectorAll('.clickable-phone').forEach(function(phone) {
        phone.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('data-phone') || this.textContent.replace(/\D/g, '');
            const cleanNumber = phoneNumber.replace(/\D/g, '');
            window.open('https://wa.me/258' + cleanNumber, '_blank', 'noopener,noreferrer');
        });
    });

    // ------------------------------------------------------------
    // Orlando Gito - Clique na localização (abre Google Maps)
    // ------------------------------------------------------------
    const locationElement = document.querySelector('.clickable-location');
    if (locationElement) {
        locationElement.addEventListener('click', function() {
            window.open('https://www.google.com/maps/search/Matola-Machava-Km15,Maputo,Mozambique', '_blank', 'noopener,noreferrer');
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Validação simples dos campos do formulário
    // ------------------------------------------------------------
    document.querySelectorAll('.input-group input, .input-group textarea').forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            }
        });
        input.addEventListener('input', function() {
            this.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        });
    });

    // ------------------------------------------------------------
    // Orlando Gito - Garante que links sociais abram em nova aba
    // ------------------------------------------------------------
    document.querySelectorAll('.social-icon').forEach(function(link) {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ------------------------------------------------------------
    // Orlando Gito - Configuração do EmailJS (envio de mensagens)
    // ------------------------------------------------------------
    // Inicializa o EmailJS com a chave pública
    emailjs.init('YLbBx8DNU2grP2sdR');

    const EMAILJS_SERVICE_ID = 'service_s18xec4';
    const EMAILJS_TEMPLATE_ID = 'template_m4fhkxb';

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');

    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

})();