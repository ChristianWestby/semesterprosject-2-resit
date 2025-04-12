import { saveToken, saveUserInfo } from "../utils/auth.js";

export function setupLogin(app) {
  app.innerHTML = `
    <div style="background-color: white; min-height: 100vh;" class="flex items-center justify-center px-4">
      <div style="background-color: white; border: 2px solid black;" class="max-w-md w-full p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-6 text-center text-black">Logg inn</h1>

        <form id="login-form" class="space-y-4">
          <label class="block text-black">
            E-post
            <input 
              type="email" 
              name="email" 
              class="w-full p-2 rounded mt-1 border-2 border-black text-black bg-white" 
              required 
              value="christian@noroff.no"
            />
          </label>
          <label class="block text-black">
            Passord
            <input 
              type="password" 
              name="password" 
              class="w-full p-2 rounded mt-1 border-2 border-black text-black bg-white" 
              required 
            />
          </label>
          <button 
            type="submit" 
            class="w-full py-2 rounded bg-black text-white hover:bg-gray-800 transition">
            Logg inn
          </button>
        </form>

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
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      window.location.href = "/admin/dashboard.html";

    } catch (err) {
      console.error(err);
      errorMsg.textContent = err.message || "Innlogging feilet.";
      errorMsg.classList.remove("hidden");
    }
  });
}