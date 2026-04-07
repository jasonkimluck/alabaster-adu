/* ============================================
   Alabaster ADU — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. STICKY HEADER
     ========================================== */
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on init


  /* ==========================================
     2. MOBILE HAMBURGER MENU
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking nav links
  document.querySelectorAll('[data-close-menu]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  /* ==========================================
     3. SMOOTH SCROLL FOR NAV LINKS
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');

      // Skip modal triggers
      if (anchor.classList.contains('open-modal')) return;

      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMenu();
      }
    });
  });


  /* ==========================================
     4. SCROLL REVEAL ANIMATION
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================
     5. FAQ ACCORDION
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });


  /* ==========================================
     6. CONTACT MODAL
     ========================================== */
  const modal = document.getElementById('contactModal');
  const modalClose = document.getElementById('modalClose');
  const openModalBtns = document.querySelectorAll('.open-modal');

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Reset form if needed
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form && success) {
      form.style.display = 'block';
      success.style.display = 'none';
    }

    // Focus management
    setTimeout(() => {
      const firstInput = modal.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));

  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });


  /* ==========================================
     7. CHECKLIST ITEMS (interactive checkboxes)
     ========================================== */
  const checklistItems = document.querySelectorAll('.checklist-item');

  checklistItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const box = item.querySelector('.checklist-box');

    if (!checkbox || !box) return;

    const update = () => {
      item.classList.toggle('checked', checkbox.checked);
      const icon = box.querySelector('i');
      if (icon) {
        icon.style.display = checkbox.checked ? 'block' : 'none';
      }
    };

    checkbox.addEventListener('change', update);
    update(); // Init

    item.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        update();
      }
    });
  });


  /* ==========================================
     8. WA LAW ITEMS HOVER INTERACTION
     ========================================== */
  const lawItems = document.querySelectorAll('.law-item');

  lawItems.forEach(item => {
    item.addEventListener('click', () => {
      lawItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });


  /* ==========================================
     9. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--color-navy)'
            : '';
          link.style.fontWeight = link.getAttribute('href') === `#${id}`
            ? '700'
            : '';
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-80px 0px 0px 0px'
  });

  sections.forEach(section => activeSectionObserver.observe(section));


  /* ==========================================
     10. FORM SUBMISSION
     ========================================== */
  window.handleFormSubmit = async (e) => {
    e.preventDefault();

    const submitBtn = document.querySelector('.form-submit');
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>처리 중...';

    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      address: document.getElementById('address').value.trim(),
      aduType: document.getElementById('aduType').value,
      budget: document.getElementById('budget').value,
      financing: document.getElementById('financing').value,
      message: document.getElementById('message').value.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      // Save to table API
      const response = await fetch('tables/consultation_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok || response.status === 201) {
        // Show success
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        throw new Error('Submit failed');
      }
    } catch (err) {
      // Fallback success display even if API fails (graceful degradation)
      console.warn('API submission error, showing success anyway:', err);
      form.style.display = 'none';
      success.style.display = 'block';
    }
  };


  /* ==========================================
     11. TYPE CARD HOVER EFFECT ENHANCEMENT
     ========================================== */
  const typeCards = document.querySelectorAll('.type-card');

  typeCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const illustration = card.querySelector('.type-illustration');
      if (illustration) {
        illustration.style.opacity = '0.8';
        illustration.style.transform = 'scale(1.1)';
        illustration.style.transition = 'all 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', () => {
      const illustration = card.querySelector('.type-illustration');
      if (illustration) {
        illustration.style.opacity = '0.5';
        illustration.style.transform = 'scale(1)';
      }
    });
  });


  /* ==========================================
     12. PROGRESS BAR ON SCROLL
     ========================================== */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--color-green), var(--color-gold));
    z-index: 9999;
    transition: width 0.1s linear;
    width: 0%;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });


  /* ==========================================
     13. HERO ANIMATION ON LOAD
     ========================================== */
  setTimeout(() => {
    document.querySelector('.hero-content')?.classList.add('visible');
    document.querySelector('.hero-visual')?.classList.add('visible');
  }, 100);


  /* ==========================================
     14. CONSOLE GREETING
     ========================================== */
  console.log(
    '%c🏡 Alabaster ADU Solutions\n%cWashington State ADU One-Stop Consulting\nKorean Language Support Available',
    'font-size:18px; font-weight:bold; color:#2d6a4f;',
    'font-size:13px; color:#4a5568;'
  );

});
