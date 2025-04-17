import { createLogo } from "../components/logo.js";
import { saveToken, saveUserInfo } from "../utils/auth.js";

export function setupLogin(app) {
  app.innerHTML = `
    <div class="min-h-screen bg-green-600 flex items-center justify-center px-4 py-20">
      <div class="max-w-md w-full bg-white text-black p-6 sm:p-8 rounded shadow-md border border-black text-center">
        
        <!-- 🐾 Logo -->
        <div class="mb-6 flex justify-center">
          ${createLogo().innerHTML}
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold mb-6">Logg inn</h1>

        <form id="login-form" class="space-y-4 text-left">
          <label class="block">
            E-post
            <input 
              type="email" 
              name="email" 
              class="w-full p-2 mt-1 border-2 border-black rounded text-black bg-white" 
              required 
              value="christian42@noroff.no"
            />
          </label>

          <label class="block">
            Passord
            <input 
              type="password" 
              name="password" 
              class="w-full p-2 mt-1 border-2 border-black rounded text-black bg-white" 
              required 
            />
          </label>

          <button 
            type="submit" 
            class="w-full py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Logg inn
          </button>
        </form>

        <!-- 🏠 Til forsiden-knapp -->
        <a 
          href="/" 
          class="mt-6 inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          ← Til forsiden
        </a>

        <p id="login-error" class="mt-4 text-center text-red-600 hidden"></p>
      </div>
    </div>
  `;

  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("login-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const { data, error } = await response.json();

      if (!response.ok || error) {
        throw new Error(error?.message || "Innlogging feilet.");
      }

      saveToken(data.accessToken);
      saveUserInfo({ name: data.name, email: data.email });

      window.location.href = "/admin/dashboard.html";

    } catch (err) {
      console.error(err);
      errorMsg.textContent = err.message || "Innlogging feilet.";
      errorMsg.classList.remove("hidden");
    }
  });
}