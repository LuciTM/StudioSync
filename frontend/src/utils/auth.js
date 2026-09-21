const API_BASE = "/api"; // goes through the Vite proxy to your Laravel backend

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

async function ensureCsrfCookie() {
  await fetch("/sanctum/csrf-cookie", { credentials: "include" });
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || "Something went wrong.");
    err.status = res.status;
    err.errors = data?.errors;
    throw err;
  }

  return data;
}

export async function register(payload) {
  await ensureCsrfCookie();
  const data = await request("/register", { method: "POST", body: JSON.stringify(payload) });
  return data.user;
}

export async function login({ email, password }) {
  await ensureCsrfCookie();
  const data = await request("/login", { method: "POST", body: JSON.stringify({ email, password }) });
  return data.user;
}

export async function logout() {
  await request("/logout", { method: "POST" });
}

export async function getCurrentUser() {
  try {
    return await request("/user");
  } catch {
    return null; // not logged in — not an error state
  }
}