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
  const form = document.querySelector(".contact-form");
  const popup = document.querySelector("#popup-sucesso");
  const popupCard = document.querySelector(".popup-card");
  const fecharBtn = document.querySelector("#fechar-btn");
  const popupMensagem = document.querySelector("#popup-mensagem");

  if (popup && popupCard && popupMensagem) {
    const abrirPopup = (mensagem, tipo = 'sucesso') => {
      popupMensagem.textContent = mensagem;
      popupCard.classList.remove('popup-sucesso', 'popup-erro');
      popupCard.classList.add(tipo === 'erro' ? 'popup-erro' : 'popup-sucesso');
      
      popup.style.display = "flex";
      
      // Pausa scroll smoother no popup
      if (smoother) smoother.paused(true);

      gsap.from(popupCard, {
        duration: 0.6,
        scale: 0.5,
        opacity: 0,
        ease: "back.out(1.7)"
      });
    };

    const fecharPopup = () => {
      popup.style.display = "none";
      // Retoma scroll smoother
      if (smoother) smoother.paused(false);
    };

    if (fecharBtn) {
      fecharBtn.addEventListener("click", fecharPopup);
    }

    popup.addEventListener("click", (e) => {
      if (e.target === popup) fecharPopup();
    });

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const formData = new FormData(form);
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
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

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