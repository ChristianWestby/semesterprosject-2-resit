import './style.css';
import { fetchAllPets } from './js/api/pets.js';

let allPets = [];

const app = document.querySelector('#app');
app.innerHTML = `
  <div>
    <h1>🐾 Liste over kjæledyr</h1>
    <div class="filters">
      <input type="text" id="searchInput" placeholder="Søk på navn..." />
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
    <ul id="pet-list" class="pet-list"></ul>
  </div>
`;

const searchInput = document.getElementById('searchInput');
const speciesFilter = document.getElementById('speciesFilter');
const petList = document.getElementById('pet-list');

// Filtreringsfunksjon
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

// Tegner listen
function renderPets(pets) {
  petList.innerHTML = "";
  pets.forEach((pet) => {
    const li = document.createElement("li");
    li.classList.add("pet-item");

    const imageUrl = pet.image?.url || "https://placekitten.com/200/150";
    const imageAlt = pet.image?.alt || pet.name;

    li.innerHTML = `
      <img src="${imageUrl}" alt="${imageAlt}" width="150" />
      <h2>${pet.name}</h2>
    `;

    petList.appendChild(li);
  });
}

// Event listeners
searchInput.addEventListener("input", filterAndRenderPets);
speciesFilter.addEventListener("change", filterAndRenderPets);

// Start
fetchAllPets().then((pets) => {
  allPets = pets;
  filterAndRenderPets();
});