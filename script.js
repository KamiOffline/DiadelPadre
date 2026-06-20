// script.js
// Controla animaciones de aparición cuando el contenido entra al viewport.

const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  threshold: 0.2,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Mejora el comportamiento de scroll suave en navegadores antiguos.
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

const parallaxElements = document.querySelectorAll('[data-parallax]');
let isTicking = false;

const updateParallax = () => {
  const scrollY = window.scrollY;
  parallaxElements.forEach((element) => {
    const speed = parseFloat(element.dataset.parallax) || 0;
    element.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
  });
  isTicking = false;
};

window.addEventListener('scroll', () => {
  if (!isTicking) {
    window.requestAnimationFrame(updateParallax);
    isTicking = true;
  }
}, { passive: true });

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

const closeLightbox = () => {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  lightboxCaption.textContent = '';
};

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const imageSrc = item.dataset.image;
    const imageAlt = item.dataset.alt;
    const captionText = item.querySelector('span')?.textContent || imageAlt;

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});
