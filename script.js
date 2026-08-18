/* =============================================
   Orlando Gito - Refined Portfolio Scripts
   ============================================= */

(function() {
    'use strict';

    // ------------------------------------------------------------
    // Orlando Gito - Menu mobile
    // ------------------------------------------------------------
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Scroll suave para âncoras
    // ------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ------------------------------------------------------------
    // Orlando Gito - Destaque do link ativo na navbar
    // ------------------------------------------------------------
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var current = '';
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    window.addEventListener('load', highlightNav);

    // ------------------------------------------------------------
    // Orlando Gito - Animação de contadores
    // ------------------------------------------------------------
    var statNumbers = document.querySelectorAll('.stat-number');
    var counted = false;

    function animateStats() {
        if (counted) return;
        statNumbers.forEach(function(stat) {
            var rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                var target = parseInt(stat.textContent, 10);
                var count = 0;
                var duration = 2000;
                var increment = target / (duration / 16);

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
    // Orlando Gito - Ano atual no rodapé
    // ------------------------------------------------------------
    var yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ------------------------------------------------------------
    // Orlando Gito - Clique no e-mail
    // ------------------------------------------------------------
    var emailEl = document.querySelector('.clickable-email');
    if (emailEl) {
        emailEl.addEventListener('click', function() {
            window.location.href = 'mailto:orlandochefito@gmail.com?subject=Contato%20via%20Portfólio';
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Clique no telefone (WhatsApp)
    // ------------------------------------------------------------
    document.querySelectorAll('.clickable-phone').forEach(function(phone) {
        phone.addEventListener('click', function() {
            var number = this.getAttribute('data-phone') || this.textContent.replace(/\D/g, '');
            window.open('https://wa.me/258' + number.replace(/\D/g, ''), '_blank', 'noopener,noreferrer');
        });
    });

    // ------------------------------------------------------------
    // Orlando Gito - Clique na localização (Google Maps)
    // ------------------------------------------------------------
    var locationEl = document.querySelector('.clickable-location');
    if (locationEl) {
        locationEl.addEventListener('click', function() {
            window.open('https://www.google.com/maps/search/Matola-Machava-Km15,Maputo,Mozambique', '_blank', 'noopener,noreferrer');
        });
    }

    // ------------------------------------------------------------
    // Orlando Gito - Redes sociais (abrir em nova aba)
    // ------------------------------------------------------------
    document.querySelectorAll('.social-link').forEach(function(link) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // ------------------------------------------------------------
    // Orlando Gito - EmailJS (envio de mensagens)
    // ------------------------------------------------------------
    emailjs.init('YLbBx8DNU2grP2sdR');

    var SERVICE_ID = 'service_s18xec4';
    var TEMPLATE_ID = 'template_m4fhkxb';

    var form = document.getElementById('contactForm');
    var msgDiv = document.getElementById('formMessage');
    var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    function showMessage(msg, type) {
        msgDiv.textContent = msg;
        msgDiv.className = type;
        msgDiv.style.display = 'block';
        setTimeout(function() {
            msgDiv.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();

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

            var params = {
                from_name: name,
                from_email: email,
                subject: subject || 'Contato via Portfólio',
                message: message,
                to_email: 'orlandochefito@gmail.com'
            };

            emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
                .then(function() {
                    showMessage('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                    form.reset();
                })
                .catch(function() {
                    showMessage('❌ Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensagem';
                });
        });
    }

})();