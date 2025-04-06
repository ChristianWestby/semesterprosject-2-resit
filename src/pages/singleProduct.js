import { fetchPetById } from "../utils/api.js";

export async function setupSingleProduct(app) {
  const params = new URLSearchParams(window.location.search);
  const petId = params.get("id");

  if (!petId) {
    app.innerHTML = "<p>❌ No pet ID provided in URL.</p>";
    return;
  }

  try {
    const pet = await fetchPetById(petId);

    app.innerHTML = `
      <div class="pet-detail p-4 max-w-3xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">${pet.name}</h1>
        <img 
          src="${pet.image?.url}" 
          alt="${pet.image?.alt || pet.name}" 
          class="w-full h-64 object-cover rounded mb-4"
        >
        <ul class="mb-4 space-y-1">
          <li><strong>Species:</strong> ${pet.species}</li>
          <li><strong>Breed:</strong> ${pet.breed}</li>
          <li><strong>Age:</strong> ${pet.age}</li>
          <li><strong>Gender:</strong> ${pet.gender}</li>
          <li><strong>Size:</strong> ${pet.size}</li>
          <li><strong>Color:</strong> ${pet.color}</li>
        </ul>
        <p class="text-gray-700">${pet.description}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching pet:", error);
    app.innerHTML = "<p>⚠️ Could not load pet details.</p>";
  }
}