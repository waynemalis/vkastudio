const video = document.querySelector('.video-hero');
const toggleBtn = document.querySelector('.pause-btn');
const playIcon = toggleBtn.querySelector('.play');
const pauseIcon = toggleBtn.querySelector('.pause');

// Función para verificar si el video se está reproduciendo
function isVideoPlaying() {
  return !video.paused && !video.ended;
}

// Cambiar el estado de reproducción y el texto del botón
function togglePlayPause() {
  if (isVideoPlaying()) {
    video.pause();
    pauseIcon.style.display = "none";
    playIcon.style.display = "flex";
    playIcon.style.translate = "1px 0";
  } else {
    video.play();
    pauseIcon.style.display = "flex";
    playIcon.style.display = "none";
  }
}

// Agregar evento al botón para alternar entre pausar y reproducir
toggleBtn.addEventListener('click', togglePlayPause);
togglePlayPause();
