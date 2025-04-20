import { createLogo } from "./logo.js";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "bg-black text-white py-10 mt-12";

  const container = document.createElement("div");
  container.className = "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start";

  const logoWrapper = document.createElement("div");
  logoWrapper.className = "max-w-[200px] ml-2";
  logoWrapper.appendChild(createLogo());
  container.appendChild(logoWrapper);

  const mediaLinks = ["Google Maps", "Facebook", "Twitter", "Instagram"];
  const infoLinks = ["Personvern", "Om oss", "Jobb hos oss", "Visjon", "Presse", "Kontakt oss"];

  const linksWrapper = document.createElement("div");
  linksWrapper.className = "md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 justify-center";

  const mediaContainer = document.createElement("div");
  const mediaTitle = document.createElement("h3");
  mediaTitle.className = "text-white font-semibold mb-2";
  mediaTitle.textContent = "Følg oss";
  mediaContainer.appendChild(mediaTitle);
  mediaLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = link;
    a.className = "block text-sm hover:underline text-white";
    mediaContainer.appendChild(a);
  });

  const infoContainer = document.createElement("div");
  const infoTitle = document.createElement("h3");
  infoTitle.className = "text-white font-semibold mb-2";
  infoTitle.textContent = "Om oss";
  infoContainer.appendChild(infoTitle);
  infoLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = link;
    a.className = "block text-sm hover:underline text-white";
    infoContainer.appendChild(a);
  });

  linksWrapper.appendChild(mediaContainer);
  linksWrapper.appendChild(infoContainer);
  container.appendChild(linksWrapper);

  const copyright = document.createElement("div");
  copyright.className = "text-center text-xs text-white text-opacity-90 mt-6";
  copyright.textContent = "© 2025 Pet Adoption Shelter. Alle rettigheter reservert.";

  footer.appendChild(container);
  footer.appendChild(copyright);

  return footer;
}