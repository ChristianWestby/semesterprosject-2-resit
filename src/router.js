import { setupHome } from './pages/home.js';
import { setupPetList } from './pages/productList.js';
import { setupSingleProduct } from './pages/singleProduct.js';
import { setupLogin } from './admin/login.js';
import { setupDashboard } from './admin/dashboard.js';

const app = document.getElementById('app');
const path = window.location.pathname;

if (path === '/' || path.includes('home') || path.includes('index.html')) {
  setupHome(app);
} else if (path.includes('/pet/index.html')) {
  setupSingleProduct(app);
} else if (path.includes('/account/login.html')) {
  setupLogin(app); 
} else if (path.includes('/admin/dashboard.html')) {
    setupDashboard(app); 
} else if (path.includes('/index.html')) {
  setupPetList(app);
} else {
  app.innerHTML = "<p>404 - Page not found</p>";
}