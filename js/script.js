//Scroll suave

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
	smooth: 2,
	effects: true

});

function animarPagina() {

	//Animações Hero/imagens

	gsap.from(".hero", {
		opacity: 0,
		duration: 2

	})

	gsap.from("picture:nth-child(2)", {
		y: 60,
		duration: 1

	})

	gsap.from("picture:nth-child(1)", {
		y: -60,
		duration: 1

	})

	//Animações da Seção cidades/cards

	gsap.from(".city-card", {
		opacity: 0,
		filter: "blur(18px)",
		stagger: .3,
		scrollTrigger: {
			trigger: ".cities-card",
			markers: false,
			start: "0% 80%",
			end: "100% 70%",
			scrub: true,

		}

	})

	//Animações da Seção Comunidades

	gsap.from(".communities ul li", {
		x: 40,
		filter: "blur(10px)",
		opacity: 0,
		stagger: .1,
		scrollTrigger: {
			trigger: ".communities li",
			start: "0% 80%",
			end: "100% 50%",
			markers: false,
			scrub: true,

		}

	})

	//Animações do footer

	gsap.from("footer", {
		y: -300,
		immediateRender: false,
		scrollTrigger: {

			trigger: "footer",
			markers: false,
			scrub: true,
			end: "100% 100%",
			invalidateOnRefresh: true,
		}

	}

	)

	//Animações das letras

	const grupoTextSplit = document.querySelectorAll(".textAnimation")

	grupoTextSplit.forEach(textoUnicoSplit => {
		const split = SplitText.create(textoUnicoSplit, {
			type: "lines,words,chars",


		});

		gsap.from(split.chars, {
			y: 40,
			duration: 0.3,
			stagger: 0.05,
			opacity: 0,
			mask: "lines",
			scrollTrigger: {

				trigger: textoUnicoSplit,
				markers: false,

			}

		})

	})

}


//Animação do Preloader

const tl = gsap.timeline({
	onComplete() {
		animarPagina()
		gsap.to("#preloader", {
			opacity: 0,
			onComplete() {
				gsap.set("#preloader", {
					display: "none"
				})
			}

		})
	}

});

tl.to("#preloader path", {
	duration: 1,
	strokeDashoffset: 0
})

tl.to("#preloader path", {
	fill: "  rgb(168, 19, 19)",
	duration: .5,
	strokeDashoffset: 0
})













