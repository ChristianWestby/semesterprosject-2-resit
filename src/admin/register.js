// src/admin/register.js

export function setupRegister(app) {
    app.innerHTML = `
      <div class="max-w-md mx-auto bg-white p-6 rounded shadow mt-12">
        <h1 class="text-2xl font-bold mb-4">Registrer deg</h1>
        <form id="register-form" class="space-y-4">
          <input type="text" name="name" placeholder="Brukernavn" required class="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="E-post" required class="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Passord" required class="w-full p-2 border rounded" />
          <button type="submit" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Registrer</button>
        </form>
      </div>
    `;
  
    const form = document.getElementById("register-form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const user = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      };
  
      try {
        const res = await fetch("https://v2.api.noroff.dev/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("Registrering fullført! Du kan nå logge inn.");
          window.location.href = "/account/login.html";
        } else {
          alert(data.errors?.[0]?.message || "Noe gikk galt under registrering.");
        }
      } catch (err) {
        console.error("Feil ved registrering:", err);
        alert("Nettverksfeil – prøv igjen senere.");
      }
    });
  }