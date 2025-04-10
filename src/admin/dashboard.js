import { fetchAllPets } from "../utils/api.js";

export async function setupDashboard(app) {
  app.innerHTML = `
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="admin-pet-list"></div>
  `;

  const petListContainer = document.getElementById("admin-pet-list");

  try {
    const pets = await fetchAllPets();

    pets.forEach((pet) => {
      const card = document.createElement("div");
      card.className = "border rounded p-4 bg-white shadow";

      card.innerHTML = `
        <h2 class="text-lg font-semibold mb-2">${pet.name}</h2>
        <p class="text-sm mb-2">${pet.breed} | ${pet.species}</p>
        <div class="flex gap-2">
          <a href="/pet/edit.html?id=${pet.id}" class="text-blue-600 underline">Edit</a>
          <button class="text-red-600 delete-btn" data-id="${pet.id}">Delete</button>
        </div>
      `;

      petListContainer.appendChild(card);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmDelete = confirm("Are you sure you want to delete this pet?");
        if (!confirmDelete) return;

        try {
          const res = await fetch(`https://v2.api.noroff.dev/pets/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (res.ok) {
            btn.closest("div").remove();
          } else {
            alert("Failed to delete pet.");
          }
        } catch (error) {
          console.error(error);
        }
      });
    });

  } catch (err) {
    app.innerHTML = "<p>Could not load pets.</p>";
    console.error(err);
  }
}