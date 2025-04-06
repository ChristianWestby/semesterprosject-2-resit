// src/components/logo.js

export function createLogo() {
    const logo = document.createElement('div');
    logo.textContent = 'PET ADOPTION SHELTER';
    logo.className = 'text-black text-[18px] leading-[28px] font-normal';
    logo.style.fontFamily = 'Myanmar Khyay';
    return logo;
  }