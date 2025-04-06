import { setupHome } from './pages/home.js';
import { setupPetList } from './pages/productList.js';
import { setupSingleProduct } from './pages/singleProduct.js';

const app = document.getElementById('app');

// Finn hvilken side vi er på (basert på path)
const path = window.location.pathname;

if (path === '/' || path.includes('home') || path.includes('index.html')) {
    setupHome(app);
} else if (path.includes('/pet/index.html')) {
  setupSingleProduct(app);
} else if (path.includes('/index.html')) {
  setupPetList(app);
} else {
  app.innerHTML = "<p>404 - Page not found</p>";
}