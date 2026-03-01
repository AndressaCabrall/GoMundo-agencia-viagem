/**
 * ======================================================
 * 1. REGISTRO DE PLUGINS
 * Ativa os plugins necessários do GSAP.
 * ======================================================
 */
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);


/**
 * ======================================================
 * 2. ANIMAÇÕES DE TEXTO (SCROLL)
 * Divide textos em caracteres e anima quando entram na viewport.
 * ======================================================
 */
const initTextAnimations = () => {
  const grupoTextSplit = document.querySelectorAll(".textAnimation");

  grupoTextSplit.forEach(textoUnicoSplit => {

    // Ignora o texto da hero, pois ele possui animação própria
    if (textoUnicoSplit.id === "hero-text") return;

    const split = new SplitText(textoUnicoSplit, { 
      type: "lines,words,chars" 
    });

    gsap.from(split.chars, {
      y: 40,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      scrollTrigger: {
        trigger: textoUnicoSplit,
        start: "top 90%",
      }
    });
  });
};


/**
 * ======================================================
 * 3. ANIMAÇÕES DE SEÇÕES
 * Define os efeitos de entrada para cards, listas e footer.
 * ======================================================
 */
const initSectionAnimations = () => {

  // Cards da seção de cidades
  gsap.from(".city-card", {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
    stagger: 0.4,
    ease: "none",
    scrollTrigger: {
      trigger: ".cities-card",
      start: "0% 85%",
      end: "100% 60%",
      scrub: true,
    },
  });

  // Lista da seção comunidades
  gsap.from(".communities-list li", {
    opacity: 0,
    x: -40,
    filter: "blur(6px)",
    stagger: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: ".communities-list",
      start: "0% 85%",
      end: "100% 60%",
      scrub: true,
    },
  });

  // Footer com leve efeito parallax reverso
  gsap.from("footer", {
    yPercent: -30,
    scrollTrigger: {
      trigger: "footer",
      scrub: true,
      end: "100% 100%",
    },
  });
};


/**
 * ======================================================
 * 4. INICIALIZAÇÃO PRINCIPAL
 * - Ativa ScrollSmoother
 * - Executa animação inicial da Hero
 * - Inicializa animações de scroll
 * ======================================================
 */
window.addEventListener("load", () => {

  // Inicializa Scroll Suave
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
    normalizeScroll: true
  });

  // Garante que a hero esteja visível no carregamento
  gsap.set(".hero", { autoAlpha: 1 });

  // Divide o texto da hero para animação individual
  const heroElement = document.querySelector("#hero-text");
  const heroSplit = heroElement 
    ? new SplitText(heroElement, { type: "lines,words,chars" }) 
    : null;

  // Timeline da animação inicial da hero
  const heroTl = gsap.timeline({
    onComplete: () => {
      initTextAnimations();
      initSectionAnimations();
      ScrollTrigger.refresh();
    }
  });

  heroTl
    .from(".monstro", { 
      y: -70,
      autoAlpha: 0,
      duration: 0.8 
    })
    .from(".personagens", { 
      y: 70,
      autoAlpha: 0,
      duration: 0.8 
    }, "-=0.6")
    .from(heroSplit ? heroSplit.chars : [], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power2.out"
    }, "-=0.5");

});