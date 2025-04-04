
import './style.css';
import { createNavbar } from './components/navbar.js';
import { createFooter } from './components/footer.js';
import { createLogo } from './components/logo.js';
import { createHamburger } from './components/burgermenu.js';
import { setupPetList } from './pages/productList.js';


document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  // Tøm først
  app.innerHTML = '';

  // Legg til navbar med logo og hamburger
  const navbar = createNavbar();
  navbar.appendChild(createLogo());
  navbar.appendChild(createHamburger());
  app.appendChild(navbar);

  // Render pet-list siden
  const petListContainer = document.createElement('div');
  app.appendChild(petListContainer);
  setupPetList(petListContainer);

  // Legg til footer nederst
  app.appendChild(createFooter());
});