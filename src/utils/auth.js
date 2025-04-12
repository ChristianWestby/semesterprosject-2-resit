const TOKEN_KEY = 'authToken';

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("name");
  localStorage.removeItem("email");
}

export function isLoggedIn() {
  return !!getToken();
}

// 👇 Legg til dette nederst
export function saveUserInfo({ name, email }) {
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
}

export function protectRoute(redirectTo = "/account/login.html") {
    if (!isLoggedIn()) {
      window.location.href = redirectTo;
    }
  }