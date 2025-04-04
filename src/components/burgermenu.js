// burgermenu.js
export function createHamburger() {
    const button = document.createElement('button');
    button.classList.add('hamburger');
    button.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    return button;
  }