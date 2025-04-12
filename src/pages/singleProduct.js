import { fetchPetById } from "../utils/api.js";

export async function setupSingleProduct(app) {
  const params = new URLSearchParams(window.location.search);
  const petId = params.get("id");

  if (!petId) {
    app.innerHTML = `
      <div class="text-center mt-12">
        <p class="text-red-600 text-lg font-medium">❌ Mangler kjæledyr-ID i URL.</p>
        <a href="/pet/index.html" class="text-blue-600 underline mt-4 inline-block">Tilbake til listen</a>
      </div>
    `;
    return;
  }

  try {
    const pet = await fetchPetById(petId);

    if (!pet) {
      throw new Error("Kjæledyret finnes ikke.");
    }

    app.innerHTML = `
      <div class="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h1 class="text-3xl font-bold mb-4">${pet.name || "Ukjent navn"}</h1>

        <img 
          src="${pet.image?.url}" 
          alt="${pet.image?.alt || pet.name}" 
          class="w-full max-h-72 object-cover rounded mb-6 border"
        />

        <ul class="space-y-1 mb-6 text-gray-800">
          <li><strong>Art:</strong> ${pet.species || "Ukjent"}</li>
          <li><strong>Rase:</strong> ${pet.breed || "Ukjent"}</li>
          <li><strong>Alder:</strong> ${pet.age || "Ukjent"}</li>
          <li><strong>Kjønn:</strong> ${pet.gender || "Ukjent"}</li>
          <li><strong>Størrelse:</strong> ${pet.size || "Ukjent"}</li>
          <li><strong>Farge:</strong> ${pet.color || "Ukjent"}</li>
        </ul>

        <p class="text-gray-700 mb-6">${pet.description || "Ingen beskrivelse tilgjengelig."}</p>

        <div class="text-center">
          <a href="/pet/index.html" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">← Tilbake til listen</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading pet:", error);
    app.innerHTML = `
      <div class="text-center mt-12">
        <p class="text-red-600 font-semibold">⚠️ Kunne ikke laste inn kjæledyret.</p>
        <a href="/pet/index.html" class="text-blue-600 underline mt-4 inline-block">Tilbake til listen</a>
      </div>
    `;
  }
}