export function createLogo() {
  const logo = document.createElement("div");

  logo.innerHTML = `
    <a href="/" class="block">
      <div class="bg-green-600 px-8 py-5 rounded shadow-lg ml-[-10px] flex flex-col items-center">
        <div class="flex items-center justify-center gap-2">
          <span 
            class="text-white text-4xl font-extrabold tracking-widest uppercase leading-tight"
            style="font-family: 'Comic Sans MS', cursive;"
          >
            PET
          </span>
          <img 
            src="/src/assets/images/paws.svg" 
            alt="Pote" 
            class="w-6 h-6 mt-1"
          />
        </div>
        <div class="text-white text-xs text-center uppercase tracking-wide">
          Adoption Shelter
        </div>
      </div>
    </a>
  `;

  return logo;
}