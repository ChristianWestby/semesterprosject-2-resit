// src/components/navbar.js
import { isLoggedIn, removeToken } from "../utils/auth.js";

export function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "h-[80px] bg-[#F2EFE7] border-b-2 border-black";

  const container = document.createElement("div");
  container.className =
    "max-w-7xl mx-auto px-4 h-full flex items-center justify-between";

  // Logo
  const logo = document.createElement("div");
  logo.textContent = "PET ADOPTION SHELTER";
  logo.className = "text-black text-xl font-bold";

  // Nav links
  const ul = document.createElement("ul");
  ul.className = "flex gap-6 text-black font-medium items-center";

  // Hjem og Produkter
  ul.innerHTML = `
    <li><a href="/index.html" class="hover:underline">Hjem</a></li>
    <li><a href="/pet/index.html" class="hover:underline">Produkter</a></li>
  `;

  // Dynamisk innhold avhengig av om bruker er innlogget
  if (isLoggedIn()) {
    const name = localStorage.getItem("name") || "bruker";

    const userInfo = document.createElement("li");
    userInfo.textContent = `Innlogget som ${name}`;
    userInfo.className = "text-black";

    const logout = document.createElement("li");
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logg ut";
    logoutBtn.className = "hover:underline text-red-600";
    logoutBtn.addEventListener("click", () => {
      removeToken();
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      location.href = "/index.html";
    });
    logout.appendChild(logoutBtn);

    ul.appendChild(userInfo);
    ul.appendChild(logout);
  } else {
    const login = document.createElement("li");
    login.innerHTML = `<a href="/account/login.html" class="hover:underline">Login</a>`;
    ul.appendChild(login);
  }

  // Sett sammen
  container.appendChild(logo);
  container.appendChild(ul);
  nav.appendChild(container);

  return nav;
}