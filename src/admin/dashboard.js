import { fetchAllPets } from "../utils/api.js";
import { getToken, protectRoute } from "../utils/auth.js";

export async function setupDashboard(app) {
  protectRoute();

  const token = getToken();
  const userName = localStorage.getItem("name") || "Admin";
  const userEmail = localStorage.getItem("email") || "Ukjent e-post";

  app.innerHTML = `
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p class="text-gray-700 mb-6">Velkommen, <strong>${userName}</strong> 
        <span class="text-sm text-blue-600 block">${userEmail}</span>
      </p>

      <div id="admin-pet-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
  `;

  const petListContainer = document.getElementById("admin-pet-list");

  try {
    const pets = await fetchAllPets();

    if (pets.length === 0) {
      petListContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">Ingen kjæledyr funnet.</p>`;
      return;
    }

    pets.forEach((pet) => {
      const card = document.createElement("div");
      card.className = "border rounded p-4 bg-white shadow";

      card.innerHTML = `
        <h2 class="text-lg font-semibold mb-2">${pet.name}</h2>
        <p class="text-sm mb-2">${pet.breed} | ${pet.species}</p>
        <div class="flex gap-2">
          <a href="/pet/edit.html?id=${pet.id}" class="text-blue-600 underline">Rediger</a>
          <button class="text-red-600 hover:underline delete-btn" data-id="${pet.id}">Slett</button>
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
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": "noroff-api-key" 
            },
            body: JSON.stringify(updatedPet),
          });

          if (res.ok) {
            btn.closest("div").remove();
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
    app.innerHTML = "<p class='text-red-600 text-center'>Kunne ikke laste inn kjæledyr.</p>";
  }
}