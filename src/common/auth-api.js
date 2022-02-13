import fetchApi from "./fetchApi";

export function login(credentials) {
  return fetchApi("/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: credentials,
  });
}

export function register(userData) {
  return fetchApi("/auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: userData,
  });
}

export function activate(confirmationCode) {
  return fetchApi("/auth/activate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: { confirmationCode },
  });
}
