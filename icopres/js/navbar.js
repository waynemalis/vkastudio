//

const nav = document.querySelector('.nav-links').querySelectorAll('a');
let prevItem = document.querySelector('.nav-links').querySelector('.active');
let currentItem = null;

nav.forEach(button => {
  button.addEventListener('click', () => {
    currentItem = button

    if (prevItem !== null) {
      //prevItem.classList.remove('active');
    }
    //currentItem.classList.add('active');

    prevItem = currentItem
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelector('.nav-links').querySelectorAll('a'); // Selecciona todos los enlaces

  function updateActiveLink() {
    const currentPath = window.location.pathname; // Ruta actual (ej. "/services.html")
    const currentHash = window.location.hash; // Fragmento actual (ej. "#us")

    let activeLink = null;

    links.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      const linkHash = new URL(link.href, window.location.origin).hash;

      if (linkPath === currentPath && linkHash === currentHash) {
        activeLink = link;
      }
    });

    // Quita "active" de todos y lo agrega al enlace correcto
    links.forEach(link => link.classList.remove("active"));
    if (activeLink) activeLink.classList.add("active");
  }

  // Llamar a la función al cargar la página
  updateActiveLink();

  // Agregar evento click a cada enlace
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      const linkHash = new URL(link.href, window.location.origin).hash;

      if (linkPath !== window.location.pathname) {
        // Si el enlace apunta a otra página, redirigir normalmente
        return;
      }

      if (linkHash) {
        event.preventDefault(); // Evita la recarga de la página

        // Si el hash es diferente, actualizarlo normalmente
        if (window.location.hash !== linkHash) {
          window.location.hash = linkHash;
        } else {
          // Si el hash es el mismo, usar `history.replaceState` para forzar la actualización
          history.replaceState(null, "", linkHash);
          updateActiveLink();
        }
      }
    });
  });

  // Detectar cambios en el hash (cuando se navega entre secciones)
  window.addEventListener("hashchange", updateActiveLink);
});
