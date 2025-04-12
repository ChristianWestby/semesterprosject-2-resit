// src/main.js
import './style.css';
import { createNavbar } from './components/navbar.js';
import { createFooter } from './components/footer.js';
import './router.js'; // Henter riktig innhold basert på URL

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  // Legg til navbar i toppen (uten å legge den i app-diven!)
  const navbar = createNavbar();
  document.body.prepend(navbar);

  // Legg til footer i bunnen (etter app-diven)
  const footer = createFooter();
  document.body.appendChild(footer);
});