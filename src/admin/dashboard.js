import { fetchAllPets } from "../utils/api.js";
import { getToken, protectRoute } from "../utils/auth.js";

export async function setupDashboard(app) {
  protectRoute();

  const token = getToken();
  const userName = localStorage.getItem("name") || "Admin";
  const userEmail = localStorage.getItem("email") || "Ukjent e-post";

  app.innerHTML = `
 <div class="pt-[90px] bg-green-600 min-h-screen px-4 pb-10">
    <div class="max-w-7xl mx-auto bg-white text-black p-6 sm:p-10 rounded shadow-lg">
      <h1 class="text-3xl sm:text-4xl font-bold mb-2 text-green-800">Admin Dashboard</h1>
      <p class="mb-6 text-sm sm:text-base">
        Velkommen, <strong>${userName}</strong><br>
        <span class="text-gray-700">Innlogget e-post: ${userEmail}</span>
      </p>

      <div id="admin-pet-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
    </div>
  </div>
`;

  const petListContainer = document.getElementById("admin-pet-list");

  try {
    const pets = await fetchAllPets();

    if (pets.length === 0) {
      petListContainer.innerHTML = `<p class="col-span-full text-center text-white opacity-70">Ingen kjæledyr funnet.</p>`;
      return;
    }

    pets.forEach((pet) => {
      const card = document.createElement("div");
      card.className = "bg-green-100 border border-green-300 rounded-xl p-4 shadow hover:shadow-lg transition";

      card.innerHTML = `
  <div class="flex flex-col gap-2">
    ${pet.image?.url ? `
      <img 
        src="${pet.image.url}" 
        alt="${pet.image.alt || pet.name}" 
        class="w-full h-40 object-cover rounded"
      />
    ` : `
      <div class="w-full h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500">
        Ingen bilde
      </div>
    `}
    <h2 class="text-xl font-bold">${pet.name}</h2>
    <p class="text-sm">${pet.breed} | ${pet.species}</p>
    </div>
    <div class="flex justify-between mt-4">
    <a href="/pet/edit.html?id=${pet.id}" class="text-blue-600 hover:underline font-medium">Rediger</a>
    <button class="text-red-600 hover:underline delete-btn font-medium" data-id="${pet.id}">Slett</button>
  </div>
`;

      petListContainer.appendChild(card);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmed = confirm("Er du sikker på at du vil slette dette kjæledyret?");
        if (!confirmed) return;

        try {
          const res = await fetch(`https://v2.api.noroff.dev/pets/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": "227d4ff6-0c0b-4587-8d71-a0ca6528e73f",
            },
          });

          if (res.ok) {
            alert("🐾 Kjæledyret ble slettet!");
            location.reload();
          } else {
            alert("Klarte ikke å slette kjæledyret.");
          }
        } catch (error) {
          console.error("Feil ved sletting:", error);
          alert("Noe gikk galt.");
        }
      });
    });

  } catch (err) {
    console.error("Feil ved henting av kjæledyr:", err);
    app.innerHTML = "<p class='text-red-200 text-center mt-12'>Kunne ikke laste inn kjæledyr.</p>";
  }
}