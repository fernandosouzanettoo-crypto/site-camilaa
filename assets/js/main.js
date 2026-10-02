/* ==========================================================================
   Dra. Camila Egypto · Psiquiatria
   Lenis + GSAP (ScrollTrigger, SplitText). Sem WebGL: profundidade com camadas e CSS 3D.
   ========================================================================== */

(() => {
  "use strict";

  // Contato: código do país + DDD + número, só dígitos
  const WHATSAPP = "5585991034586";
  const MENSAGEM = "Olá, Dra. Camila! Gostaria de agendar uma consulta.";

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const liberar = (semAnimacao = false) => {
    clearTimeout(window.__fallback);
    if (semAnimacao) root.classList.add("sem-anim");
    root.classList.add("is-ready");
  };

  /* ---------- Base (funciona com ou sem animação) ---------- */

  const linkWhatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
  $$(".js-whatsapp").forEach((a) => {
    a.href = linkWhatsapp;
    a.target = "_blank";
    a.rel = "noopener";
  });

  const ano = $("[data-ano]");
  if (ano) ano.textContent = new Date().getFullYear();

  const topo = $("[data-topo]");
  const botaoMenu = $(".topo__menu");
  let lenis = null;

  const abrirMenu = (abrir) => {
    topo.classList.toggle("is-aberto", abrir);
    botaoMenu.setAttribute("aria-expanded", String(abrir));
    botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    if (lenis) abrir ? lenis.stop() : lenis.start();
    else document.body.style.overflow = abrir ? "hidden" : "";
  };
  botaoMenu.addEventListener("click", () => abrirMenu(!topo.classList.contains("is-aberto")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && topo.classList.contains("is-aberto")) abrirMenu(false);
  });

  // Âncoras internas: rolagem suave pelo Lenis quando disponível
  $$('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    a.addEventListener("click", (e) => {
      const alvo = $(id);
      if (!alvo) return;
      e.preventDefault();
      if (topo.classList.contains("is-aberto")) abrirMenu(false);
      if (lenis) lenis.scrollTo(alvo, { duration: 1.4 });
      else alvo.scrollIntoView({ behavior: "smooth" });
    });
  });

  const temGSAP = window.gsap && window.ScrollTrigger && window.SplitText;
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Topo e WhatsApp flutuante reagem à rolagem (versão sem GSAP)
  const hero = $("[data-hero]");
  const whatsapp = $("[data-whatsapp-flutuante]");
  let ultimoY = 0;
  const atualizarTopo = (y, direcao = Math.sign(y - ultimoY)) => {
    const limite = hero ? hero.offsetHeight - 90 : 200;
    topo.classList.toggle("is-solido", y > limite);
    if (direcao !== 0) {
      topo.classList.toggle("is-oculto", direcao > 0 && y > window.innerHeight * 0.6 && !topo.classList.contains("is-aberto"));
    }
    whatsapp.classList.toggle("is-visivel", y > window.innerHeight * 0.5);
    ultimoY = y;
  };

  if (!temGSAP || reduzMovimento) {
    window.addEventListener("scroll", () => atualizarTopo(window.scrollY), { passive: true });
    atualizarTopo(window.scrollY);
    $(".loader")?.remove();
    liberar(true);
    return;
  }

  try {
    iniciarAnimacoes();
  } catch (erro) {
    console.error(erro);
    $(".loader")?.remove();
    liberar(true);
  }

  /* ======================================================================
     Animações
     ====================================================================== */
  function iniciarAnimacoes() {
    const { gsap, ScrollTrigger, SplitText } = window;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    gsap.defaults({ ease: "expo.out", duration: 1.2 });

    /* 7.1 Scroll suave: Lenis integrado ao ScrollTrigger */
    if (window.Lenis) {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => atualizarTopo(self.scroll(), self.direction) });

    /* Estados iniciais do hero, aplicados inline antes de liberar o CSS */
    const foto = $("[data-hero-photo]");
    const fotoImg = $("img", foto);
    const titulo = $("[data-hero-title]");
    const fades = $$("[data-hero-fade]");
    gsap.set(foto, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(fotoImg, { scale: 1.15 });
    gsap.set([titulo, ...fades], { opacity: 0 });
    gsap.set(".hero__moldura", { opacity: 0 });
    gsap.set(".hero__linha", { scaleY: 0, transformOrigin: "50% 0%" });
    liberar();

    const esperar = (promessa, ms) => Promise.race([promessa, new Promise((r) => setTimeout(r, ms))]);
    const fontesProntas = esperar(document.fonts ? document.fonts.ready : Promise.resolve(), 2500);
    const fotoPronta = esperar(fotoImg.decode ? fotoImg.decode().catch(() => {}) : Promise.resolve(), 2500);

    const loader = $(".loader");
    let jaVisitou = false;
    try { jaVisitou = sessionStorage.getItem("ce-visitou") === "1"; sessionStorage.setItem("ce-visitou", "1"); } catch (e) { /* sem storage */ }

    if (lenis) lenis.stop();
    window.scrollTo(0, 0);

    const abertura = gsap.timeline({ paused: true });
    if (loader && !jaVisitou) {
      const logo = $(".loader__logo", loader);
      abertura
        .fromTo(logo, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(logo, { opacity: 0, y: -10, duration: 0.8, ease: "power3.out" }, "+=0.1")
        .to(loader, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "<0.1");
    } else if (loader) {
      abertura.to(loader, { opacity: 0, duration: 0.8, ease: "power3.out" });
    }

    Promise.all([fontesProntas, fotoPronta]).then(() => {
      abertura
        .add(entradaHero(), loader && !jaVisitou ? "-=0.55" : "-=0.4")
        .add(() => {
          loader?.remove();
          if (lenis) lenis.start();
        }, "-=1.2");
      abertura.play();
      configurarRolagem();
      ScrollTrigger.refresh();
    });

    /* 7.2 Hero: timeline de entrada em sequência */
    function entradaHero() {
      const split = SplitText.create(titulo, { type: "lines", mask: "lines", linesClass: "linha" });
      gsap.set(titulo, { opacity: 1 });
      const tl = gsap.timeline();
      // 1) foto revela de baixo para cima enquanto faz scale 1.15 -> 1
      tl.to(foto, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out" }, 0)
        .to(fotoImg, { scale: 1, duration: 1.6, ease: "expo.out" }, 0)
        .to(".hero__moldura", { opacity: 1, duration: 1.4, ease: "power3.out" }, 0.5)
        .to(".hero__linha", { scaleY: 1, duration: 1.6, ease: "expo.out" }, 0.6)
        // 2) título: cada linha sobe de dentro da máscara
        .from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.12, ease: "expo.out" }, 0.35)
        // 3) Psiquiatria, frase e botão
        .fromTo(fades, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, 0.8);
      return tl;
    }

    function configurarRolagem() {
      const mm = gsap.matchMedia();

      /* Parallax do hero em camadas: foto mais lenta que o texto, decorativos em outras velocidades */
      $$("[data-speed]", hero).forEach((el) => {
        const v = parseFloat(el.dataset.speed);
        gsap.to(el, {
          yPercent: v * 28,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });
      gsap.to(".hero__texto", {
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "35% top", end: "bottom top", scrub: 0.6 },
      });

      /* Desktop: camadas seguem o cursor (máx. ~14px), cada uma com sua profundidade */
      mm.add("(min-width: 1024px) and (pointer: fine)", () => {
        const camadas = $$("[data-depth]", hero).map((el) => ({
          profundidade: parseFloat(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const mover = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          camadas.forEach((c) => { c.x(nx * 20 * c.profundidade); c.y(ny * 20 * c.profundidade); });
        };
        const centralizar = () => camadas.forEach((c) => { c.x(0); c.y(0); });
        hero.addEventListener("pointermove", mover);
        hero.addEventListener("pointerleave", centralizar);
        return () => {
          hero.removeEventListener("pointermove", mover);
          hero.removeEventListener("pointerleave", centralizar);
        };
      });

      /* Botões magnéticos sutis */
      mm.add("(min-width: 1024px) and (pointer: fine)", () => {
        const limpar = $$("[data-magnetico]").map((btn) => {
          const alvo = $("span", btn);
          const x = gsap.quickTo(alvo, "x", { duration: 0.8, ease: "power3.out" });
          const y = gsap.quickTo(alvo, "y", { duration: 0.8, ease: "power3.out" });
          const mover = (e) => {
            const r = btn.getBoundingClientRect();
            x((e.clientX - r.left - r.width / 2) * 0.25);
            y((e.clientY - r.top - r.height / 2) * 0.35);
          };
          const sair = () => { x(0); y(0); };
          btn.addEventListener("pointermove", mover);
          btn.addEventListener("pointerleave", sair);
          return () => { btn.removeEventListener("pointermove", mover); btn.removeEventListener("pointerleave", sair); };
        });
        return () => limpar.forEach((fn) => fn());
      });

      /* Manifesto: palavras acendem conforme a rolagem */
      const manifesto = $("[data-scrub-words]");
      if (manifesto) {
        const palavras = SplitText.create(manifesto, { type: "words", wordsClass: "palavra" }).words;
        gsap.fromTo(palavras, { opacity: 0.14 }, {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: manifesto, start: "top 78%", end: "bottom 42%", scrub: 0.8 },
        });
      }

      /* Títulos: linhas sobem de dentro de máscaras */
      $$("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "linha",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, {
            yPercent: 110, duration: 1.3, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }),
        });
      });

      /* Textos de apoio: fade + leve subida */
      $$("[data-fade]").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 28, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      /* Lista "quando procurar" em cascata */
      const lista = $("[data-lista]");
      if (lista) {
        gsap.from(lista.children, {
          opacity: 0, y: 30, duration: 1, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: lista, start: "top 82%", once: true },
        });
      }

      /* Fotos: revelação por clip-path + parallax interno */
      $$("[data-reveal-img]").forEach((fig) => {
        const img = $("img", fig);
        const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 82%", once: true } });
        tl.fromTo(fig, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out" })
          .fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
        gsap.fromTo(img, { yPercent: -12 }, {
          yPercent: 0, ease: "none",
          scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      /* Pilares: cartões empilhados que recuam em profundidade (CSS 3D) */
      const cartoes = $$("[data-pilha] .pilar");
      cartoes.forEach((cartao, i) => {
        const proximo = cartoes[i + 1];
        if (!proximo) return;
        gsap.to(cartao, {
          scale: 0.9, rotationX: -7, z: -60, "--escurecer": 0.4, ease: "none",
          scrollTrigger: { trigger: proximo, start: "top bottom", end: "top 25%", scrub: 0.6 },
        });
      });

      /* Foto de tela cheia: abre de um recorte até ocupar a tela */
      const expandir = $("[data-expandir]");
      if (expandir) {
        const recorte = () => (window.innerWidth < 860 ? "inset(16% 8% 16% 8% round 18px)" : "inset(14% 22% 14% 22% round 24px)");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: expandir, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
        });
        tl.fromTo("[data-expandir-foto]", { clipPath: recorte }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }, 0)
          .fromTo("[data-expandir-foto] img", { scale: 1.25 }, { scale: 1, ease: "power2.out", duration: 1 }, 0)
          .fromTo("[data-expandir-texto]", { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.35 }, 0.6);
      }

      /* FAQ: abertura e fechamento suaves */
      $$("[data-faq] details").forEach((det) => {
        const corpo = $(".faq__corpo", det);
        $("summary", det).addEventListener("click", (e) => {
          e.preventDefault();
          if (det.open) {
            gsap.to(corpo, {
              height: 0, duration: 0.8, ease: "expo.out",
              onComplete: () => { det.open = false; gsap.set(corpo, { clearProps: "height" }); ScrollTrigger.refresh(); },
            });
          } else {
            det.open = true;
            gsap.fromTo(corpo, { height: 0 }, {
              height: "auto", duration: 1, ease: "expo.out",
              onComplete: () => ScrollTrigger.refresh(),
            });
          }
        });
      });

      /* Menu do celular: links entram em cascata */
      botaoMenu.addEventListener("click", () => {
        if (topo.classList.contains("is-aberto")) {
          gsap.fromTo("#menu a", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.25 });
        }
      });

      window.addEventListener("load", () => ScrollTrigger.refresh());
    }
  }
})();
