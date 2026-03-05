﻿document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu-mobile");
    const overlay = document.querySelector(".menu-overlay");
  
    if (!btn || !menu || !overlay) return;
  
    const openMenu = () => {
      btn.classList.add("is-open");
      menu.classList.add("is-open");
      overlay.classList.add("is-open");
  
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
  
    const closeMenu = () => {
      btn.classList.remove("is-open");
      menu.classList.remove("is-open");
      overlay.classList.remove("is-open");
  
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
  
    btn.addEventListener("click", () => {
      const opened = menu.classList.contains("is-open");
      if (opened) closeMenu();
      else openMenu();
    });
  
    overlay.addEventListener("click", closeMenu);
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });
  
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) closeMenu();
    });

    // Garante fechamento ao carregar em tela grande (caso de refresh)
    if (window.innerWidth >= 1024) closeMenu();
  });