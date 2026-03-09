﻿// Registra plugins primeiro
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Aguarda DOM completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  
  // =================================================================
  // 1. SCROLL SMOOTHER - Com verificação de existência
  // =================================================================
  const smoothWrapper = document.querySelector("#smooth-wrapper");
  const smoothContent = document.querySelector("#smooth-content");
  
  let smoother;
  
  if (smoothWrapper && smoothContent) {
    try {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true
      });
    } catch (error) {
      console.warn("ScrollSmoother não inicializado:", error);
    }
  } else {
    console.warn("Elementos do ScrollSmoother não encontrados");
  }

  // =================================================================
  // 2. MENU HAMBURGUER
  // =================================================================
  const btn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu-mobile");
  const overlay = document.querySelector(".menu-overlay");

  if (btn && menu && overlay) {
    const openMenu = () => {
      btn.classList.add("is-open");
      menu.classList.add("is-open");
      overlay.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      
      // Pausa o scroll smoother se existir
      if (smoother) smoother.paused(true);
    };

    const closeMenu = () => {
      btn.classList.remove("is-open");
      menu.classList.remove("is-open");
      overlay.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      
      // Retoma o scroll smoother
      if (smoother) smoother.paused(false);
    };

    btn.addEventListener("click", () => {
      const opened = menu.classList.contains("is-open");
      opened ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Executa uma vez no load
  }

 // =================================================================
// 3. POPUP FORMULÁRIO
// =================================================================
const abrirPopup = (mensagem, tipo = 'sucesso') => {
  const popup = document.querySelector("#popup-sucesso");
  const card = document.querySelector(".popup-card");
  const msg = document.querySelector("#popup-mensagem");
  const titulo = document.querySelector("#popup-titulo");
  const icon = document.querySelector(".popup-icon");

  // 1. Reset e Preenchimento
  msg.textContent = mensagem;
  card.classList.remove('sucesso', 'erro');
  card.classList.add(tipo);
  
  if(tipo === 'erro') {
      titulo.textContent = "Erro!";
      icon.textContent = "❌";
  } else {
      titulo.textContent = "Enviado!";
      icon.textContent = "✈️";
  }

  // 2. GSAP - Forçando o início
  gsap.set(popup, { display: "flex", opacity: 0 });
  
  const tl = gsap.timeline();
  tl.to(popup, { opacity: 1, duration: 0.3 })
    .fromTo(card, 
      { scale: 0.5, opacity: 0, y: 50 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, 
      "-=0.1"
    );

  if (window.smoother) smoother.paused(true);
};

// Listener para o botão fechar
document.querySelector("#fechar-btn").addEventListener("click", () => {
  gsap.to("#popup-sucesso", { opacity: 0, duration: 0.3, onComplete: () => {
      document.querySelector("#popup-sucesso").style.display = "none";
      if (window.smoother) window.smoother.paused(false);
  }});
});

// =================================================================
// 4. CAPTURAR SUBMIT DO FORMULÁRIO
// =================================================================
const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recarregar a página

  // Pega os valores dos campos
  const nome = form.nome.value;
  const email = form.email.value;
  const destino = form.destino.value;

  // Aqui você pode colocar validação extra se quiser

  // Chama o popup de sucesso
  abrirPopup("Sua mensagem foi entregue com sucesso!", "sucesso");

  // Limpa o formulário
  form.reset();
});

  // =================================================================
  // 4. ANIMAÇÕES GSAP - Com verificações de elementos
  // =================================================================
  
  // Hero image entrada
  const heroMundo = document.querySelector(".hero-mundo");
  if (heroMundo) {
    gsap.from(heroMundo, {
      yPercent: -15, 
      duration: 1.8,
      ease: "power2.out"
    });

    // Parallax Hero
    gsap.to(heroMundo, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Hero text com SplitText
  const heroText = document.querySelector("#hero-text");
  if (heroText && typeof SplitText !== 'undefined') {
    try {
      const splitHero = new SplitText(heroText, {
        type: "lines, words, chars",
        linesClass: "split-line"
      });

      gsap.from(splitHero.chars, {
        duration: 0.8,
        y: 40,               
        opacity: 0,         
        rotateX: -90,        
        stagger: 0.02,       
        ease: "power2.out",
        delay: 0.8
      });
    } catch (error) {
      console.warn("SplitText falhou:", error);
      // Fallback sem SplitText
      gsap.from(heroText, {
        duration: 0.8,
        y: 40,
        opacity: 0,
        ease: "power2.out",
        delay: 0.8
      });
    }
  }

  // Parallax Footer
  const footerMundo = document.querySelector(".footer-mundo");
  if (footerMundo) {
    gsap.to(footerMundo, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom", 
        end: "bottom top",   
        scrub: true
      }
    });
  }

  // =================================================================
  // 5. SWIPER - Com verificação
  // =================================================================
  const swiperContainer = document.querySelector(".swiper");
  if (swiperContainer && typeof Swiper !== 'undefined') {
    new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  // =================================================================
  // 6. BOTÃO WHATSAPP - Com verificação
  // =================================================================
  
  const whatsappBtn = document.querySelector(".whatsapp-float");
  
  if (whatsappBtn) {
    whatsappBtn.style.opacity = "0";
    whatsappBtn.style.visibility = "hidden";
    whatsappBtn.style.transition = "opacity 0.3s ease, visibility 0.3s ease";

    let scrollTimeout;
    
    const handleScroll = () => {
      // Debounce para performance
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
          whatsappBtn.style.opacity = "1";
          whatsappBtn.style.visibility = "visible";
        } else {
          whatsappBtn.style.opacity = "0";
          whatsappBtn.style.visibility = "hidden";
        }
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Verifica posição inicial
  }

}); // Fim do DOMContentLoaded