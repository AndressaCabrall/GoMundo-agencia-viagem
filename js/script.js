﻿gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Menu Hamburguer Animação

document.addEventListener("DOMContentLoaded", () => {
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

  if (window.innerWidth >= 1024) closeMenu();
});

//************************************************************************************************ */

// Pop Up para Formulário.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const popup = document.querySelector("#popup-sucesso");
  const popupCard = document.querySelector(".popup-card");
  const fecharBtn = document.querySelector("#fechar-btn");
  const popupMensagem = document.querySelector("#popup-mensagem");

  // --- Função para abrir o popup ---
  function abrirPopup(mensagem, tipo = 'sucesso') {
      if (!popup || !popupCard || !popupMensagem) {
          alert(mensagem);
          return;
      }

      popupMensagem.textContent = mensagem;
      popupCard.classList.remove('popup-sucesso', 'popup-erro');
      popupCard.classList.add(tipo === 'erro' ? 'popup-erro' : 'popup-sucesso');

      popup.style.display = "flex"; 

      if (window.gsap) {
          gsap.from(popupCard, {
              duration: 0.6,
              scale: 0.5,
              opacity: 0,
              ease: "back.out(1.7)"
          });
      }
  }

  // --- Fechar popup (Melhorado: fecha ao clicar fora do card também) ---
  const fecharPopup = () => { if(popup) popup.style.display = "none"; };
  
  if (fecharBtn) fecharBtn.addEventListener("click", fecharPopup);
  
  window.addEventListener("click", (e) => {
      if (e.target === popup) fecharPopup();
  });

  // --- Evento de envio (Otimizado com Async/Await) ---
  if (form) {
      form.addEventListener("submit", async function(e) {
          e.preventDefault();

          // Pega o botão de submit para desabilitar
          const submitBtn = form.querySelector('button[type="submit"]');
          if(submitBtn) submitBtn.disabled = true;

          try {
              const formData = new FormData(form);
              // Lembre-se de verificar se o arquivo é 'enviar.php' ou 'processar.php'
              const response = await fetch("enviar.php", {
                  method: "POST",
                  body: formData 
              });

              if (!response.ok) throw new Error('Falha na resposta do servidor');

              const data = await response.json();

              if (data.status === "sucesso") {
                  abrirPopup(data.mensagem, 'sucesso');
                  form.reset();
              } else {
                  abrirPopup(data.mensagem || "Erro ao salvar dados.", 'erro');
              }

          } catch (error) {
              console.error("Erro:", error);
              abrirPopup("Erro de conexão ou falha no servidor.", 'erro');
          } finally {
              // Reabilita o botão independente de ter dado certo ou errado
              if(submitBtn) submitBtn.disabled = false;
          }
      });
  }
});

//**************************************************************************************** */

//Efeito Scroll suave

const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });
  
//**************************************************************************************** */
// 1. Animação de entrada (Imagem descendo no load)

gsap.from(".mundo", {
    yPercent: -15, 
    duration: 1.8,
    ease: "power2.out"
  });




//**************************************************************************************** */
// Parallax da Imagem

gsap.to(".mundo", {
    y: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });


//**************************************************************************************** */
//Animação do Hero-text

const splitHero = new SplitText("#hero-text", {
    type: "lines, words, chars",
    linesClass: "split-line"
});

// 2. Cria a Timeline para o texto
const tlText = gsap.timeline({ delay:0.8 }); // Começa um pouco depois da imagem

tlText.from(splitHero.chars, {
    duration: 0.8,
    y: 40,               
    opacity: 0,         
    rotateX: -90,        
    stagger: 0.02,       
    ease: "power2.out",
});

/******************************************************************************** */

const swiper = new Swiper(".swiper", {
  // Mostra 4 cards no desktop, 1 no mobile
  slidesPerView: 1,
  spaceBetween: 20,

  // Loop infinito
  loop: true,

  // Autoplay
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  // Paginação (dots)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Setas de navegação
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsivo
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});