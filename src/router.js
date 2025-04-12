import { setupHome } from './pages/home.js';
import { setupPetList } from './pages/productList.js';
import { setupSingleProduct } from './pages/singleProduct.js';
import { setupLogin } from './admin/login.js';
import { setupDashboard } from './admin/dashboard.js';
import { setupCreatePet } from './admin/create.js';
import { setupEditForm } from './admin/edit.js';
import { setupRegister } from './admin/register.js';
import { createNavbar } from './components/navbar.js';
import { createFooter } from './components/footer.js';

const app = document.getElementById('app');
const path = window.location.pathname;

app.innerHTML = "";

if (path === '/' || path.endsWith('/index.html')) {
  setupHome(app);

} else {
  document.body.insertBefore(createNavbar(), app);
  document.body.appendChild(createFooter());

  if (path.includes('/pet/index.html')) {
    setupPetList(app);

  } else if (path.includes('/pet/edit.html')) {
    setupEditForm(app);

  } else if (path.includes('/pet/create.html')) {
    setupCreatePet(app);

  } else if (path.includes('/pet/') && path.includes('?id=')) {
    setupSingleProduct(app);

  } else if (path.includes('/account/login.html')) {
    setupLogin(app);

  } else if (path.includes('/account/register.html')) {
    setupRegister(app);

  } else if (path.includes('/admin/dashboard.html')) {
    setupDashboard(app);

  } else {
    app.innerHTML = `
      <section class="text-center py-20">
        <h1 class="text-3xl font-bold mb-4">404 - Side ikke funnet</h1>
        <a href="/" class="text-blue-600 underline">Gå til forsiden</a>
      </section>
    `;
  }
}