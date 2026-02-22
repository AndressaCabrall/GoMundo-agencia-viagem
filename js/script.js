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

// 4) SÓ INICIA A TIMELINE QUANDO CARREGAR TUDO

window.addEventListener("load", () => {
    if (!preloader || !fillGroup || !strokePaths.length) {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        return;
    }

    const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
        }
    });

    tl.to(strokePaths, { strokeDashoffset: 0, duration: 1, stagger: 0.2 })
        .to(fillGroup, { autoAlpha: 1, filter: "blur(0px)", duration: 0.5 }, "-=0.5")
        .to(preloader, { autoAlpha: 0, duration: 1 })
        .set(preloader, { display: "none" });
});




