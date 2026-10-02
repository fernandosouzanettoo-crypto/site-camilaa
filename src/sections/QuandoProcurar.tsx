import { useEffect, useRef } from "react";
import { quandoProcurar } from "../content";
import { FadeIn } from "../components/FadeIn";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";

function Faixa({ itens, faixaRef }: { itens: string[]; faixaRef: React.RefObject<HTMLDivElement> }) {
  // Conteúdo triplicado para nunca aparecer espaço vazio
  const repetido = [...itens, ...itens, ...itens];
  return (
    <div className="overflow-hidden py-2 md:py-3">
      <div
        ref={faixaRef}
        className="flex w-max items-center whitespace-nowrap"
        style={{ willChange: "transform", transform: "translate3d(-33.333%, 0, 0)" }}
      >
        {repetido.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= itens.length ? "true" : undefined}>
            <span className="px-5 font-serif text-[clamp(1.8rem,5vw,4.5rem)] font-medium leading-tight text-claro/85 sm:px-8">{item}</span>
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-dourado sm:h-2.5 sm:w-2.5" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function QuandoProcurar() {
  const secao = useRef<HTMLElement>(null);
  const linha1 = useRef<HTMLDivElement>(null);
  const linha2 = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    if (reduced) return;
    const fator = mobile ? 0.5 : 1;
    let raf = 0;
    const atualizar = () => {
      const s = secao.current;
      if (!s) return;
      const topo = s.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - topo + window.innerHeight) * 0.3 * fator;
      if (linha1.current) linha1.current.style.transform = `translate3d(calc(-33.333% + ${offset - 200}px), 0, 0)`;
      if (linha2.current) linha2.current.style.transform = `translate3d(calc(-33.333% + ${-(offset - 200)}px), 0, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, mobile]);

  return (
    <section ref={secao} className="relative overflow-hidden bg-marinho-escuro pb-28 pt-16 sm:pb-32 md:pb-44 md:pt-20">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <FadeIn>
          <h2 className="font-serif text-[clamp(2.2rem,6vw,5.5rem)] font-medium leading-[1.02] text-claro">{quandoProcurar.titulo}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[clamp(0.9rem,1.4vw,1.1rem)] font-light text-claro/70 md:mt-7">{quandoProcurar.subtitulo}</p>
        </FadeIn>
      </div>

      <ul className="sr-only">
        {[...quandoProcurar.linha1, ...quandoProcurar.linha2].map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-14 sm:mt-16 md:mt-24">
        <Faixa itens={quandoProcurar.linha1} faixaRef={linha1} />
        <Faixa itens={quandoProcurar.linha2} faixaRef={linha2} />
      </div>

      <div className="mx-auto mt-14 max-w-3xl px-5 text-center sm:mt-16 sm:px-8 md:mt-24">
        <FadeIn>
          <p className="font-serif text-[clamp(1.3rem,2.6vw,2.1rem)] italic leading-snug text-dourado">{quandoProcurar.fechamento1}</p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-3 font-serif text-[clamp(1.3rem,2.6vw,2.1rem)] leading-snug text-claro">{quandoProcurar.fechamento2}</p>
        </FadeIn>
      </div>
    </section>
  );
}
