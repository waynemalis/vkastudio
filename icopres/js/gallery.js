// Configuración de la galería
const items = [
  { id: 1, color: '#3B82F6', title: 'Tarjeta 1' },
  { id: 2, color: '#EF4444', title: 'Tarjeta 2' },
  { id: 3, color: '#10B981', title: 'Tarjeta 3' },
  { id: 4, color: '#F59E0B', title: 'Tarjeta 4' },
  { id: 5, color: '#8B5CF6', title: 'Tarjeta 5' },
  { id: 6, color: '#EC4899', title: 'Tarjeta 6' },
];

// Lista de imágenes para cada álbum (puedes modificarla)
const albumImages = {
    "album1": ["images/projects/fresnillo/1.webp", "images/projects/fresnillo/2.webp", "images/projects/fresnillo/3.webp", "images/projects/fresnillo/4.webp", "images/projects/fresnillo/5.webp", "images/projects/fresnillo/6.webp", "images/projects/fresnillo/7.webp"],
    "album2": ["images/projects/gochico/1.webp", "images/projects/gochico/2.webp", "images/projects/gochico/3.webp", "images/projects/gochico/4.webp", "images/projects/gochico/5.webp"],
    "album3": ["images/projects/mina-bolivar/1.webp"],
    "album4": ["images/projects/mina-guanajuato/1.webp", "images/projects/mina-guanajuato/2.webp", "images/projects/mina-guanajuato/3.webp"],
    "album5": ["images/projects/minera-roble/1.webp", "images/projects/minera-roble/2.webp", "images/projects/minera-roble/3.webp", "images/projects/minera-roble/4.webp"],
    "album6": ["images/projects/presa-tocayos/1.webp", "images/projects/presa-tocayos/2.webp", "images/projects/presa-tocayos/3.webp", "images/projects/presa-tocayos/4.webp"]
};

// Variables para el deslizamiento
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;
let animationID = null;
let itemWidth = 0;
let currentAlbumSize = 0; // Variable para guardar el tamaño del álbum actual
let isClickInsideInteractive = false; // Variable para rastrear si el clic fue dentro de un elemento interactivo

// Elementos del DOM
const albums = document.querySelectorAll('.album');
const main = document.querySelector('.gallery');
const gallery = document.getElementById('gallery');
const dotsContainer = document.getElementById('dots');
const close = document.querySelector('.close-gallery');

// Función para cerrar la galería
function closeGallery() {
  gallery.classList.remove('show');
  gallery.classList.add('hidden');
  setTimeout(() => {
    gallery.classList.remove('hidden');
    gallery.classList.remove('show');
  }, 500);
}

// Evento para el botón de cierre
close.addEventListener('click', closeGallery);

// Agregar manejadores de eventos para detectar clics dentro de elementos interactivos
function setupClickOutsideDetection() {
  // Al hacer clic en un elemento interactivo, marcar que el clic está dentro
  const trackClickInside = (e) => {
    isClickInsideInteractive = true;
  };

  // Agregar listeners a los elementos interactivos
  gallery.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousedown', trackClickInside);
  });

  dotsContainer.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('mousedown', trackClickInside);
  });

  close.addEventListener('mousedown', trackClickInside);

  // Agregar el listener del documento para el cierre al hacer clic fuera
  document.addEventListener('mousedown', function(e) {
    // Solo proceder si la galería está visible
    if (gallery.classList.contains('show')) {
      // Resetear el flag al inicio de cada clic
      isClickInsideInteractive = false;

      // Si el clic no es en un elemento interactivo (que sería detectado por los listeners arriba)
      // Y el clic es dentro de la galería (no en sus elementos interactivos)
      setTimeout(() => {
        // Comprobamos si el clic fue dentro de la galería pero no en elementos interactivos
        const isClickInGallery = gallery.contains(e.target);
        const isClickInDotsContainer = dotsContainer.contains(e.target);

        if (isClickInGallery && !isClickInsideInteractive && !isClickInDotsContainer) {
          closeGallery();
        }

        // Resetear para el próximo clic
        isClickInsideInteractive = false;
      }, 0);
    }
  });

  // Alternativa: usar mouseup para detectar clics completados
  document.addEventListener('mouseup', function(e) {
    if (gallery.classList.contains('show')) {
      const galleryRect = gallery.getBoundingClientRect();
      const dotsRect = dotsContainer.getBoundingClientRect();

      // Verificar si el clic es dentro de la galería pero NO en dots o imágenes
      const isClickInGalleryArea = e.clientX >= galleryRect.left &&
                                 e.clientX <= galleryRect.right &&
                                 e.clientY >= galleryRect.top &&
                                 e.clientY <= galleryRect.bottom;

      const isClickInDotsArea = e.clientX >= dotsRect.left &&
                              e.clientX <= dotsRect.right &&
                              e.clientY >= dotsRect.top &&
                              e.clientY <= dotsRect.bottom;

      // Si estamos en el área de la galería pero no en los dots ni en un elemento interactivo
      if (isClickInGalleryArea && !isClickInDotsArea && !isClickInsideInteractive && !isDragging) {
        closeGallery();
      }
    }
  });
}

// Crear elementos de la galería
function createGalleryItems() {
  items.forEach((item) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.backgroundColor = item.color;
    galleryItem.textContent = item.title;
    gallery.appendChild(galleryItem);
  });

  // Crear indicadores de posición (dots)
  items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = index === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', () => {
      setPositionByIndex(index);
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });

  // Calcular ancho de los elementos
  const firstItem = gallery.querySelector('.gallery-item');
  if (firstItem) {
    const style = window.getComputedStyle(firstItem);
    itemWidth = firstItem.offsetWidth + parseInt(style.marginRight);
  }
}

// Crear elementos de la galería
function createAlbumItems(albumId) {
  const images = albumImages[albumId] || [];
  currentAlbumSize = images.length; // Guardar el tamaño del álbum actual

  gallery.innerHTML = "";
  dotsContainer.innerHTML = "";

  images.forEach(image => {
    const galleryItem = document.createElement('img');
    galleryItem.src = image;
    galleryItem.style.backgroundColor = '#000';
    galleryItem.className = 'gallery-item';
    galleryItem.addEventListener('mousedown', (e) => {
      isClickInsideInteractive = true;
    });
    gallery.appendChild(galleryItem);
  });

  // Crear indicadores de posición (dots)
  images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = index === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', () => {
      setPositionByIndex(index);
      updateDots();
    });
    dot.addEventListener('mousedown', (e) => {
      isClickInsideInteractive = true;
    });
    dotsContainer.appendChild(dot);
  });

  // Calcular ancho de los elementos
  const firstItem = gallery.querySelector('.gallery-item');
  if (firstItem) {
    const style = window.getComputedStyle(firstItem);
    itemWidth = firstItem.offsetWidth + parseInt(style.marginRight);
    currentIndex = 0; // Reiniciar el índice al cambiar de álbum
    setPositionByIndex(currentIndex);
  }
}

// Actualizar indicadores de posición
function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Obtener posición X del evento de puntero
function getPositionX(event) {
  return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
}

// Configurar posición según índice
function setPositionByIndex(index) {
  currentIndex = index;
  const galleryItems = gallery.querySelectorAll('.gallery-item');
  const maxIndex = galleryItems.length - 1; // Obtener número real de elementos

  // Limitar índice a los bordes
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  // Obtener el ancho del contenedor
  const containerWidth = gallery.offsetWidth;

  // Calcular la nueva posición para centrar el elemento
  prevTranslate = (containerWidth / 2) - (itemWidth / 2) + (currentIndex * -itemWidth);
  currentTranslate = prevTranslate;

  setSliderPosition();
}

// Establecer posición del slider
function setSliderPosition() {
  gallery.style.transform = `translateX(${currentTranslate}px)`;
}

// Funciones para animación
function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

// Iniciar arrastre
function touchStart(event) {
  isDragging = true;
  isClickInsideInteractive = true; // Marcar como interactivo cuando comienza el arrastre
  startX = getPositionX(event);

  // Asegurar que prevTranslate está sincronizado
  prevTranslate = currentTranslate;

  // Detener cualquier transición
  gallery.style.transition = 'none';
  gallery.style.cursor = 'grabbing';

  // Iniciar animación
  cancelAnimationFrame(animationID);
  animationID = requestAnimationFrame(animation);
}

// Durante arrastre
function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    const moveDistance = currentPosition - startX;
    currentTranslate = prevTranslate + moveDistance;

    // Obtener número real de elementos en la galería
    const galleryItems = gallery.querySelectorAll('.gallery-item');
    const maxTranslate = -(galleryItems.length - 1) * itemWidth;

    // Resistencia en los bordes (evita teleportación en el primer ítem)
    if (currentIndex === 0 && currentTranslate > 0) {
      currentTranslate = prevTranslate + moveDistance * 0.9; // Permite un poco más de arrastre antes de bloquear
    } else if (currentTranslate < maxTranslate) {
      const overflowDistance = currentTranslate - maxTranslate;
      currentTranslate = maxTranslate + overflowDistance * 0.3;
    }
  }
}

// Fin de arrastre
function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  gallery.style.cursor = 'grab';

  // Calcular nuevo índice basado en la distancia de arrastre
  const moveDistance = currentTranslate - prevTranslate;
  const threshold = itemWidth * 0.2; // 20% del ancho del elemento

  if (Math.abs(moveDistance) > threshold) {
    if (moveDistance > 0) {
      currentIndex = Math.max(currentIndex - 1, 0);
    } else {
      // Usar el número real de imágenes en el álbum actual
      const galleryItems = gallery.querySelectorAll('.gallery-item');
      currentIndex = Math.min(currentIndex + 1, galleryItems.length - 1);
    }
  }

  // Snap a posición
  gallery.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
  setPositionByIndex(currentIndex);
  updateDots();

  // Restaurar transición después de snap
  setTimeout(() => {
    gallery.style.transition = 'none';
  }, 300);
}

// Eventos de cancelación de arrastre
function dragLeave() {
  if (isDragging) {
    touchEnd();
  }
}

// Función simplificada para el cierre al hacer clic
function addClickOutsideListener() {
  // Usando un enfoque más simple y directo
  document.addEventListener('click', function(e) {
    if (!gallery.classList.contains('show')) return;

    // Si el clic no fue en una imagen, en los dots, o en el botón de cierre
    const isClickOnGalleryItem = e.target.closest('.gallery-item');
    const isClickOnDot = e.target.closest('.dot');
    const isClickOnCloseButton = e.target.closest('.close-gallery');

    // Si el clic fue en el fondo de la galería pero no en elementos interactivos
    if (!isClickOnGalleryItem && !isClickOnDot && !isClickOnCloseButton &&
        !isDragging && e.target.closest('.gallery')) {
      closeGallery();
    }
  });
}

// Inicializar galería
function initGallery(albumId) {
  createAlbumItems(albumId);
  currentIndex = 0; // Reiniciar el índice actual

  // Esperar a que los elementos se agreguen al DOM antes de calcular el tamaño
  setTimeout(() => {
    const firstItem = gallery.querySelector('.gallery-item');
    if (firstItem) {
      const style = window.getComputedStyle(firstItem);
      itemWidth = firstItem.offsetWidth + parseInt(style.marginRight);
      setPositionByIndex(0); // Asegurar que empiece en la primera imagen centrada
    }
  }, 50); // Pequeño retraso para asegurar que los elementos se rendericen

  // Establecer eventos
  gallery.addEventListener('mousedown', touchStart);
  gallery.addEventListener('touchstart', touchStart);
  gallery.addEventListener('mousemove', touchMove);
  gallery.addEventListener('touchmove', touchMove);
  gallery.addEventListener('mouseup', touchEnd);
  gallery.addEventListener('touchend', touchEnd);
  gallery.addEventListener('mouseleave', dragLeave);
  gallery.addEventListener('dragstart', e => e.preventDefault());

  gallery.style.cursor = 'grab';

  window.addEventListener('resize', () => {
    const firstItem = gallery.querySelector('.gallery-item');
    if (firstItem) {
      const style = window.getComputedStyle(firstItem);
      itemWidth = firstItem.offsetWidth + parseInt(style.marginRight);
      setPositionByIndex(currentIndex);
    }
  });
}

// Puedes recorrerlos con un forEach
albums.forEach(album => {
    album.addEventListener('click', () => {
      const albumId = album.getAttribute('data-album'); // Obtener el ID del álbum (debe estar en el HTML)
      initGallery(albumId);
      gallery.classList.add("show");
    });
});

// Agregar listener para clic fuera después de que DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  addClickOutsideListener();
});

// Otro enfoque más simple que podría funcionar mejor
gallery.addEventListener('click', function(e) {
  // Verificar si el clic fue directamente en el fondo de la galería
  if (e.target === gallery && gallery.classList.contains('show')) {
    closeGallery();
  }
});
