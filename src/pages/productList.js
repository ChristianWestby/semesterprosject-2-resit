import { fetchAllPets } from '../utils/api.js';
import { createPetCard } from '../components/petCard.js';

let allPets = [];
let currentPage = 1;
const petsPerPage = 6;

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
      <ul id="pet-list" class="pet-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6"></ul>
      <div id="pagination" class="pagination flex gap-2 justify-center mt-4"></div>
    </div>
  `;

  const searchInput = document.getElementById('searchInput');
  const speciesFilter = document.getElementById('speciesFilter');
  const petList = document.getElementById('pet-list');
  const pagination = document.getElementById('pagination');

  function filterAndRenderPets() {
    const searchValue = searchInput.value.toLowerCase();
    const speciesValue = speciesFilter.value;

    const filteredPets = allPets.filter((pet) => {
      const matchName = pet.name.toLowerCase().includes(searchValue);
      const matchSpecies = speciesValue === "" || pet.species === speciesValue;
      return matchName && matchSpecies;
    });

    renderPets(filteredPets);
    renderPagination(filteredPets.length);
  }

  function renderPets(pets) {
    const start = (currentPage - 1) * petsPerPage;
    const end = start + petsPerPage;
    const petsToShow = pets.slice(start, end);

    petList.innerHTML = "";
    petsToShow.forEach((pet) => {
      const petCard = createPetCard(pet);
      petList.appendChild(petCard);
    });
  }

  function renderPagination(totalPets) {
    const totalPages = Math.ceil(totalPets / petsPerPage);
    pagination.innerHTML = "";

    // Forrige-knapp
    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "« Forrige";
      prevBtn.onclick = () => {
        currentPage--;
        filterAndRenderPets();
      };
      pagination.appendChild(prevBtn);
    }

    // Sidetall
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      if (i === currentPage) {
        pageBtn.classList.add("font-bold", "underline");
      }
      pageBtn.onclick = () => {
        currentPage = i;
        filterAndRenderPets();
      };
      pagination.appendChild(pageBtn);
    }

    // Neste-knapp
    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Neste »";
      nextBtn.onclick = () => {
        currentPage++;
        filterAndRenderPets();
      };
      pagination.appendChild(nextBtn);
    }
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    filterAndRenderPets();
  });

  speciesFilter.addEventListener("change", () => {
    currentPage = 1;
    filterAndRenderPets();
  });

  allPets = await fetchAllPets();
  filterAndRenderPets();
}