// src/components/navbar.js
import { createLogo } from './logo.js';

export function createNavbar() {
  // Nav
  const nav = document.createElement('nav');
  nav.className = 'h-[80px] bg-[#F2EFE7] border-b-2 border-black';

  // Container
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-4 h-full flex items-center justify-between';

  // Logo
  const logo = createLogo();

  // Hamburger button
  const button = document.createElement('button');
  button.id = 'menuToggle';
  button.className = 'md:hidden text-3xl text-black';
  button.textContent = '☰';

  // Nav links (desktop)
  const ul = document.createElement('ul');
  ul.id = 'navLinks';
  ul.className = 'hidden md:flex gap-6 text-black font-medium';
  ul.innerHTML = `
    <li><a href="#" class="hover:underline">Home</a></li>
    <li><a href="#" class="hover:underline">Pets</a></li>
    <li><a href="#" class="hover:underline">Login</a></li>
  `;

  // Sett sammen hovedcontainer
  container.appendChild(logo);
  container.appendChild(button);
  container.appendChild(ul);
  nav.appendChild(container);

  // Mobilmeny
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobileMenu';
  mobileMenu.className = 'md:hidden px-4 pb-4 hidden';
  mobileMenu.innerHTML = `
    <ul class="flex flex-col gap-2 text-black font-medium">
      <li><a href="#" class="hover:underline">Home</a></li>
      <li><a href="#" class="hover:underline">Pets</a></li>
      <li><a href="#" class="hover:underline">Login</a></li>
    </ul>
  `;

  // Hamburger toggle-funksjon
  button.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Legg mobilmeny etter nav
  nav.appendChild(mobileMenu);

  return nav;
}