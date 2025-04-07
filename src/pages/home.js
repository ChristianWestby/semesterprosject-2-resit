export function setupHome(app) {
    app.innerHTML = `
      <section class="text-center mt-10">
        <h1 class="text-3xl font-bold mb-4">Velkommen til PetAdopt</h1>
        <p class="text-gray-600">Klikk videre for å finne ditt nye bestevenn 🐾</p>
        <a href="/index.html" class="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Gå til kjæledyr</a>
      </section>
    `;
  }