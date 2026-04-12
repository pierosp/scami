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
    const sectionOffsets = [];
    let scrollTicking = false;

    const rebuildSectionOffsets = () => {
        sectionOffsets.length = 0;
        sections.forEach((section) => {
            sectionOffsets.push({
                id: section.getAttribute('id'),
                top: section.offsetTop
            });
        });
    };

    const updateActiveDesktopNav = () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;

        sectionOffsets.forEach((sectionData) => {
            if (scrollPosition >= sectionData.top) {
                currentSection = sectionData.id;
            }
        });

        desktopNavLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    };

    // 3. Portfolio lightbox for full-screen image viewing
    const lightbox = document.querySelector('.portfolio-lightbox');
    const lightboxImage = document.querySelector('.portfolio-lightbox__image');
    const lightboxClose = document.querySelector('.portfolio-lightbox__close');
    const portfolioImages = document.querySelectorAll('.portfolio-img');
    const portfolioScroll = document.querySelector('.portfolio-scroll');
    const portfolioPrevButton = document.querySelector('.portfolio-arrow-prev');
    const portfolioNextButton = document.querySelector('.portfolio-arrow-next');
    const desktopMediaQuery = window.matchMedia('(min-width: 768px)');

    const getPortfolioStep = () => {
        if (!portfolioScroll) {
            return 0;
        }

        const firstCard = portfolioScroll.querySelector('.portfolio-card');
        if (!firstCard) {
            return portfolioScroll.clientWidth;
        }

        const gap = parseFloat(window.getComputedStyle(portfolioScroll).gap) || 0;
        return firstCard.getBoundingClientRect().width + gap;
    };

    const updatePortfolioArrows = () => {
        if (!portfolioScroll || !portfolioPrevButton || !portfolioNextButton) {
            return;
        }

        if (!desktopMediaQuery.matches) {
            portfolioPrevButton.disabled = true;
            portfolioNextButton.disabled = true;
            return;
        }

        const maxScroll = portfolioScroll.scrollWidth - portfolioScroll.clientWidth;
        const currentScroll = portfolioScroll.scrollLeft;

        portfolioPrevButton.disabled = currentScroll <= 4;
        portfolioNextButton.disabled = currentScroll >= (maxScroll - 4);
    };

    const scrollPortfolio = (direction) => {
        if (!portfolioScroll || !desktopMediaQuery.matches) {
            return;
        }

        portfolioScroll.scrollBy({
            left: getPortfolioStep() * direction,
            behavior: 'smooth'
        });
    };

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

    if (portfolioPrevButton) {
        portfolioPrevButton.addEventListener('click', () => scrollPortfolio(-1));
    }

    if (portfolioNextButton) {
        portfolioNextButton.addEventListener('click', () => scrollPortfolio(1));
    }

    if (portfolioScroll) {
        portfolioScroll.addEventListener('scroll', updatePortfolioArrows);
    }

    if (desktopMediaQuery && typeof desktopMediaQuery.addEventListener === 'function') {
        desktopMediaQuery.addEventListener('change', updatePortfolioArrows);
    }

    window.addEventListener('resize', () => {
        rebuildSectionOffsets();
        updatePortfolioArrows();
        updateActiveDesktopNav();
    });

    rebuildSectionOffsets();
    updateActiveDesktopNav();
    updatePortfolioArrows();

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    window.addEventListener('scroll', () => {
        if (scrollTicking) {
            return;
        }

        scrollTicking = true;
        window.requestAnimationFrame(() => {
            updateActiveDesktopNav();
            scrollTicking = false;
        });
    }, { passive: true });
});
