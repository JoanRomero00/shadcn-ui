import { client } from "./api/generated/client.gen";

// Configurar la URL base global de la API del backend de Symfony
client.setConfig({
  baseUrl: "http://localhost:8000",
});

// Registrar un interceptor de request para inyectar dinámicamente el token JWT
client.interceptors.request.use((request) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return request;
});

// Re-exportar todo lo generado (servicios, tipos, esquemas) y el cliente configurado
export * from "./api/generated";
export { client };
