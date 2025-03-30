// src/js/api/pets.js

const API_URL = "https://v2.api.noroff.dev/pets";


export async function fetchAllPets() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("❌ Cant get the pets..:", error);
    return [];
  }
}