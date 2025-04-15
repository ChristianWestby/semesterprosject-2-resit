import { isLoggedIn, removeToken } from "../utils/auth.js";
import { createLogo } from "./logo.js";

export function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "fixed top-0 left-0 w-full h-[260px] z-50 bg-[#F2EFE7] border-b-2 border-black shadow";

  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-6 h-full flex flex-col justify-center";

  // 🟨 Øverste rad: logo og admin info
  const topRow = document.createElement("div");
  topRow.className = "flex justify-between items-start";

  // ⬅️ Logo
  const logo = createLogo();
  logo.classList.add("w-auto", "drop-shadow-lg", "mt-10", "ml-2");

  // ➡️ Admin info og logg ut
  const rightSide = document.createElement("div");
  rightSide.className = "flex flex-col items-end gap-2 mt-6 mr-2";

  if (isLoggedIn()) {
    const name = localStorage.getItem("name") || "bruker";

    const userBox = document.createElement("div");
    userBox.innerHTML = `<span class="block">Admin user:</span><span class="block">${name}</span>`;
    userBox.className = "bg-black text-white font-bold px-4 py-2 rounded shadow text-sm text-right";

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logg ut";
    logoutBtn.className = "bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition text-sm font-semibold";

    logoutBtn.addEventListener("click", () => {
      removeToken();
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      location.href = "/index.html";
    });

    rightSide.appendChild(userBox);
    rightSide.appendChild(logoutBtn);
  }

  topRow.appendChild(logo);
  topRow.appendChild(rightSide);

  // 🔗 Navigasjonslenker midtstilt under topRow
  const navLinks = document.createElement("ul");
  navLinks.className = "flex gap-4 justify-center mt-4 text-lg text-black font-medium";

  const homeLink = document.createElement("li");
  homeLink.innerHTML = `<a href="/index.html" class="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition">Home</a>`;

  const animalsLink = document.createElement("li");
  animalsLink.innerHTML = `<a href="/pet/index.html" class="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition">Dyrene våre</a>`;

  navLinks.appendChild(homeLink);
  navLinks.appendChild(animalsLink);

  // 🔧 Admin-lenker
  if (isLoggedIn()) {
    const dashboardLink = document.createElement("li");
    dashboardLink.innerHTML = `<a href="/admin/dashboard.html" class="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition text-sm">🛠️ Dashboard</a>`;

    const createLink = document.createElement("li");
    createLink.innerHTML = `<a href="/pet/create.html" class="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition text-sm"
    >➕ Legg til dyr</a>
    `;

    navLinks.appendChild(dashboardLink);
    navLinks.appendChild(createLink);
  } else {
   
    const loginLink = document.createElement("li");
    loginLink.innerHTML = `<a href="/account/login.html" class="ml-auto bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-red-700 transition text-sm font-semibold">
    Login
    </a>
   `;

   navLinks.appendChild(loginLink);


  container.appendChild(topRow);
  container.appendChild(navLinks); 
  nav.appendChild(container);

  return nav;
}
}