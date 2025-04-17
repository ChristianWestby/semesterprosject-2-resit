import { getToken } from "../utils/auth.js";
import { getAuthHeaders } from "../utils/api.js";

export function setupCreatePet(app) {
  const token = getToken();


  app.innerHTML = `
  <div class="mt-[280px] min-h-screen bg-green-600 px-4 py-12 flex justify-center">
    <div class="w-full max-w-3xl bg-white text-black p-6 sm:p-10 rounded shadow-lg border border-black">
      <h1 class="text-3xl font-bold mb-6 text-green-800 text-center">➕ Legg til nytt kjæledyr</h1>

      <form id="create-form" class="space-y-4">
        <input type="text" name="name" placeholder="Navn" class="w-full border p-2 rounded" required />
        <input type="text" name="species" placeholder="Art" class="w-full border p-2 rounded" required />
        <input type="text" name="breed" placeholder="Rase" class="w-full border p-2 rounded" required />
        <input type="number" name="age" placeholder="Alder" class="w-full border p-2 rounded" required />

        <select name="gender" class="w-full border p-2 rounded" required>
          <option value="">Velg kjønn</option>
          <option value="male">Hann</option>
          <option value="female">Hunn</option>
        </select>

        <input type="text" name="size" placeholder="Størrelse" class="w-full border p-2 rounded" required />
        <input type="text" name="color" placeholder="Farge" class="w-full border p-2 rounded" required />
        <input type="text" name="location" placeholder="Plassering" class="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Beskrivelse" class="w-full border p-2 rounded"></textarea>
        <input type="text" name="imageUrl" placeholder="Bilde-URL" class="w-full border p-2 rounded" />

        <button type="submit" class="bg-orange-600 text-white font-bold px-6 py-2 rounded-full hover:bg-orange-700 transition mt-4">
          🐶 Opprett kjæledyr
        </button>
      </form>
    </div>
  </div>
`;

  const form = document.getElementById("create-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPet = {
      name: form.name.value.trim(),
      species: form.species.value.trim(),
      breed: form.breed.value.trim(),
      age: Number(form.age.value),
      gender: form.gender.value,
      size: form.size.value.trim(),
      color: form.color.value.trim(),
      description: form.description.value.trim(),
      location: form.location.value,
      image: {
        url: form.imageUrl.value.trim(),
        alt: form.name.value.trim(),
      },
    };

    try {
      console.log("Objekt som sendes til API:", newPet);

      const res = await fetch("https://v2.api.noroff.dev/pets", {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(newPet),
      });

      const result = await res.json();
      console.log("Svar fra API:", result);

      if (!res.ok) throw new Error(result.errors?.[0]?.message || "Oppretting feilet");

      alert("🐾 Kjæledyr opprettet!");
      setTimeout(() => {
        window.location.href = "/admin/dashboard.html";
      }, 1500);

    } catch (err) {
      console.error("Oppretting feilet:", err);
      alert(err.message || "Kunne ikke opprette kjæledyret.");
    }
  });
}