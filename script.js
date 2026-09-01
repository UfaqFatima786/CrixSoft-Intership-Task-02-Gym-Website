/* ==========================================================
   IronForm — site interactions + GSAP animations
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const navAnchors = document.querySelectorAll('nav.links a');
  const sectionIds = ['facilities', 'services', 'membership'];
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });

  /* ==========================================================
     GSAP animations
     ========================================================== */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap === 'undefined') return; // fail safe if CDN didn't load

  gsap.registerPlugin(ScrollTrigger);

  if (reduceMotion) {
    // Respect reduced motion: skip animation setup, just make sure
    // everything GSAP would animate is already visible.
    gsap.set('.hero-eyebrow-row, .hero h1, .hero-side p, .hero .btn-row, .stat, .facility-card, .service-row, .plan, .cta-band h2, .cta-band .btn-primary', { opacity: 1, y: 0, x: 0, clearProps: 'transform' });
  } else {

    /* ---- Hero entrance timeline (page load) ---- */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-eyebrow-row', { opacity: 0, y: 16, duration: 0.6 })
      .from('.hero h1', { opacity: 0, y: 40, duration: 0.9 }, '-=0.35')
      .from('.hero-side', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
      .from('.hero-side .btn-row a', { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, '-=0.35')
      .from('header', { y: -80, opacity: 0, duration: 0.6 }, 0);

    /* ---- Stat strip: counters + rise-in, one orchestrated reveal ---- */
    gsap.from('.stat', {
      scrollTrigger: { trigger: '.stat-strip', start: 'top 85%' },
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out'
    });

    document.querySelectorAll('.stat .num').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => { el.textContent = Math.round(counter.val); }
          });
        }
      });
    });

    /* ---- Section headers: label + heading reveal ---- */
    gsap.utils.toArray('.section-head').forEach(head => {
      gsap.from(head.children, {
        scrollTrigger: { trigger: head, start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out'
      });
    });

    /* ---- Facility cards: staggered grid reveal ---- */
    gsap.from('.facility-card', {
      scrollTrigger: { trigger: '.facilities-grid', start: 'top 80%' },
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: { each: 0.1, grid: 'auto', from: 'start' },
      ease: 'power2.out'
    });

    /* ---- Service rows: slide in from left, one after another ---- */
    gsap.from('.service-row', {
      scrollTrigger: { trigger: '.service-list', start: 'top 82%' },
      opacity: 0,
      x: -30,
      duration: 0.55,
      stagger: 0.12,
      ease: 'power2.out'
    });

    /* ---- Membership plans: rise + slight scale, featured pops last ---- */
    gsap.from('.membership-grid .plan', {
      scrollTrigger: { trigger: '.membership-grid', start: 'top 80%' },
      opacity: 0,
      y: 50,
      scale: 0.97,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    });

    /* ---- CTA band ---- */
    gsap.from('.cta-band h2, .cta-band .btn-primary', {
      scrollTrigger: { trigger: '.cta-band', start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out'
    });

    /* ---- Footer columns ---- */
    gsap.from('.footer-top > *', {
      scrollTrigger: { trigger: 'footer', start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
});
