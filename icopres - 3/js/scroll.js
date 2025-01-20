const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 120) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const container = document.getElementById('tiny-cards');
const leftButton = document.getElementById('scroll-left');
const rightButton = document.getElementById('scroll-right');

let isMouseDown = false;
let startX;
let scrollLeft;
let startTouchX;

container.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  container.style.cursor = 'grabbing'; // Cambia el cursor cuando se presiona
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  e.preventDefault(); // Evita la selección de texto
});

container.addEventListener('mouseleave', () => {
  isMouseDown = false;
  container.style.cursor = 'grab'; // Restablece el cursor cuando sale del contenedor
});

container.addEventListener('mouseup', () => {
  isMouseDown = false;
  container.style.cursor = 'grab'; // Restablece el cursor al soltar
});

container.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1;
  container.scrollLeft = scrollLeft - walk;
});

// Soporte para dispositivos táctiles
container.addEventListener('touchstart', (e) => {
  isMouseDown = true;
  startTouchX = e.touches[0].pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('touchend', () => {
  isMouseDown = false;
});

container.addEventListener('touchmove', (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const touchX = e.touches[0].pageX - container.offsetLeft;
  const walk = (touchX - startTouchX) * 1;
  container.scrollLeft = scrollLeft - walk;
});

// Función para desplazar a la izquierda
leftButton.addEventListener('click', () => {
  container.scrollBy({
    left: -100,
    behavior: 'smooth'  // Desplazamiento suave
  });
});

// Función para desplazar a la derecha
// Función para desplazar a la izquierda
rightButton.addEventListener('click', () => {
  container.scrollBy({
    left: 100,
    behavior: 'smooth'  // Desplazamiento suave
  });
});
