const nav = document.querySelector('.nav-links').querySelectorAll('a');
let prevItem = document.querySelector('.nav-links').querySelector('.active');
let currentItem = null;

nav.forEach(button => {
  button.addEventListener('click', () => {
    currentItem = button

    if (prevItem !== null) {
      prevItem.classList.remove('active');
    }
    currentItem.classList.add('active');

    prevItem = currentItem
  });
});
