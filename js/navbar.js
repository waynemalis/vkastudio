function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const navbar = document.getElementById('nav');
  if (navLinks.style.display === "block") {
    navLinks.style.display = "none";
    if (window.scrollY < 500) {
      navbar.classList.remove('scrolled');
    }
  } else {
    navLinks.style.display = "block";
    navbar.classList.add('scrolled');
  }
}
