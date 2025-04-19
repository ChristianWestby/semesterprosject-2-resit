import { isLoggedIn, removeToken } from "../utils/auth.js";
import { createLogo } from "./logo.js";

export function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "fixed top-0 left-0 w-full z-50 bg-[#F2EFE7] border-b-2 border-black shadow";

  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-4 sm:px-6 py-4";

  const topRow = document.createElement("div");
  topRow.className = "flex flex-col sm:flex-row justify-between sm:items-center gap-2";

  // 🔸 Logo
  const logo = createLogo();
  logo.classList.add("w-full", "sm:w-auto", "drop-shadow-lg", "mx-auto");

  // 🔸 Right side (brukerinfo og logout)
  const rightSide = document.createElement("div");
  rightSide.className = "flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-4 w-full sm:w-auto";

  if (isLoggedIn()) {
    const name = localStorage.getItem("name") || "bruker";

    const userBox = document.createElement("div");
    userBox.innerHTML = `
      <span class="block text-xs sm:text-sm">Admin user:</span>
      <span class="block text-xs sm:text-sm">${name}</span>
    `;
    userBox.className = "bg-black text-white font-bold px-3 py-1 rounded shadow text-center w-full sm:w-auto max-w-xs";

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logg ut";
    logoutBtn.className = "bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition text-sm font-semibold w-full sm:w-auto max-w-xs";

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

  // 🔸 Burger-meny knapp
  const burgerBtn = document.createElement("button");
  burgerBtn.className = "sm:hidden bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 mt-2";
  burgerBtn.textContent = "☰ Meny";
  burgerBtn.setAttribute("aria-expanded", "false");

  // 🔸 Nav-links
  const navLinks = document.createElement("ul");
  navLinks.className = "hidden sm:flex flex-wrap justify-center mt-2 sm:mt-0 gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-black font-medium";

  const toggleNav = () => {
    const expanded = burgerBtn.getAttribute("aria-expanded") === "true";
    burgerBtn.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("hidden");
    navLinks.classList.toggle("flex");
    navLinks.classList.toggle("flex-col");
    navLinks.classList.toggle("items-center");
    navLinks.classList.toggle("gap-5"); // 👈 Mer luft mellom burger-meny-elementene
    navLinks.classList.toggle("mt-4");
    navLinks.classList.toggle("pb-4"); // 👈 Litt padding i bunn
  };
  burgerBtn.addEventListener("click", toggleNav);

  const links = [];

  links.push(`<li><a href="/index.html" class="block bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition w-52 text-center">Home</a></li>`);
  links.push(`<li><a href="/pet/index.html" class="block bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition w-52 text-center">Dyrene våre</a></li>`);

  if (isLoggedIn()) {
    links.push(`<li><a href="/admin/dashboard.html" class="block bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition w-52 text-center">🛠️ Dashboard</a></li>`);
    links.push(`<li><a href="/pet/create.html" class="block bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition w-52 text-center">➕ Legg til dyr</a></li>`);
  } else {
    links.push(`<li><a href="/account/login.html" class="block bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition font-semibold w-52 text-center">Login</a></li>`);
  }

  navLinks.innerHTML = links.join("");

  container.appendChild(topRow);
  container.appendChild(burgerBtn);
  container.appendChild(navLinks);
  nav.appendChild(container);

  return nav;
}