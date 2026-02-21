// Animaciones al hacer scroll con IntersectionObserver
const elementosFade = document.querySelectorAll('.fade');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.style.animationPlayState = 'running';
      // Añadimos un pequeño retraso aleatorio para efecto cascada
      entrada.target.style.animationDelay = Math.random() * 0.5 + 's';
      observer.unobserve(entrada.target);
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
});

elementosFade.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});