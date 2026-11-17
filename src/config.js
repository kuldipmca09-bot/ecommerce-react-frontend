const env = import.meta.env;
export const API_BASE_URL = env.VITE_API_BASE_URL || "http://localhost:8080";
export const USE_MOCK_DATA = env.VITE_USE_MOCK_DATA !== "false";

/*
 * Adjust these paths to match your Spring Boot controllers/API Gateway routes.
 * Keep paths relative to API_BASE_URL.
 */
export const API = {
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  me: "/api/v1/users/me",
  buyers: "/api/v1/buyers",
  sellers: "/api/v1/sellers",
  products: "/api/v1/products",
  listings: "/api/v1/seller/products",
  orders: "/api/v1/orders"
};
