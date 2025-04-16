
const API_BASE = "https://v2.api.noroff.dev/pets";
const API_KEY = "227d4ff6-0c0b-4587-8d71-a0ca6528e73f";

export function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };
}

export async function fetchPetById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pet by ID");
  }
  const { data } = await res.json();
  return data;
}

export async function fetchAllPets() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }
  const { data } = await res.json();
  return data;
}