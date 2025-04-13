import { fetchPetById } from "../utils/api.js";

export async function setupSingleProduct(app) {
  const params = new URLSearchParams(window.location.search);
  const petId = params.get("id");

  if (!petId) {
    app.innerHTML = "<p class='text-center text-red-600 mt-12'>❌ Ingen kjæledyr-ID i URL.</p>";
    return;
  }

  try {
    const pet = await fetchPetById(petId);

    app.innerHTML = `
      <div class="max-w-3xl mx-auto p-4">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl font-bold">${pet.name}</h1>
          <button 
            id="shareBtn" 
            class="text-sm text-blue-600 underline hover:text-blue-800 transition"
            title="Kopier lenke til kjæledyret"
          >
            🔗 Kopier lenke
          </button>
        </div>

        <img 
          src="${pet.image?.url}" 
          alt="${pet.image?.alt || pet.name}" 
          class="w-full h-64 object-cover rounded shadow mb-4"
        >

        <ul class="space-y-1 text-gray-800 mb-6">
          <li><strong>Art:</strong> ${pet.species}</li>
          <li><strong>Rase:</strong> ${pet.breed}</li>
          <li><strong>Alder:</strong> ${pet.age}</li>
          <li><strong>Kjønn:</strong> ${pet.gender}</li>
          <li><strong>Størrelse:</strong> ${pet.size}</li>
          <li><strong>Farge:</strong> ${pet.color}</li>
        </ul>

        <p class="text-gray-700 leading-relaxed">${pet.description}</p>
      </div>
      <div class="mt-6 text-center">
      <button 
       onclick="window.history.back()" 
      class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        ← Tilbake til listen
      </button>
      </div>
    `;

    const shareBtn = document.getElementById("shareBtn");
    shareBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        shareBtn.textContent = "✅ Lenke kopiert!";
        setTimeout(() => (shareBtn.textContent = "🔗 Kopier lenke"), 2500);
      } catch (err) {
        console.error("Kopiering feilet:", err);
        shareBtn.textContent = "⚠️ Kunne ikke kopiere";
      }
    });

  } catch (error) {
    console.error("Error fetching pet:", error);
    app.innerHTML = "<p class='text-red-600 text-center mt-12'>⚠️ Kunne ikke laste kjæledyret.</p>";
  }
}