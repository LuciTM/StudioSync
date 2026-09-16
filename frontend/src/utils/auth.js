// Base URL of your Laravel backend. Adjust the port if yours differs.
const API_BASE = "http://localhost:8000";

async function ensureCsrfCookie() {
  await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

async function apiRequest(path, options = {}) {
  await ensureCsrfCookie();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body (e.g. 204 on logout)
  }

  if (!res.ok) {
    const message = data?.message || "Something went wrong. Please try again.";
    const errors = data?.errors || null;
    throw { message, errors, status: res.status };
  }

  return data;
}

export function register({ firstName, lastName, email, password, role }) {
  return apiRequest("/api/register", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      password,
      role,
    }),
  });
}

export function login({ email, password }) {
  return apiRequest("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });
}

export function logout() {
  return apiRequest("/api/logout", { method: "POST" });
}

export function fetchCurrentUser() {
  return apiRequest("/api/user", { method: "GET" });
}