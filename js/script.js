/**
 * 1. CONFIGURAÇÕES E PLUGINS
 * Registra as ferramentas necessárias do GSAP.
 */
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// 1. Desativa a restauração nativa de scroll do navegador
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

/**
 * 2. BLOQUEIO DE SCROLL INICIAL
 * Impede que o usuário role a página enquanto o preloader está ativo.
 */
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

/**
 * 3. VARIÁVEIS DO PRELOADER
 * Referências aos elementos que compõem a animação de entrada.
 * - strokePaths: As linhas do contorno do logo.
 * - fillGroup: O preenchimento colorido/sólido do logo.
 * - preloader: O container preto/fundo que cobre a tela.
 */
const preloader = document.querySelector(".preloader");
const strokePaths = document.querySelectorAll(".logo-stroke path");
const fillGroup = document.querySelector(".logo-fill");
const logo = document.querySelector(".logo");

/**
 * 4. ESTADO INICIAL DO PRELOADER (SVG STROKE)
 * Configura o efeito de "desenho" das linhas do logo.
 */
gsap.set(".hero", { autoAlpha: 0 }); // Garante que o site comece invisível atrás do preloader

if (strokePaths.length) {
  strokePaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.strokeLinecap = "round";
    path.style.stroke = "rgb(168,19,19)";
    path.style.fill = "transparent";
  });
}
if (logo) gsap.set(logo, { autoAlpha: 1 });
if (fillGroup) gsap.set(fillGroup, { autoAlpha: 0, filter: "blur(2px)" });

/**
 * 5. FUNÇÕES DE ANIMAÇÃO DE TEXTOS (SPLITTEXT)
 * Lógica para quebrar textos em caracteres e animar ao rolar.
 */
const initTextAnimations = () => {
  const grupoTextSplit = document.querySelectorAll(".textAnimation");

  grupoTextSplit.forEach(textoUnicoSplit => {
    // Pula o texto da hero (ID hero-text) pois ele tem animação própria na timeline
    if (textoUnicoSplit.id === "hero-text") return;

    const split = new SplitText(textoUnicoSplit, { type: "lines,words,chars" });
    gsap.from(split.chars, {
      y: 40,
      duration: 0.3,
      stagger: 0.05,
      opacity: 0,
      scrollTrigger: {
        trigger: textoUnicoSplit,
        start: "top 90%",
      }
    });
  });
};

/**
 * 6. ANIMAÇÕES DE SEÇÕES (CARDS, LISTAS E FOOTER)
 * Define como os elementos internos do site aparecem durante o scroll.
 */
const initSectionAnimations = () => {
  // Seção Cidades (Cards)
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

  // Seção Comunidades (Lista)
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

  // Footer (Efeito Parallax Reverso)
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
 * 7. TIMELINE PRINCIPAL (O CORAÇÃO DO SITE)
 * Orquestra o Preloader -> Revelação da Hero -> Ativação do Restante.
 */
window.addEventListener("load", () => {
  // 1. Inicializa o Scroll Suave primeiro
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
    normalizeScroll: true
  });

  // 2. Trava o scroll usando a API nativa do GSAP (substitui o overflow: hidden)
  smoother.paused(true);

  const mainTl = gsap.timeline({
    onComplete: () => {
      // 3. Destrava o scroll suave
      smoother.paused(false);

      // Inicializa as animações de scroll
      initTextAnimations();
      initSectionAnimations();

      // Recalcula as posições agora que o site está visível e rolável
      ScrollTrigger.refresh();
    }
  });

  // Prepara o texto da Hero com ID específico
  const heroElement = document.querySelector("#hero-text");
  const heroSplit = heroElement ? new SplitText(heroElement, { type: "lines,words,chars" }) : null;

  // Sequência de execução (mantém a sua lógica original)
  mainTl
    .to(strokePaths, { strokeDashoffset: 0, duration: 1, stagger: 0.2 })
    .to(fillGroup, { autoAlpha: 1, filter: "blur(0px)", duration: 0.5 }, "-=0.5")
    .addLabel("saida")
    .to(preloader, { autoAlpha: 0, duration: 0.8 }, "saida")
    .to(".hero", { autoAlpha: 1, duration: 0.8 }, "saida")
    .from(".monstro", { y: -70, autoAlpha: 0, duration: 0.8 }, "saida+=0.3")
    .from(".personagens", { y: 70, autoAlpha: 0, duration: 0.8 }, "saida+=0.3")
    .from(heroSplit ? heroSplit.chars : [], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power2.out"
    }, "saida+=0.5")
    .set(preloader, { display: "none" });
});