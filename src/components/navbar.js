import { isLoggedIn, removeToken } from "../utils/auth.js";
import { createLogo } from "./logo.js";

export function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "h-[260px] bg-[#F2EFE7] border-b-2 border-black";

  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-4 h-full flex items-center justify-between";

  const logo = createLogo();

  const navLinksWrapper = document.createElement("div");
  navLinksWrapper.className = "flex flex-col items-end gap-2 text-right";

  const ul = document.createElement("ul");
  ul.className = "flex flex-wrap gap-4 text-black font-medium items-center";

  ul.innerHTML = `
    <li><a href="/index.html" class="hover:underline">Home</a></li>
    <li><a href="/pet/index.html" class="hover:underline">Animals</a></li>
  `;

  if (isLoggedIn()) {
    
    const name = localStorage.getItem("name") || "bruker";
    const userInfo = document.createElement("div");
    userInfo.textContent = `Innlogget som ${name}`;
    userInfo.className = "text-sm text-black";
    navLinksWrapper.appendChild(userInfo);

    const adminLinks = document.createElement("li");
    adminLinks.innerHTML = `
      <a href="/admin/dashboard.html" class="hover:underline">Dashboard</a>
      <a href="/pet/create.html" class="hover:underline ml-4">Legg til dyr</a>
    `;
    ul.appendChild(adminLinks);

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
    ul.appendChild(logout);
  } else {
    const login = document.createElement("li");
    login.innerHTML = `<a href="/account/login.html" class="hover:underline">Login</a>`;
    ul.appendChild(login);
  }

  navLinksWrapper.appendChild(ul);
  container.appendChild(logo);
  container.appendChild(navLinksWrapper);
  nav.appendChild(container);

  return nav;
}