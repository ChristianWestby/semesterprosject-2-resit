const API_BASE = "https://v2.api.noroff.dev/pets";

export async function fetchPetById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pet by ID");
  }
  const { data } = await res.json();
  return data;
}