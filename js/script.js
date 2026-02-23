//Puglis do Gsap

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);


//Preloader

// trava scroll (html + body)
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";


//seleciona todos os paths do stroke e o grupo do fill        

const strokePaths = document.querySelectorAll(".logo-stroke path");
const fillGroup = document.querySelector(".logo-fill");
const preloader = document.querySelector(".preloader");
const logo = document.querySelector(".logo");

// 1) ESCONDE TUDO IMEDIATAMENTE (evita flash)

if (preloader) gsap.set(preloader, { autoAlpha: 1 });
if (logo) gsap.set(logo, { autoAlpha: 0 });       // esconde o svg
if (fillGroup) gsap.set(fillGroup, { autoAlpha: 0, filter: "blur(2px)" });

// 2) PREPARA OS PATHS O QUANTO ANTES (sem esperar load)

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

// 3) AGORA PODE MOSTRAR O SVG JÁ NO ESTADO “ZERADO”

if (logo) gsap.set(logo, { autoAlpha: 1 });
gsap.set(".hero", { autoAlpha: 0 });

// Animações

window.addEventListener("load", () => {

    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true
    });

    // 1. Função que anima APENAS os textos que NÃO são a hero
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

    // 2. Timeline Principal
    const tl = gsap.timeline({
        onComplete: () => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
            ScrollTrigger.refresh();
        }
    });

    // Preparamos o Split do texto da Hero separadamente
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

        // --- ANIMAÇÃO EXCLUSIVA DO HERO-TEXT ---
        // Aqui você tem controle total. Ex: stagger mais lento ou efeito diferente
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