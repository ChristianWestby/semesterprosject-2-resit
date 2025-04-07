export function setupCreatePet(app) {
    const token = localStorage.getItem("token");
    if (!token) {
      app.innerHTML = "<p>Admin login required</p>";
      return;
    }
  
    app.innerHTML = `
      <h1 class="text-2xl font-bold mb-4">Add New Pet</h1>
      <form id="createForm" class="space-y-4">
        <input type="text" name="name" placeholder="Name" class="w-full p-2 border rounded" required />
        <input type="text" name="species" placeholder="Species" class="w-full p-2 border rounded" required />
        <input type="text" name="breed" placeholder="Breed" class="w-full p-2 border rounded" />
        <input type="number" name="age" placeholder="Age" class="w-full p-2 border rounded" />
        <input type="text" name="gender" placeholder="Gender" class="w-full p-2 border rounded" />
        <input type="text" name="size" placeholder="Size" class="w-full p-2 border rounded" />
        <input type="text" name="color" placeholder="Color" class="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" class="w-full p-2 border rounded"></textarea>
        <input type="url" name="image" placeholder="Image URL" class="w-full p-2 border rounded" />
        <button class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create</button>
      </form>
      <p id="message" class="text-green-600 mt-4"></p>
    `;
  
    document.getElementById("createForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const data = {
        name: form.name.value,
        species: form.species.value,
        breed: form.breed.value,
        age: Number(form.age.value),
        gender: form.gender.value,
        size: form.size.value,
        color: form.color.value,
        description: form.description.value,
        image: {
          url: form.image.value,
          alt: form.name.value
        }
      };
  
      try {
        const res = await fetch("https://v2.api.noroff.dev/pets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
  
        if (!res.ok) throw new Error("Failed to create pet");
  
        document.getElementById("message").textContent = "🐾 Pet added successfully!";
        form.reset();
      } catch (err) {
        document.getElementById("message").textContent = "⚠️ " + err.message;
      }
    });
  }