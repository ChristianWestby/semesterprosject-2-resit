export function setupLogin(app) {
    app.innerHTML = `
      <h1 class="text-xl font-bold mb-4">Admin Login</h1>
      <form id="loginForm" class="space-y-4">
        <input type="email" name="email" placeholder="Email" class="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" class="w-full p-2 border rounded" required />
        <button class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
      <p id="message" class="mt-4 text-red-600"></p>
    `;
  
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
  
      try {
        const res = await fetch("https://v2.api.noroff.dev/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
  
        if (!res.ok) throw new Error("Login failed");
  
        const { data } = await res.json();
        localStorage.setItem("token", data.accessToken);
        app.innerHTML = `<p class="text-green-600">✅ Logged in successfully!</p>`;
      } catch (err) {
        document.getElementById("message").textContent = "❌ " + err.message;
      }
    });
  }