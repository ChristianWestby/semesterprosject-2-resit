const pawImage = "/images/paws.svg";

export function setupHome(app) {
  app.innerHTML = `
    <section 
      id="heroSection"
      class="relative w-full h-screen bg-green-600 flex flex-col items-center justify-center text-center text-white px-4 overflow-hidden cursor-pointer"
      tabindex="0"
      role="link"
      aria-label="Klikk for å se kjæledyr"
    >
      <div class="absolute inset-0 bg-black opacity-10 z-0"></div>

    
      <div id="pawContainer" class="absolute inset-0 z-0 pointer-events-none"></div>

      
      <div class="relative z-10 px-4 sm:px-6 py-6 max-w-md sm:max-w-xl fade-in">
  <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
    Velkommen til <br> Pet Adoption Shelter
  </h1>
  <p class="text-base sm:text-lg mb-6">Vi er her for å hjelpe deg med å finne din venn</p>
  <button 
    id="heroButton"
    class="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-gray-200 transition"
  >
    Se kjæledyr
  </button>
</div>
    </section>
  `;

  const pawContainer = document.getElementById("pawContainer");

  for (let i = 0; i < 6; i++) {
    const paw = document.createElement("img");
    paw.src = pawImage;
    paw.alt = "Poteavtrykk";
  
    const topOffset = 10 + i * 10 + Math.floor(Math.random() * 6); 
    const leftOffset = 10 + i * 12;
    const rotate = Math.floor(Math.random() * 40) - 20;
    const delay = (i * 1.4).toFixed(1);
  
    paw.className = "animate-pawMove absolute w-12 opacity-60 pointer-events-none";
    paw.style.top = `${topOffset}%`;
    paw.style.left = `${leftOffset}%`;
    paw.style.transform = `rotate(${rotate}deg)`;
    paw.style.animationDelay = `${delay}s`;
  
    pawContainer.appendChild(paw);
  }

  const hero = document.getElementById("heroSection");
  const button = document.getElementById("heroButton");

  hero.addEventListener("click", () => {
    window.location.href = "/pet/index.html";
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "/pet/index.html";
  });
}