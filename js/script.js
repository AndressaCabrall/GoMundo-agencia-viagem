//Puglis do Gsap

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);


//Preloader

// trava o scroll (html + body)
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";


//seleciona todos os paths do stroke e o grupo do fill        

const strokePaths = document.querySelectorAll(".logo-stroke path");
const fillGroup = document.querySelector(".logo-fill");
const preloader = document.querySelector(".preloader");
const logo = document.querySelector(".logo");

//Esconde tudo imediatamente (evita flash)

if (preloader) gsap.set(preloader, { autoAlpha: 1 });
if (logo) gsap.set(logo, { autoAlpha: 0 });       // esconde o svg
if (fillGroup) gsap.set(fillGroup, { autoAlpha: 0, filter: "blur(2px)" });

// Pprepara os PATHS o quanto mantes (sem esperar load)

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

// Mostrar o SVG já no estado zerado

if (logo) gsap.set(logo, { autoAlpha: 1 });
gsap.set(".hero", { autoAlpha: 0 });

// Animações da hero e as outras

window.addEventListener("load", () => {

    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true
    });

    // 1. Função que anima os textos da seção cidaes e comunidades

    const animarTextosGerais = () => {
        const grupoTextSplit = document.querySelectorAll(".textAnimation");

        grupoTextSplit.forEach(textoUnicoSplit => {

            // PULA o texto da hero aqui dentro para não dar conflito
            if (textoUnicoSplit.id === "hero-text") return;

            const split = new SplitText(textoUnicoSplit, {
                type: "lines,words,chars",
            });

            gsap.from(split.chars, {
                y: 40,
                duration: 0.3,
                stagger: 0.05,
                opacity: 0,
                scrollTrigger: {
                    trigger: textoUnicoSplit,
                    start: "top 90%",
                    markers: false,
                }
            });
        });
    };

    //Animação dos Cards Seção cidades

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

      //Animação da lista da Seção comunidades

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

      gsap.from("footer", {
        yPercent: -30,
        immediateRender: false,
        scrollTrigger: {
          trigger: "footer",
          scrub: true,
          invalidateOnRefresh: true,
          end: "100% 100%",
        },
      });

    // 2. Timeline Principal

    const tl = gsap.timeline({
        onComplete: () => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
            ScrollTrigger.refresh();
        }
    });

    // Preparamos o Split do texto da Hero 
    const heroElement = document.querySelector("#hero-text");
    const heroSplit = heroElement ? new SplitText(heroElement, { type: "lines,words,chars" }) : null;

    tl.to(strokePaths, { strokeDashoffset: 0, duration: 1, stagger: 0.2 })
        .to(fillGroup, { autoAlpha: 1, filter: "blur(0px)", duration: 0.5 }, "-=0.5")
        
        .addLabel("saida")
        .to(preloader, { autoAlpha: 0, duration: 0.8 }, "saida")
        .to(".hero", { autoAlpha: 1, duration: 0.8 }, "saida")
        
        // Personagens entrando

        .from(".monstro", { y: -70, autoAlpha: 0, duration: 0.8 }, "saida+=0.3")
        .from(".personagens", { y: 70, autoAlpha: 0, duration: 0.8 }, "saida+=0.3")

        // Animação da hero-text
       
        .from(heroSplit ? heroSplit.chars : [], {
            y: 30,
            opacity: 0,
            duration: 0.8,    // Tempo maior para ser mais elegante
            stagger: 0.02,    // Velocidade das letras
            ease: "power2.out"
        }, "saida+=0.5")      // Ajuste esse valor para decidir quando o texto começa

        .set(preloader, { display: "none" })
        .add(() => animarTextosGerais()); // Agora essa função só anima o resto do site
});