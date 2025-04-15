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
import { createLogo } from './components/logo.js';

const app = document.getElementById('app');
const path = window.location.pathname;
app.innerHTML = "";

console.log("Current path:", path);

// 🔐 Login og Register skal ha logo og hjemlenke – men ikke navbar/footer
if (path.includes('/account/login.html') || path.includes('/account/register.html')) {
  const logoWrapper = document.createElement("div");
  logoWrapper.className = "flex flex-col items-center mt-6 mb-4";

  const logo = createLogo();
  logoWrapper.appendChild(logo);

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.textContent = "← Til forsiden";
  homeLink.className = "mt-2 text-sm text-blue-600 hover:underline";
  logoWrapper.appendChild(homeLink);

  document.body.insertBefore(logoWrapper, app);

  if (path.includes('/account/login.html')) {
    setupLogin(app);
  } else {
    setupRegister(app);
  }

  document.body.appendChild(createFooter());

} else if (path === '/' || path === '/index.html') {
  // 🏠 Forside: kun hero og footer
  setupHome(app);
  document.body.appendChild(createFooter());

} else if (
  path === '/pet' ||
  path === '/pet/' ||
  path.endsWith('/pet/index.html')
) {
  document.body.insertBefore(createNavbar(), app);
  setupPetList(app);
  document.body.appendChild(createFooter());

} else if (
  path.includes('/pet/detail.html') &&
  window.location.search.includes('id=')
) {
  document.body.insertBefore(createNavbar(), app);
  setupSingleProduct(app);
  document.body.appendChild(createFooter());

} else if (path.includes('/pet/edit.html')) {
  document.body.insertBefore(createNavbar(), app);
  setupEditForm(app);
  document.body.appendChild(createFooter());

} else if (path.includes('/pet/create.html')) {
  document.body.insertBefore(createNavbar(), app);
  setupCreatePet(app);
  document.body.appendChild(createFooter());

} else if (path.includes('/admin/dashboard.html')) {
  document.body.insertBefore(createNavbar(), app);
  setupDashboard(app);
  document.body.appendChild(createFooter());

} else {
  app.innerHTML = `
    <section class="text-center py-20">
      <h1 class="text-3xl font-bold mb-4">404 - Side ikke funnet</h1>
      <a href="/" class="text-blue-600 underline">Gå til forsiden</a>
    </section>
  `;
}