export function setupHome(app) {
  app.innerHTML = `
    <section 
      id="heroSection"
      class="w-full h-screen bg-black flex flex-col items-center justify-center text-center text-white px-4 cursor-pointer relative overflow-hidden"
      tabindex="0"
      role="link"
      aria-label="Klikk for å se kjæledyr"
    >
      <div class="absolute inset-0 bg-black opacity-80"></div>

      <div class="relative z-10 p-6 max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Velkommen til Pet Adoption Shelter</h1>
        <p class="text-lg mb-6">Klikk hvor som helst eller bruk knappen for å se våre søte kjæledyr</p>
        <button class="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition">
          Se kjæledyr
        </button>
      </div>
    </section>
  `;

  const hero = document.getElementById("heroSection");
  hero.addEventListener("click", () => {
    window.location.href = "/pet/index.html";
  });

  const button = hero.querySelector("button");
  button.addEventListener("click", (e) => {
    e.stopPropagation(); 
    window.location.href = "/pet/index.html";
  });
}