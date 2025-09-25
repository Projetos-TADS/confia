import { API_URL } from "./config";

export async function getServices() {
  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function createUser(userData) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getReviews() {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function createService(serviceData) {
  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create service");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}
