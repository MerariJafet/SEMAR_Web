/* ==========================================================================
   SEMAR – main.js
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------------
     1.  GLightbox  (galería de proyectos)
  ----------------------------------------------------------------------- */
  if (typeof GLightbox === 'function') {
    GLightbox({ selector: '.glightbox' });
  } else {
    // console.warn('GLightbox no cargó ✓ Revisa CDN en index.html');
  }

  /* -----------------------------------------------------------------------
     2.  Swiper  (carrusel de marcas / testimonios)
  ----------------------------------------------------------------------- */
  if (typeof Swiper === 'function') {
    // Partners tecnológicos
    new Swiper('.brands-swiper', {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 2500, disableOnInteraction: false },
      breakpoints: {
        480:  { slidesPerView: 3 },
        768:  { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
    });

    /*  // ←‑‑ Descomenta si luego añades testimonios
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      loop:true,
      autoplay:{delay:5000},
      pagination:{el:'.swiper-pagination',clickable:true},
    });
    */
  } else {
    // console.warn('Swiper no cargó ✓ Revisa CDN en index.html');
  }

  /* -----------------------------------------------------------------------
     3.  Modo oscuro / claro
  ----------------------------------------------------------------------- */
  const toggleBtn       = document.getElementById('themeToggle');
  const prefersDark     = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme     = localStorage.getItem('semar-theme');

  // Aplica la preferencia guardada o la del sistema
  if (storedTheme === 'light') document.body.classList.add('light');
  if (storedTheme === 'dark')  document.body.classList.remove('light');
  if (!storedTheme && prefersDark.matches) document.body.classList.remove('light'); // default dark

  // Cambia icono según estado
  const updateIcon = () => {
    const icon = toggleBtn.querySelector('i');
    icon.className = document.body.classList.contains('light')
      ? 'fa-solid fa-moon'  // luz => mostrar luna
      : 'fa-solid fa-sun';  // oscuro => mostrar sol
  };
  updateIcon();

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('semar-theme',
      document.body.classList.contains('light') ? 'light' : 'dark');
    updateIcon();
  });

  /* -----------------------------------------------------------------------
     4.  Efecto shrink del header al hacer scroll (opcional)
  ----------------------------------------------------------------------- */
  const header   = document.querySelector('.main-header');
  const shrinkPx = 120; // cambia altura tras 120 px de scroll

  const onScroll = () => {
    if (window.scrollY > shrinkPx) header.classList.add('smaller');
    else header.classList.remove('smaller');
  };
  window.addEventListener('scroll', onScroll);

  /* ---------------------------------------------------------
     PROYECTOS – tarjetas flip (home)
  --------------------------------------------------------- */
  document.querySelectorAll('#proyectos .flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });
});