import { saveToken, saveUserInfo } from "../utils/auth.js";

export function setupRegister(app) {
  app.innerHTML = `
    <div class="mt-[260px] bg-green-600 min-h-screen py-10 px-4">
      <div class="max-w-md mx-auto bg-white p-6 sm:p-8 rounded shadow-md border border-black">
        <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">Registrer deg</h1>

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

        <a 
          href="/" 
          class="mt-6 inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition text-center w-full"
        >
          Til forsiden
        </a>

        <p id="register-error" class="text-red-600 mt-4 text-center hidden"></p>
      </div>
    </div>
  `;

  const form = document.getElementById("register-form");
  const errorMsg = document.getElementById("register-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.classList.add("hidden");

    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const { data, error, errors } = await response.json();

      if (!response.ok || error || (errors && errors.length)) {
        const message = error?.message || errors?.[0]?.message || "Registrering feilet.";
        throw new Error(message);
      }

      saveToken(data.accessToken);
      saveUserInfo({ name: data.name, email: data.email });
      window.location.href = "/admin/dashboard.html";

    } catch (err) {
      console.error("Registrering feilet:", err);
      errorMsg.textContent = err.message;
      errorMsg.classList.remove("hidden");
    }
  });
}