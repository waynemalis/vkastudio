// Dropdown sección Nosotros
const dropdownBtn = document.querySelector('.us-btn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownBtn.addEventListener('click', () => {
  if (dropdownContent.classList.contains('show')) {
    dropdownContent.classList.remove('show');
  } else {
    dropdownContent.classList.add('show');
  }
});

// Dropdown sección Nosotros
const dropdownMobileBtn = document.querySelector('.us-mobile-btn');
const dropdownMobileContent = document.querySelector('.dropdown-mobile-content');

dropdownMobileBtn.addEventListener('click', () => {
  if (dropdownMobileContent.classList.contains('show')) {
    dropdownMobileContent.classList.remove('show');
  } else {
    dropdownMobileContent.classList.add('show');
  }
});

// Cerrar el dropdown si el usuario hace click fuera
window.addEventListener('click', (event) => {
  if (!event.target.matches('.us-btn')) {
    if (dropdownContent.classList.contains('show')) {
      dropdownContent.classList.remove('show');
    }
  }

  if (!event.target.matches('.us-mobile-btn')) {
    if (dropdownMobileContent.classList.contains('show')) {
      dropdownMobileContent.classList.remove('show');
    }
  }
});
