// js/hero.js
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('#hero-container h1');
  if (hero) {
    hero.addEventListener('click', () => {
      alert('¡Haz hecho clic en el título del Hero!');
    });
  }
});
