import { fetchAllPets } from "../utils/api.js";
import { createPetCard } from "../components/petCard.js";

let allPets = [];
let currentPage = 1;
const petsPerPage = 6;

export async function setupPetList(app) {
  app.innerHTML = `
    <section class="max-w-7xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">🐾 Våre dyr</h1>

      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="Søk etter navn..." 
          class="border border-black p-2 rounded w-full sm:w-1/2"
        />
        <select 
          id="speciesFilter" 
          class="border border-black p-2 rounded w-full sm:w-1/4"
        >
          <option value="">Alle arter</option>
          <option value="Cat">Katt</option>
          <option value="Dog">Hund</option>
          <option value="Fish">Fisk</option>
          <option value="Rabbit">Kanin</option>
          <option value="Rodent">Gnagere</option>
          <option value="Reptile">Reptil</option>
        </select>
      </div>

      <div id="status" class="text-center text-gray-600 mb-4">🔄 Laster inn kjæledyr...</div>

      <ul id="pet-list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></ul>

      <div id="pagination" class="flex justify-center gap-2 mt-6"></div>
    </section>
  `;

  const searchInput = document.getElementById("searchInput");
  const speciesFilter = document.getElementById("speciesFilter");
  const petList = document.getElementById("pet-list");
  const pagination = document.getElementById("pagination");
  const status = document.getElementById("status");

  try {
    allPets = await fetchAllPets();
    status.style.display = "none";
    renderFiltered();
  } catch (error) {
    console.error("Feil ved lasting av kjæledyr:", error);
    status.textContent = "⚠️ Kunne ikke laste kjæledyr. Prøv igjen senere.";
  }

  function renderFiltered() {
    const search = searchInput.value.toLowerCase();
    const species = speciesFilter.value;

    const filtered = allPets.filter(pet => {
      const matchName = pet.name.toLowerCase().includes(search);
      const matchSpecies = !species || pet.species === species;
      return matchName && matchSpecies;
    });

    currentPage = Math.min(currentPage, Math.ceil(filtered.length / petsPerPage));
    renderPets(filtered);
    renderPagination(filtered.length);
  }

  function renderPets(pets) {
    const start = (currentPage - 1) * petsPerPage;
    const visiblePets = pets.slice(start, start + petsPerPage);

    petList.innerHTML = "";
    if (visiblePets.length === 0) {
      petList.innerHTML = `<p class="text-gray-600 col-span-full text-center">⚠️ Ingen kjæledyr funnet.</p>`;
      return;
    }

    visiblePets.forEach((pet) => {
      const card = createPetCard(pet);
      petList.appendChild(card);
    });
  }

  function renderPagination(totalCount) {
    const totalPages = Math.ceil(totalCount / petsPerPage);
    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    if (currentPage > 1) {
      pagination.appendChild(createPageBtn("« Forrige", currentPage - 1));
    }

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = createPageBtn(i, i);
      if (i === currentPage) pageBtn.classList.add("bg-black", "text-white");
      pagination.appendChild(pageBtn);
    }

    if (currentPage < totalPages) {
      pagination.appendChild(createPageBtn("Neste »", currentPage + 1));
    }
  }

  function createPageBtn(label, page) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "px-3 py-1 rounded border border-gray-400 hover:bg-gray-200";
    btn.onclick = () => {
      currentPage = page;
      renderFiltered();
    };
    return btn;
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderFiltered();
  });

  speciesFilter.addEventListener("change", () => {
    currentPage = 1;
    renderFiltered();
  });
}