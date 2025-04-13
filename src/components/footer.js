import { createLogo } from "./logo.js";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "bg-black text-white py-10 mt-12";

  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8";

  const logo = createLogo();
  container.appendChild(logo);

  const links = [
    "Google Maps", "Facebook", "Twitter", "Instagram", "Personvern",
    "Media", "Om oss", "Jobb hos oss", "Visjon", "Presse", "Kontakt oss"
  ];

  const linksContainer = document.createElement("div");
  linksContainer.className = "md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2";

  links.forEach(link => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = link;
    a.className = "text-sm hover:underline";
    linksContainer.appendChild(a);
  });

  container.appendChild(linksContainer);
  footer.appendChild(container);

  const copyright = document.createElement("div");
  copyright.className = "text-right text-xs text-gray-400 mt-6";
  copyright.textContent = "© 2025 Pet Adoption Shelter. Alle rettigheter reservert.";

  footer.appendChild(copyright);

  return footer;
}