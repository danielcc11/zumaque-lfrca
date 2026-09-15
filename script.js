// ============================================
// SCRIPT COMPLETO PARA ZUMAQUE LFR
// ============================================
// El menú se ajusta AUTOMÁTICAMENTE según el tamaño de pantalla:
// - Desktop (> 768px): Menú Clásico (Halliburton)
// - Móvil (≤ 768px): Menú Hamburguesa
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 0. BARRA DE PROGRESO DE SCROLL
    // ==========================================
    var progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        document.body.insertBefore(progressBar, document.body.firstChild);
    }

    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var height = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / height) * 100;
        progressBar.style.width = progress + '%';
    });

    // ==========================================
    // 1. DETECCIÓN AUTOMÁTICA DE MENÚ POR DISPOSITIVO
    // ==========================================
    var menuClassic = document.querySelector('.menu-classic-container');
    var hamburgerBtn = document.getElementById('hamburger');
    var navMenu = document.getElementById('nav-menu');

    function ajustarMenu() {
        if (window.innerWidth <= 768) {
            // MÓVIL: Mostrar hamburguesa, ocultar clásico
            if (menuClassic) {
                menuClassic.style.display = 'none';
                menuClassic.style.visibility = 'hidden';
            }
            if (hamburgerBtn) {
                hamburgerBtn.style.display = 'flex';
                hamburgerBtn.style.visibility = 'visible';
            }
            if (navMenu) {
                navMenu.style.display = 'block';
                navMenu.style.visibility = 'visible';
            }
        } else {
            // DESKTOP: Mostrar clásico, ocultar hamburguesa
            if (menuClassic) {
                menuClassic.style.display = 'flex';
                menuClassic.style.visibility = 'visible';
                menuClassic.style.borderTop = 'none';
                menuClassic.style.borderBottom = 'none';
            }
            if (hamburgerBtn) {
                hamburgerBtn.style.display = 'none';
                hamburgerBtn.style.visibility = 'hidden';
            }
            if (navMenu) {
                navMenu.style.display = 'none';
                navMenu.style.visibility = 'hidden';
                navMenu.classList.remove('active');
            }
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    // Ejecutar al cargar
    ajustarMenu();

    // Ejecutar al redimensionar la ventana
    window.addEventListener('resize', ajustarMenu);

    // ==========================================
    // 2. MENÚ HAMBURGUESA (Móvil)
    // ==========================================
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.querySelectorAll('.nav-links a');

    function cerrarMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    function toggleMenu(e) {
        if (e) e.stopPropagation();
        if (hamburger) hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', cerrarMenu);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!navMenu) return;
        var isClickInsideMenu = navMenu.contains(event.target);
        var isClickOnHamburger = hamburger && hamburger.contains(event.target);
        if (navMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
            cerrarMenu();
        }
    });

    // ==========================================
    // 3. MENÚ CLÁSICO - DROPDOWN EN MÓVIL
    // ==========================================
    var dropdownsClassic = document.querySelectorAll('.dropdown-classic');

    dropdownsClassic.forEach(function(dropdown) {
        var dropbtn = dropdown.querySelector('.dropbtn-classic');
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdownsClassic.forEach(function(other) {
                        if (other !== dropdown && other.classList.contains('open')) {
                            other.classList.remove('open');
                        }
                    });
                    dropdown.classList.toggle('open');
                }
            });
        }
    });

    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            dropdownsClassic.forEach(function(dropdown) {
                if (dropdown.classList.contains('open')) {
                    if (!dropdown.contains(event.target)) {
                        dropdown.classList.remove('open');
                    }
                }
            });
        }
    });

    // ==========================================
    // 4. LOGO CLICKEABLE
    // ==========================================
    var logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // ==========================================
    // 5. BOTÓN VOLVER ARRIBA
    // ==========================================
    var btnScrollTop = document.getElementById('btnScrollTop');

    function toggleScrollButton() {
        if (window.scrollY > 300) {
            btnScrollTop.classList.add('visible');
        } else {
            btnScrollTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollButton);

    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 6. CARRUSEL DEL HERO
    // ==========================================
    var slides = document.querySelectorAll('.hero-bg');
    var dots = document.querySelectorAll('.dot');
    var heroText = document.getElementById('heroText');

    var textos = [
        { h1: 'SOLUCIONES INTEGRALES PARA <br><span class="highlight">EL SECTOR ENERGÉTICO</span>', desc: 'Mantenimiento especializado, ingeniería de campo, procura y logística para la industria petrolera, petroquímica y gasífera' },
        { h1: 'COMPROMISO CON LA <br><span class="highlight">SEGURIDAD INDUSTRIAL</span>', desc: 'Cultura de cero accidentes en entornos de alto riesgo, cumpliendo estrictas normas internacionales de seguridad' },
        { h1: 'EXCELENCIA TÉCNICA Y <br><span class="highlight">CONFIABILIDAD OPERATIVA</span>', desc: 'Obras civiles, electromecánicas, pintura industrial y gestión de procura para el sector energético' },
        { h1: 'SOSTENIBILIDAD Y <br><span class="highlight">RESPONSABILIDAD AMBIENTAL</span>', desc: 'Gestión ambiental en instalaciones de hidrocarburos y preservación de activos críticos' }
    ];

    var currentSlide = 0;
    var interval;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach(function(slide) { slide.classList.remove('active'); });
        dots.forEach(function(dot) { dot.classList.remove('active'); });

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        if (heroText && textos[index]) {
            heroText.innerHTML = '<h1>' + textos[index].h1 + '</h1><p class="hero-description">' + textos[index].desc + '</p>';
        }
        currentSlide = index;
    }

    function nextSlide() {
        var newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }

    function startCarousel() {
        if (interval) clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    if (dots.length) {
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                showSlide(index);
                startCarousel();
            });
        });
    }

    if (slides.length > 0) startCarousel();

    // ==========================================
    // 7. CARRUSEL DE PRODUCTOS (LIMITADO)
    // ==========================================
    var carouselSlide = document.querySelector('.carousel-slide');
    var prevBtn = document.querySelector('.prev');
    var nextBtn = document.querySelector('.next');

    if (carouselSlide && prevBtn && nextBtn) {
        var counter = 0;
        var cards = document.querySelectorAll('.product-card');
        var cardWidth = cards[0] ? cards[0].offsetWidth + 30 : 330;
        var cardsVisibles = 3;
        var maxCounter = cards.length - cardsVisibles;

        if (window.innerWidth <= 768) {
            cardsVisibles = 1;
        } else if (window.innerWidth <= 1024) {
            cardsVisibles = 2;
        } else {
            cardsVisibles = 3;
        }
        maxCounter = cards.length - cardsVisibles;

        function updateCarousel() {
            carouselSlide.style.transform = 'translateX(' + (-counter * cardWidth) + 'px)';
        }

        nextBtn.addEventListener('click', function() {
            if (counter < maxCounter) {
                counter++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', function() {
            if (counter > 0) {
                counter--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', function() {
            if (cards[0]) {
                cardWidth = cards[0].offsetWidth + 30;
                if (window.innerWidth <= 768) {
                    cardsVisibles = 1;
                } else if (window.innerWidth <= 1024) {
                    cardsVisibles = 2;
                } else {
                    cardsVisibles = 3;
                }
                maxCounter = cards.length - cardsVisibles;
                if (counter > maxCounter) {
                    counter = maxCounter;
                }
                updateCarousel();
            }
        });

        updateCarousel();
    }

    // ==========================================
    // 8. ANIMACIÓN DE ENTRADA AL SCROLL
    // ==========================================
    var elementosAnimar = document.querySelectorAll(
        '.servicio-card, .servicio-detallado-card, .product-card, ' +
        '.categoria-card, .elegir-item, .stat-card, .info-adicional, ' +
        '.producto-detalle, .servicio-detallado-full, .info-item'
    );

    elementosAnimar.forEach(function(el) {
        el.classList.add('animar-scroll');
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elementosAnimar.forEach(function(el) {
        observer.observe(el);
    });

    // ==========================================
    // 9. CONTADOR ANIMADO EN ESTADÍSTICAS
    // ==========================================
    var statCards = document.querySelectorAll('.stat-card h3');
    var contadoresIniciados = false;

    function animarContador(elemento, meta, prefijo) {
        var actual = 0;
        var duracion = 2000;
        var incremento = meta / (duracion / 30);

        var intervalo = setInterval(function() {
            actual += incremento;
            if (actual >= meta) {
                actual = meta;
                clearInterval(intervalo);
            }
            elemento.textContent = (prefijo || '') + Math.floor(actual) + (meta >= 50 ? '+' : '');
        }, 30);
    }

    function iniciarContadores() {
        statCards.forEach(function(stat) {
            var texto = stat.textContent;
            var numero = parseInt(texto.replace(/[^0-9]/g, ''));
            var prefijo = texto.includes('+') ? '' : '';

            if (!isNaN(numero)) {
                if (texto.includes('Años')) {
                    animarContador(stat, numero, '+');
                } else if (texto.includes('%')) {
                    animarContador(stat, numero, '');
                } else if (texto.includes('+')) {
                    animarContador(stat, numero, '+');
                }
            }
        });
    }

    var statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !contadoresIniciados) {
                contadoresIniciados = true;
                iniciarContadores();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    var statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ==========================================
    // 10. EFECTO TILT 3D EN TARJETAS (Desktop)
    // ==========================================
    if (window.innerWidth > 1024) {
        var tarjetas3D = document.querySelectorAll('.servicio-card, .categoria-card, .product-card');

        tarjetas3D.forEach(function(tarjeta) {
            tarjeta.addEventListener('mousemove', function(e) {
                var rect = tarjeta.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = (y - centerY) / 20;
                var rotateY = (centerX - x) / 20;

                tarjeta.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)';
            });

            tarjeta.addEventListener('mouseleave', function() {
                tarjeta.style.transform = '';
            });
        });
    }

    // ==========================================
    // 11. PARALLAX SUAVE EN EL HERO
    // ==========================================
    var heroBg = document.querySelector('.hero-backgrounds');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            var scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            }
        });
    }

    // ==========================================
    // 12. SCROLL SUAVE PARA ENLACES INTERNOS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offsetTop = target.offsetTop - 100;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 13. ACCESIBILIDAD - SOPORTE DE TECLADO
    // ==========================================
    var elementosBoton = document.querySelectorAll('[role="button"]');
    elementosBoton.forEach(function(elemento) {
        elemento.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                elemento.click();
            }
        });
    });

});