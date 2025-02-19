const albums = document.querySelectorAll('.album');
const gallery = document.querySelector('.gallery').querySelector('.container');
const slider = gallery.querySelector('.slider-gallery');
const close = gallery.querySelector('.close-gallery');

// Lista de imágenes para cada álbum (puedes modificarla)
const albumImages = {
    "album1": ["images/card_1.jpg", "images/card_2.jpg", "images/card_3.jpg"],
    "album2": ["img4.jpg", "img5.jpg", "img6.jpg"],
    "album3": ["img7.jpg", "img8.jpg", "img9.jpg"]
};

close.addEventListener('click', () => {
  gallery.classList.remove("active");
  setTimeout(() => {
    gallery.style.display = 'none';
  }, 500);
});

// Puedes recorrerlos con un forEach
albums.forEach(album => {
    album.addEventListener('click', () => {
      const albumId = album.getAttribute('data-album'); // Obtener el ID del álbum (debe estar en el HTML)
      const images = albumImages[albumId] || []; // Obtener imágenes del álbum o un array vacío
      gallery.style.display = 'flex';
      slider.innerHTML = "";

      // Insertar nuevas imágenes
      images.forEach(imgSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = "Imagen del álbum";
        imgElement.classList.add("image")
        imgElement.setAttribute('draggable', false);
        slider.appendChild(imgElement);
      });

      gallery.classList.add("active");
    });
});

let isDown = false;
let startX;
let scrollLeft;

// Eventos de Mouse
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('scrolling');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.scrollSnapType = 'none';
});

slider.addEventListener('mouseleave', () => {
  if (isDown) {
    isDown = false;
    slider.classList.remove('scrolling');
    enableSnapAfterDrag();
  }
});

slider.addEventListener('mouseup', () => {
  if (isDown) {
    isDown = false;
    slider.classList.remove('scrolling');
    enableSnapAfterDrag();
  }
});

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

// Eventos touch (táctiles)
slider.addEventListener('touchstart', (e) => {
  isDown = true;
  slider.classList.add('scrolling');
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.scrollSnapType = 'none';
});

slider.addEventListener('touchend', () => {
  if (isDown) {
    isDown = false;
    slider.classList.remove('scrolling');
    enableSnapAfterDrag();
  }
});

slider.addEventListener('touchcancel', () => {
  if (isDown) {
    isDown = false;
    slider.classList.remove('scrolling');
    enableSnapAfterDrag();
  }
});

slider.addEventListener('touchmove', (e) => {
  if(!isDown) return;
  e.preventDefault(); // Previene el scroll de la página
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});

// Función para reactivar el snap después del arrastre
function enableSnapAfterDrag() {
  // Pequeño retraso para asegurar que el snap ocurra después de que el usuario suelte
  setTimeout(() => {
    // Determinar a qué slide hacer snap
    const itemWidth = slider.querySelector('.slide').offsetWidth;
    const index = Math.round(slider.scrollLeft / itemWidth);

    // Aplicar el snap
    slider.style.scrollSnapType = 'x mandatory';
    slider.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
  }, 50);
}

document.querySelectorAll('.no-drag').forEach(img => {
    img.addEventListener('dragstart', event => event.preventDefault()); // Evita el arrastre
    img.addEventListener('mousedown', event => event.preventDefault()); // Evita selección accidental
    img.addEventListener('mousemove', event => event.preventDefault()); // Evita cualquier intento de arrastre
});

gallery.style.display = 'none';
