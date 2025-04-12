// src/components/petCard.js
export function createPetCard(pet) {
  const card = document.createElement('li');
  card.className = `
    w-full max-w-xs mx-auto border rounded-lg shadow-md flex flex-col bg-white overflow-hidden
  `;

  card.innerHTML = `
    <div class="h-40 w-full">
      <img 
        src="${pet.image?.url}" 
        alt="${pet.image?.alt || pet.name}" 
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-bold text-black mb-1">${pet.name}</h2>
        <p class="text-sm text-gray-700"><strong>Species:</strong> ${pet.species}</p>
        <p class="text-sm text-gray-700"><strong>Breed:</strong> ${pet.breed}</p>
        <p class="text-sm text-gray-700"><strong>Age:</strong> ${pet.age}</p>
        <p class="text-sm text-gray-700"><strong>Gender:</strong> ${pet.gender}</p>
        <p class="text-sm text-gray-700"><strong>Size:</strong> ${pet.size}</p>
        <p class="text-sm text-gray-700"><strong>Color:</strong> ${pet.color}</p>
        <p class="text-xs text-gray-600 mt-2">${pet.description}</p>
      </div>
      <a 
        href="/pet/index.html?id=${pet.id}" 
        class="mt-4 inline-block text-blue-600 hover:underline font-medium"
      >
        Se mer →
      </a>
    </div>
  `;

  return card;
}