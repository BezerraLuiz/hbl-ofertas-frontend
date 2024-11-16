/** Configuração das rotas, headers e etc. */

// URL da rota base para o backend.
export const BASE_URL = "http://localhost:3333";

// Headers.
export const defaultHeaders = { "Content-Type": "application/json" };
export const authHeaders = (token: string) => ({
  ...defaultHeaders,
  Authorization: `Bearer ${token}`,
});
export const formDataHeaders = { "Content-Type": "multipart/form-data" };