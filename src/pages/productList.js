// pages/productList.js
import { fetchAllPets } from '../utils/api.js';
import { createPetCard } from '../components/petCard.js';

let allPets = [];

export async function setupPetList(app) {
  app.innerHTML = `
    <div>
      <h1>🐾 All our pets</h1>
      <div class="filters">
        <input type="text" id="searchInput" placeholder="Search by name..." />
        <select id="speciesFilter">
          <option value="">Alle kategorier</option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
          <option value="Fish">Fish</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Rodent">Rodent</option>
          <option value="Reptile">Reptile</option>
        </select>
      </div>
     <ul id="pet-list" class="pet-list grid grid-rows-1 sm:grid-rows-2 md:grid-cols-3 lg:grid-rows-4 gap-4"></ul>
    </div>
  `;

  const searchInput = document.getElementById('searchInput');
  const speciesFilter = document.getElementById('speciesFilter');
  const petList = document.getElementById('pet-list');

  function filterAndRenderPets() {
    const searchValue = searchInput.value.toLowerCase();
    const speciesValue = speciesFilter.value;

    const filteredPets = allPets.filter((pet) => {
      const matchName = pet.name.toLowerCase().includes(searchValue);
      const matchSpecies = speciesValue === "" || pet.species === speciesValue;
      return matchName && matchSpecies;
    });

    renderPets(filteredPets);
  }

  function renderPets(pets) {
    petList.innerHTML = "";
    pets.forEach((pet) => {
      const petCard = createPetCard(pet);
      petList.appendChild(petCard);
    });
  }

  searchInput.addEventListener("input", filterAndRenderPets);
  speciesFilter.addEventListener("change", filterAndRenderPets);

  allPets = await fetchAllPets();
  filterAndRenderPets();
}