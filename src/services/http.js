import axios from "axios";
import { API_BASE_URL } from "../config";

const http = axios.create({ baseURL: API_BASE_URL, timeout: 15000,
  headers: { "Content-Type": "application/json" } });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("commerce_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("commerce_access_token");
      localStorage.removeItem("commerce_user");
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default http;
