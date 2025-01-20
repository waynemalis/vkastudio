const nav = document.querySelector('nav')
const button = document.querySelector('.ham')
const tabs = document.getElementById('navs')
let toggle = false

button.addEventListener('click', () => {
  if (toggle !== true) {
    toggle = true
    navs.classList.add('open-nav')
    nav.classList.add('openned')
  } else {
    toggle = false
    navs.classList.remove('open-nav')
    nav.classList.remove('openned')
  }
});
