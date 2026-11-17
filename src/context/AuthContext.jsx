import React, { createContext, useContext, useMemo, useState } from "react";
import http from "../services/http";
import { API, USE_MOCK_DATA } from "../config";

const AuthContext = createContext(null);
const demoUsers = {
  admin: { id: 1, name: "Alex Morgan", email: "admin@commerce.local", roles: ["ADMIN"] },
  seller: { id: 2, name: "Jordan Lee", email: "seller@commerce.local", roles: ["SELLER"] },
  buyer: { id: 3, name: "Taylor Kim", email: "buyer@commerce.local", roles: ["BUYER"] }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("commerce_user") || "null"); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("commerce_access_token"));

  async function login(email, password) {
    let result;
    if (USE_MOCK_DATA) {
      const role = email.toLowerCase().includes("seller") ? "seller" :
        email.toLowerCase().includes("buyer") ? "buyer" : "admin";
      result = { accessToken: "demo-" + role + "-token", user: demoUsers[role] };
    } else {
      const { data } = await http.post(API.login, { email, password });
      result = data;
    }
    const accessToken = result.accessToken || result.token;
    const profile = result.user || result;
    if (!accessToken) throw new Error("Login response did not contain accessToken/token.");
    localStorage.setItem("commerce_access_token", accessToken);
    localStorage.setItem("commerce_user", JSON.stringify(profile));
    setToken(accessToken); setUser(profile);
    return profile;
  }

  function logout() {
    localStorage.removeItem("commerce_access_token");
    localStorage.removeItem("commerce_user");
    setToken(null); setUser(null);
  }

  const value = useMemo(() => ({
    user, token, isAuthenticated: Boolean(token),
    roles: user?.roles || user?.authorities || [],
    hasRole: (...required) => {
      const current = user?.roles || user?.authorities || [];
      return required.some(r => current.some(x => (typeof x === "string" ? x : x.authority) === r || (typeof x === "string" ? x : x.authority) === `ROLE_${r}`));
    },
    login, logout
  }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
