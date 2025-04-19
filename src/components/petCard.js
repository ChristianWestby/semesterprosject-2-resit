export function createPetCard(pet) {
  const card = document.createElement('li');
  card.className = 'w-full max-w-xs mx-auto rounded-lg shadow-md overflow-hidden';

  card.innerHTML = `
    <div class="relative bg-green-600">
      <img 
        src="${pet.image?.url}" 
        alt="${pet.image?.alt || pet.name}" 
        class="w-full h-48 object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div class="relative p-4 text-white z-10">
        <h2 class="text-xl font-bold mb-1">${pet.name}</h2>
        <p class="text-sm"><strong>Art:</strong> ${pet.species}</p>
        <p class="text-sm"><strong>Rase:</strong> ${pet.breed}</p>
        <p class="text-sm"><strong>Alder:</strong> ${pet.age}</p>
        <a 
          href="/pet/detail.html?id=${pet.id}" 
          class="mt-4 inline-block text-sm underline text-white hover:text-gray-200"
        >
          Se mer info
        </a>
      </div>
    </div>
  `;

  return card;
}