/* ============================================
   PORTAL LAYANAN PEMERINTAH KABUPATEN BANDUNG
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initCaptcha();
  initMobileMenu();
  initScrollAnimations();
  initFoodPriceScroll();
  initDropdowns();
});

/* ---------- Hero Slider ---------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  const prevBtn = document.querySelector('.hero__nav--prev');
  const nextBtn = document.querySelector('.hero__nav--next');
  let currentSlide = 0;
  let autoPlayTimer;
  const slideInterval = 5000;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('hero__slide--active'));
    dots.forEach(d => d.classList.remove('hero__dot--active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('hero__slide--active');
    dots[currentSlide].classList.add('hero__dot--active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startAutoPlay(); });
  });

  startAutoPlay();
}

/* ---------- Captcha Generator ---------- */
function initCaptcha() {
  const captchaCode = document.getElementById('captchaCode');
  const refreshBtn = document.getElementById('captchaRefresh');

  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (captchaCode) captchaCode.textContent = code;
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.style.transform = 'rotate(360deg)';
      setTimeout(() => { refreshBtn.style.transform = ''; }, 300);
      generateCaptcha();
    });
  }

  generateCaptcha();
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  const overlay = mobileMenu;

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('mobile-menu--active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('mobile-menu--active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });
  }
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------- Food Price Horizontal Scroll ---------- */
function initFoodPriceScroll() {
  const container = document.querySelector('.food-price__grid');
  if (!container) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });

  container.style.cursor = 'grab';
}

/* ---------- Dropdown Menus (Desktop) ---------- */
function initDropdowns() {
  // Already handled by CSS hover, but adding keyboard support
  const menuItems = document.querySelectorAll('.navbar__menu-item');

  menuItems.forEach(item => {
    const link = item.querySelector('.navbar__menu-link');
    const dropdown = item.querySelector('.navbar__dropdown');

    if (link && dropdown) {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isVisible = dropdown.style.opacity === '1';
          dropdown.style.opacity = isVisible ? '0' : '1';
          dropdown.style.visibility = isVisible ? 'hidden' : 'visible';
          dropdown.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(0)';
        }
      });
    }
  });
}

/* ---------- Ticket Status Form ---------- */
function checkTicketStatus() {
  const ticketInput = document.getElementById('ticketNumber');
  const captchaInput = document.getElementById('captchaInput');
  const captchaCode = document.getElementById('captchaCode');

  if (!ticketInput || !ticketInput.value.trim()) {
    alert('Masukkan nomor tiket / kode permohonan Anda.');
    return;
  }

  if (!captchaInput || !captchaInput.value.trim()) {
    alert('Masukkan kode captcha.');
    return;
  }

  if (captchaInput.value.toUpperCase() !== captchaCode.textContent) {
    alert('Kode captcha tidak sesuai. Silakan coba lagi.');
    initCaptcha();
    return;
  }

  // Simulate check
  alert('Mencari status tiket: ' + ticketInput.value + '...\n\nFitur ini akan segera tersedia.');
}

/* ---------- Modals ---------- */
function openWargaModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('wargaModal');
  if (modal) {
    modal.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
  }
}

function closeWargaModal() {
  const modal = document.getElementById('wargaModal');
  if (modal) {
    modal.classList.remove('modal--active');
    document.body.style.overflow = '';
  }
}
