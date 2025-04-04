export function createPetCard(pet) {
    const card = document.createElement('li');
    card.classList.add(
      'pet-item',
      'w-full',
      'max-w-xs',
      'mx-auto',
      'overflow-hidden',
      'border',
      'rounded-lg',
      'shadow-md',
      'flex',
      'flex-col'
    );
  
    card.innerHTML = `
      <div class="w-full h-40 overflow-hidden">
        <img 
          src="${pet.image.url}" 
          alt="${pet.image.alt}" 
          class="w-full h-full object-cover"
        >
      </div>
  
      <div class="p-4 flex-1 overflow-auto">
        <h2 class="text-lg font-bold mb-2">${pet.name}</h2>
        <p class="text-sm"><strong>Species:</strong> ${pet.species}</p>
        <p class="text-sm"><strong>Breed:</strong> ${pet.breed}</p>
        <p class="text-sm"><strong>Age:</strong> ${pet.age}</p>
        <p class="text-sm"><strong>Gender:</strong> ${pet.gender}</p>
        <p class="text-sm"><strong>Size:</strong> ${pet.size}</p>
        <p class="text-sm"><strong>Color:</strong> ${pet.color}</p>
        <p class="text-xs text-gray-700 mt-2">${pet.description}</p>
      </div>
    `;
  
    return card;
  }