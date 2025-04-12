import { saveToken, saveUserInfo } from "../utils/auth.js";

export function setupRegister(app) {
  app.innerHTML = `
    <div class="max-w-md mx-auto bg-white p-6 rounded shadow mt-12 border border-black">
      <h1 class="text-2xl font-bold mb-4 text-center text-black">Registrer deg</h1>
      <form id="register-form" class="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Brukernavn (a-Z, 0-9, _)" 
          pattern="^[a-zA-Z0-9_]+$"
          title="Kun bokstaver, tall og understrek (_)" 
          required 
          class="w-full p-2 border border-black rounded text-black"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="E-post (må slutte med @noroff.no)" 
          pattern="^[a-zA-Z0-9._%+-]+@noroff\\.no$"
          title="E-post må være en Noroff-adresse"
          required 
          class="w-full p-2 border border-black rounded text-black"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Passord (minst 8 tegn)" 
          minlength="8" 
          required 
          class="w-full p-2 border border-black rounded text-black"
        />
        <button type="submit" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full">
          Registrer
        </button>
      </form>
      <p id="register-error" class="text-red-600 mt-4 text-center hidden"></p>
    </div>
  `;

  const form = document.getElementById("register-form");
  const errorMsg = document.getElementById("register-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.style.display = "none";

    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    try {
      const res = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const { data, error, errors } = await res.json();

      if (!res.ok || error || errors?.length) {
        const message = error?.message || errors?.[0]?.message || "Registrering feilet.";
        throw new Error(message);
      }

      // Automatisk innlogging etter registrering
      saveToken(data.accessToken);
      saveUserInfo(data);
      window.location.href = "/admin/dashboard.html";
    } catch (err) {
      console.error("Feil ved registrering:", err);
      errorMsg.textContent = err.message;
      errorMsg.style.display = "block";
    }
  });
}