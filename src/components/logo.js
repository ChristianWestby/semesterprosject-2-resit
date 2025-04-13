export function createLogo() {
  const logo = document.createElement("div");

  logo.innerHTML = `
    <a href="/" class="block no-underline">
      <div class="bg-green-600 px-6 py-4 rounded shadow-lg w-fit ml-2">
        <h1 
          class="text-white text-5xl font-extrabold tracking-wide uppercase"
          style="font-family: 'Comic Sans MS', cursive;"
        >
          PET
        </h1>
        <p class="text-white text-sm font-light text-left -mt-1 ml-1">
          Adoption Shelter
        </p>
      </div>
    </a>
  `;

  return logo;
}