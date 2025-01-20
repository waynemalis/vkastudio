// Selecciona el div con id 'tiny-cards'
const tinyCards = document.getElementById('tiny-cards');
const largeCard = document.getElementById('services-card-0');
const content = largeCard.querySelector('.content');

// Obtén todos los divs dentro de 'tiny-cards' que tengan un id con el patrón 'services-card-(número)'
const serviceCards = tinyCards.querySelectorAll('div[id^="services-card-"]');
let currentCard = document.getElementById('services-card-1')

console.log(serviceCards); // Muestra los divs encontrados

function updateContent() {
  content.innerHTML = currentCard.querySelector('.content').innerHTML;
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    console.log(`Hiciste clic en: ${card.id}`);
    if (card !== currentCard) {
      currentCard.classList.remove('active')
      card.classList.add('active')
      currentCard = card
      updateContent()
    }
  });
});

updateContent();
