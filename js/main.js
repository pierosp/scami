document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations Setup using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it's visible so it doesn't animate out and in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => scrollObserver.observe(el));

    // 2. Active Mobile Nav Item Highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

    // 3. Portfolio lightbox for full-screen image viewing
    const lightbox = document.querySelector('.portfolio-lightbox');
    const lightboxImage = document.querySelector('.portfolio-lightbox__image');
    const lightboxClose = document.querySelector('.portfolio-lightbox__close');
    const portfolioImages = document.querySelectorAll('.portfolio-img');

    const closeLightbox = () => {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const openLightbox = (image) => {
        if (!lightbox || !lightboxImage || !image) {
            return;
        }

        const fullSrc = image.dataset.fullSrc || image.src;
        const fullAlt = image.dataset.fullAlt || image.alt || 'Imagen ampliada';

        lightboxImage.src = fullSrc;
        lightboxImage.alt = fullAlt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    portfolioImages.forEach((portfolioImage) => {
        portfolioImage.setAttribute('tabindex', '0');
        portfolioImage.setAttribute('role', 'button');
        portfolioImage.setAttribute('aria-label', 'Abrir imagen en pantalla completa');

        portfolioImage.addEventListener('click', () => {
            const image = portfolioImage.querySelector('img');
            openLightbox(image);
        });

        portfolioImage.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const image = portfolioImage.querySelector('img');
                openLightbox(image);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Subtract header height or adjust threshold feeling
            if (scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update Desktop Nav
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        // Update Mobile Nav
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            
            // Manage icon outline vs fill for material symbols
            const icon = link.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.style.fontVariationSettings = "'FILL' 0";
            }

            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
                if (icon) {
                    icon.style.fontVariationSettings = "'FILL' 1";
                }
            }
        });
    });
});
