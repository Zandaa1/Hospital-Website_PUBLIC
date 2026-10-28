const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');
const revealItems = document.querySelectorAll('.reveal');
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

if (menuToggle && menuList) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const newState = !expanded;
    menuToggle.setAttribute('aria-expanded', String(newState));
    menuList.classList.toggle('is-open', newState);
  });
}

menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    if (menuList && menuToggle && menuList.classList.contains('is-open')) {
      menuList.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const setSlide = (index) => {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-pressed', String(isActive));
  });
};

let activeSlide = 0;

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    activeSlide = index;
    setSlide(activeSlide);
  });
});

if (slides.length > 1) {
  setInterval(() => {
    activeSlide = (activeSlide + 1) % slides.length;
    setSlide(activeSlide);
  }, 4500);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -45px 0px',
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

// Static demo: do not transmit entered contact details.
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Demo only. No message was sent. Please use synthetic information.');
  });
});
