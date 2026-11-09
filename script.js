/**
 * AUREOLE Luxury Legal Template - JavaScript
 * TemplateMonster Demo #566517 Style
 */

document.addEventListener('DOMContentLoaded', function() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================
    // 1. PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    const heroSection = document.getElementById('inicio');

    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) {
                preloader.classList.add('hidden');
            }
            if (heroSection) {
                heroSection.classList.add('loaded');
            }
        }, 800);
    });

    // Fallback if load already fired
    setTimeout(function() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 2000);

    // ==========================================
    // 2. CUSTOM CURSOR (Desktop only)
    // ==========================================
    if (!reduceMotion && window.matchMedia('(min-width: 992px)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.25;
            cursorY += (mouseY - cursorY) * 0.25;

            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .specialty-card, .service-matrix-item, .detail-cta, input, select, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
            });
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            });
        });
    }

    // ==========================================
    // 3. NAVBAR SCROLL EFFECT & SMOOTH SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll con compensación de altura del navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - (navHeight - 5);
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Auto-seleccionar servicio en el formulario al hacer click en botones de especialidad
    const serviceTriggers = document.querySelectorAll('[data-service]');
    const clientServiceSelect = document.getElementById('clientService');
    serviceTriggers.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceVal = this.getAttribute('data-service');
            if (clientServiceSelect && serviceVal) {
                clientServiceSelect.value = serviceVal;
            }
        });
    });

    // ==========================================
    // 4. MOBILE MENU DRAWER
    // ==========================================
    const navbarToggler = document.getElementById('navbarToggler');
    const mobileDrawer = document.getElementById('mobileMenuDrawer');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (navbarToggler && mobileDrawer) {
        navbarToggler.addEventListener('click', function() {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeDrawer = function() {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeDrawer);
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    // ==========================================
    // 5. ACTIVE NAV ON SCROLL (SCROLLSPY)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    });

    // ==========================================
    // 6. FORMULARIO DE CONSULTA & WHATSAPP
    // ==========================================
    const legalForm = document.getElementById('legalReservationForm');
    const toastAlert = document.getElementById('toastAlert');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(msg) {
        if (!toastAlert) return;
        toastMessage.textContent = msg;
        toastAlert.classList.add('show');
        setTimeout(() => {
            toastAlert.classList.remove('show');
        }, 4500);
    }

    if (legalForm) {
        legalForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const email = document.getElementById('clientEmail').value.trim();
            const service = document.getElementById('clientService').value;
            const message = document.getElementById('clientMessage').value.trim();

            if (!name || !phone) {
                showToast('Por favor ingrese su nombre y teléfono.');
                return;
            }

            showToast(`¡Gracias ${name}! Preparando su consulta sobre ${service}...`);

            const whatsappText = encodeURIComponent(
                `*Nueva Consulta Legal - Asesoría Legal Integral*\n\n` +
                `*Cliente:* ${name}\n` +
                `*Teléfono:* ${phone}\n` +
                `*Correo:* ${email || 'No proporcionado'}\n` +
                `*Especialidad:* ${service}\n` +
                `*Detalle:* ${message || 'Solicitud de orientación legal.'}`
            );

            const whatsappUrl = `https://wa.me/51946871003?text=${whatsappText}`;

            legalForm.reset();

            setTimeout(function() {
                window.open(whatsappUrl, '_blank');
            }, 1200);
        });
    }
});
