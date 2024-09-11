window.addEventListener('scroll', function() {
  const navbar = document.getElementById('nav');
  const navLinks = document.getElementById("navLinks");
  // Verificar si el scroll ha bajado más de 100 píxeles
  if (window.scrollY > 500) {
    navbar.classList.add('scrolled');
  } else {
    if (navLinks.style.display != "block") {
      navbar.classList.remove('scrolled');
    }
  }
});
