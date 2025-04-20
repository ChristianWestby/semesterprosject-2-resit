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

if (!app) {
  console.error("Fant ikke #app – kan ikke laste inn siden riktig.");
} else {
  app.innerHTML = "";

  function renderPageWithLayout(setupFn) {
    window.scrollTo(0, 0);
    document.body.insertBefore(createNavbar(), app);
    setupFn(app);
    document.body.appendChild(createFooter());
  }

  if (path.includes('/account/login.html')) {
    setupLogin(app);
  } else if (path.includes('/account/register.html')) {
    renderPageWithLayout(setupRegister);
  } else if (path === '/' || path === '/index.html') {
    window.scrollTo(0, 0);
    setupHome(app);
    document.body.appendChild(createFooter());
  } else if (
    path === '/pet' ||
    path === '/pet/' ||
    path.endsWith('/pet/index.html')
  ) {
    renderPageWithLayout(setupPetList);
  } else if (
    path.includes('/pet/detail.html') &&
    window.location.search.includes('id=')
  ) {
    renderPageWithLayout(setupSingleProduct);
  } else if (path.includes('/pet/edit.html')) {
    renderPageWithLayout(setupEditForm);
  } else if (path.includes('/pet/create.html')) {
    renderPageWithLayout(setupCreatePet);
  } else if (path.includes('/admin/dashboard.html')) {
    renderPageWithLayout(setupDashboard);
  } else {
    app.innerHTML = `
      <section class="text-center py-20">
        <h1 class="text-3xl font-bold mb-4">404 - Side ikke funnet</h1>
        <a href="/" class="text-blue-600 underline">Gå til forsiden</a>
      </section>
    `;
  }
}