import { fetchPetById } from "../utils/api.js";
import { getToken, protectRoute } from "../utils/auth.js";

export async function setupEditForm(app) {
  protectRoute(); 

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const token = getToken();

  if (!id) {
    app.innerHTML = "<p>Mangler kjæledyr-ID i URL.</p>";
    return;
  }

  try {
    const pet = await fetchPetById(id);
    const userName = localStorage.getItem("name");
    const userEmail = localStorage.getItem("email");

    app.innerHTML = `
      <div class="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-2">Rediger: ${pet.name}</h1>
        <p class="text-sm text-gray-600 mb-4">Innlogget som <strong>${userName}</strong> (${userEmail})</p>

        <img src="${pet.image?.url}" alt="${pet.image?.alt || pet.name}" class="w-full max-h-64 object-cover rounded mb-4" />

        <form id="edit-form" class="space-y-4">
          <input type="text" name="name" value="${pet.name}" placeholder="Name" class="w-full border p-2 rounded" required />
          <input type="text" name="species" value="${pet.species}" placeholder="Species" class="w-full border p-2 rounded" required />
          <input type="text" name="breed" value="${pet.breed}" placeholder="Breed" class="w-full border p-2 rounded" required />
          <input type="number" name="age" value="${pet.age}" placeholder="Age" class="w-full border p-2 rounded" required />
          <input type="text" name="size" value="${pet.size}" placeholder="Size" class="w-full border p-2 rounded" required />
          <input type="text" name="color" value="${pet.color}" placeholder="Color" class="w-full border p-2 rounded" required />
          <textarea name="description" placeholder="Description" class="w-full border p-2 rounded">${pet.description}</textarea>
          <input type="text" name="imageUrl" value="${pet.image?.url}" placeholder="Image URL" class="w-full border p-2 rounded" />

          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Lagre endringer</button>
        </form>
      </div>
    `;

    const form = document.getElementById("edit-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedPet = {
        name: form.name.value,
        species: form.species.value,
        breed: form.breed.value,
        age: Number(form.age.value),
        size: form.size.value,
        color: form.color.value,
        description: form.description.value,
        image: {
          url: form.imageUrl.value,
          alt: form.name.value,
        },
      };

      try {
        const res = await fetch(`https://v2.api.noroff.dev/pets/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPet),
        });

        if (!res.ok) throw new Error("Oppdatering feilet.");

        alert("Kjæledyr oppdatert!");
        window.location.href = "/admin/dashboard.html";

      } catch (error) {
        console.error(error);
        alert("Kunne ikke oppdatere kjæledyret.");
      }
    });

  } catch (err) {
    console.error(err);
    app.innerHTML = "<p>Kunne ikke laste inn kjæledyret.</p>";
  }
}