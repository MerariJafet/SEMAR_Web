/* ==========================================================================
   GALERÍA FILTRABLE + GLightbox + Tarjetas Flip
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Lightbox */
  GLightbox({ selector: '.glightbox' });

  /* 2. MixItUp filtrado */
  mixitup('#cases-grid', {
    selectors: { target: '.mix' },
    animation: { duration: 400 }
  });

  /* Ajusta automáticamente la altura de la tarjeta al lado más alto */
  const setCardHeight = card =>{
    const front = card.querySelector('.flip-card-front');
    const back  = card.querySelector('.flip-card-back');
    const h = Math.max(front.offsetHeight, back.offsetHeight);
    card.style.minHeight = h + 'px';
  };

  document.querySelectorAll('.flip-card').forEach(card=>{
    setCardHeight(card);
    card.addEventListener('click', e =>{
      if(e.target.closest('a')) e.preventDefault();
      card.classList.toggle('is-flipped');
    });
    window.addEventListener('resize',()=>setCardHeight(card));
  });

});
