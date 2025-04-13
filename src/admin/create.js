import { getToken, protectRoute } from "../utils/auth.js";

export function setupCreatePet(app) {
  protectRoute(); 

  const token = getToken();
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");

  app.innerHTML = `
    <div class="max-w-xl mx-auto bg-white p-6 rounded shadow border border-black mt-8">
      <h1 class="text-2xl font-bold mb-2 text-black">Opprett nytt kjæledyr</h1>
      <p class="text-sm text-gray-700 mb-6">Innlogget som <strong>${userName}</strong> (${userEmail})</p>

      <form id="create-form" class="space-y-4">
        <input type="text" name="name" placeholder="Navn" class="w-full p-2 border border-black rounded text-black" required />
        <input type="text" name="species" placeholder="Art" class="w-full p-2 border border-black rounded text-black" required />
        <input type="text" name="breed" placeholder="Rase" class="w-full p-2 border border-black rounded text-black" required />
        <input type="number" name="age" placeholder="Alder" class="w-full p-2 border border-black rounded text-black" required />
        <input type="text" name="size" placeholder="Størrelse" class="w-full p-2 border border-black rounded text-black" required />
        <input type="text" name="color" placeholder="Farge" class="w-full p-2 border border-black rounded text-black" required />
        <textarea name="description" placeholder="Beskrivelse" class="w-full p-2 border border-black rounded text-black"></textarea>
        <input type="text" name="imageUrl" placeholder="Bilde-URL" class="w-full p-2 border border-black rounded text-black" />

        <button type="submit" class="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Opprett kjæledyr</button>
        <p id="create-error" class="text-red-600 mt-2 hidden text-center"></p>
        <p id="create-success" class="text-green-600 mt-2 hidden text-center"></p>
      </form>
    </div>
  `;

  const form = document.getElementById("create-form");
  const errorMsg = document.getElementById("create-error");
  const successMsg = document.getElementById("create-success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.classList.add("hidden");
    successMsg.classList.add("hidden");

    const newPet = {
      name: form.name.value.trim(),
      species: form.species.value.trim(),
      breed: form.breed.value.trim(),
      age: Number(form.age.value),
      size: form.size.value.trim(),
      color: form.color.value.trim(),
      description: form.description.value.trim(),
      image: {
        url: form.imageUrl.value.trim(),
        alt: form.name.value.trim(),
      },
    };

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

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.errors?.[0]?.message || "Oppretting feilet.");
      }

      successMsg.textContent = "🐾 Kjæledyret ble opprettet!";
      successMsg.classList.remove("hidden");
      form.reset();

      setTimeout(() => {
        window.location.href = "/admin/dashboard.html";
      }, 1500);

    } catch (error) {
      console.error("Oppretting feilet:", error);
      errorMsg.textContent = error.message || "Kunne ikke opprette kjæledyret.";
      errorMsg.classList.remove("hidden");
    }
  });
}