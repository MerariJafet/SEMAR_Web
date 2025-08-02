/* ==========================================================================
   HERO ANIMATIONS + SCROLLREVEAL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ----- Lottie background ----- */
  const container = document.querySelector('.hero-bg');
  if (container && window.lottie) {
    lottie.loadAnimation({
      container,
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: 'assets/animations/hero-lottie.json'
    });
  }

  /* ----- ScrollReveal basic config ----- */
  const sr = ScrollReveal({
    distance: '40px',
    duration: 800,
    easing: 'ease-out',
    origin: 'bottom',
    reset: false
  });

  sr.reveal('[data-sr]');
  sr.reveal('[data-sr-delay]', {interval: 100});

  /* ----- Scroll cue ----- */
  const cue = document.querySelector('.scroll-cue');
  cue?.addEventListener('click', () => {
    window.scrollBy({top: window.innerHeight * 0.8, behavior: 'smooth'});
  });

});
