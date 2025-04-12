export function setupHome(app) {
  app.innerHTML = `
    <section 
      class="w-full h-screen bg-[url('/src/assets/images/hero.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-center text-white px-4 cursor-pointer"
      id="heroSection"
    >
      <div class="bg-black bg-opacity-50 p-6 rounded">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Velkommen til Pet Adoption Shelter</h1>
        <p class="text-lg mb-6">Trykk hvor som helst for å se våre søte kjæledyr</p>
        <button class="bg-white text-black px-6 py-3 rounded hover:bg-gray-200">Se kjæledyr</button>
      </div>
    </section>
  `;

  const hero = document.getElementById("heroSection");
  hero.addEventListener("click", () => {
    window.location.href = "/pet/index.html";
  });
}