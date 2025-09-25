import { API_URL } from "./config";

async function apiCall(endpoint, method = "GET", body = null) {
  try {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Falha na requisição para ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na chamada da API para ${endpoint}:`, error);
    throw error;
  }
}

export const login = (email, password) => apiCall("/users/login", "POST", { email, password });
export const getServices = () => apiCall("/services");
export const createUser = (userData) => apiCall("/users", "POST", userData);
export const getReviews = () => apiCall("/reviews");
export const createService = (serviceData) => apiCall("/services", "POST", serviceData);
export const getUsers = () => apiCall("/users");
export const updateUser = (id, userData) => apiCall(`/users/${id}`, "PUT", userData);
export const deleteUser = (id) => apiCall(`/users/${id}`, "DELETE");
