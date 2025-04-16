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
    <div class="mt-[260px] bg-green-600 min-h-screen py-12">
     <div class="max-w-4xl mx-auto bg-white text-black p-8 border border-black rounded shadow-md">
      
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-4xl font-bold underline text-gray-800">${pet.name}</h1>
          <button 
            id="shareBtn" 
            class="bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition text-sm"
            title="Kopier lenke til kjæledyret"
          >
            🔗 Kopier lenke
          </button>
        </div>
  
        <img 
          src="${pet.image?.url}" 
          alt="${pet.image?.alt || pet.name}" 
          class="w-full max-h-[400px] object-cover rounded shadow mb-6 border border-gray-200"
        >
  
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 mb-6">
          <li><strong>Art:</strong> ${pet.species}</li>
          <li><strong>Rase:</strong> ${pet.breed}</li>
          <li><strong>Alder:</strong> ${pet.age}</li>
          <li><strong>Kjønn:</strong> ${pet.gender}</li>
          <li><strong>Størrelse:</strong> ${pet.size}</li>
          <li><strong>Farge:</strong> ${pet.color}</li>
        </ul>
  
        <p class="text-gray-700 font-bold leading-relaxed mb-6">${pet.description}</p>
  
        <div class="text-center">
          <button 
            onclick="window.history.back()" 
            class="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            ← Tilbake til listen
          </button>
        </div>
      </div>
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