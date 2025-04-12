import { getToken, protectRoute } from "../utils/auth.js";

export function setupCreatePet(app) {
  protectRoute(); 

  const token = getToken();

  app.innerHTML = `
    <div class="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Opprett nytt kjæledyr</h1>
      <form id="create-form" class="space-y-4">
        <input type="text" name="name" placeholder="Name" class="w-full border p-2 rounded" required />
        <input type="text" name="species" placeholder="Species" class="w-full border p-2 rounded" required />
        <input type="text" name="breed" placeholder="Breed" class="w-full border p-2 rounded" required />
        <input type="number" name="age" placeholder="Age" class="w-full border p-2 rounded" required />
        <input type="text" name="size" placeholder="Size" class="w-full border p-2 rounded" required />
        <input type="text" name="color" placeholder="Color" class="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" class="w-full border p-2 rounded"></textarea>
        <input type="text" name="imageUrl" placeholder="Image URL" class="w-full border p-2 rounded" />

        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Opprett kjæledyr</button>
      </form>
    </div>
  `;

  const form = document.getElementById("create-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPet = {
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
      const res = await fetch("https://v2.api.noroff.dev/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPet),
      });

      if (!res.ok) {
        throw new Error("Oppretting feilet.");
      }

      alert("Kjæledyr opprettet!");
      window.location.href = "/admin/dashboard.html";

    } catch (error) {
      console.error(error);
      alert("Kunne ikke opprette kjæledyr.");
    }
  });
}