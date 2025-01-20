const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 120) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
