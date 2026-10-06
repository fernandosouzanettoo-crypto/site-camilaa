import { AnimatePresence, motion, useInView, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { avaliacoes } from "../content";
import { FadeIn } from "../components/FadeIn";
import { useReducedMotion } from "../hooks/useMedia";

const AUTOPLAY_MS = 6000;
const LIMIAR_ARRASTE = 90; // px para trocar de cartão ao arrastar
const VISIVEIS = 3; // cartões visíveis na pilha (o da frente e dois atrás)

/**
 * Avaliações em pilha de cartões: arrastar, setas, contador "3 / 9", teclado (← →) e
 * autoplay de 6s que para depois da primeira interação. Sem estrelas, notas ou nomes.
 */
export function Avaliacoes() {
  const textos = avaliacoes.textos;
  const total = textos.length;
  const ref = useRef<HTMLElement>(null);
  const visivel = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [atual, setAtual] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [interagiu, setInteragiu] = useState(false);

  const ir = useCallback(
    (passo: number, manual: boolean) => {
      if (total < 2) return;
      setDirecao(passo);
      setAtual((a) => (a + passo + total) % total);
      if (manual) setInteragiu(true);
    },
    [total],
  );

  // Autoplay: só com a seção visível, sem reduced-motion e até a primeira interação
  useEffect(() => {
    if (reduced || interagiu || !visivel || total < 2) return;
    const t = window.setInterval(() => ir(1, false), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduced, interagiu, visivel, total, ir]);

  if (total === 0) return null;

  const aoSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -LIMIAR_ARRASTE || info.velocity.x < -500) ir(1, true);
    else if (info.offset.x > LIMIAR_ARRASTE || info.velocity.x > 500) ir(-1, true);
  };

  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); ir(1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); ir(-1, true); }
  };

  const duracao = reduced ? 0 : 0.6;
  const pilha = Array.from({ length: Math.min(VISIVEIS, total) }, (_, pos) => ({ pos, indice: (atual + pos) % total }));

  return (
    <section
      id="avaliacoes"
      ref={ref}
      className="secao-sobreposta z-[25] overflow-clip bg-off pb-28 pt-20 sm:pb-32 sm:pt-24 md:pb-40 md:pt-32"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <FadeIn>
          <h2 className="mb-12 text-center font-serif font-medium leading-[1.02] text-marinho text-[clamp(2.5rem,7vw,100px)] md:mb-16">
            {avaliacoes.titulo}
          </h2>
        </FadeIn>

        {/* A pilha não começa oculta: os cartões já aparecem no primeiro render */}
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label={avaliacoes.titulo}
          tabIndex={0}
          onKeyDown={aoTeclar}
          className="relative mx-auto h-[400px] w-full max-w-2xl outline-none focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-dourado sm:h-[400px]"
        >
          <AnimatePresence initial={false} custom={direcao}>
            {pilha
              .slice()
              .reverse()
              .map(({ pos, indice }) => {
                const frente = pos === 0;
                return (
                  <motion.figure
                    key={indice}
                    custom={direcao}
                    className={`absolute inset-0 flex select-none flex-col justify-between rounded-[32px] border border-marinho/10 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(14,29,49,0.45)] sm:rounded-[40px] sm:p-10 md:p-12 ${
                      frente ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"
                    }`}
                    style={{ zIndex: VISIVEIS - pos }}
                    initial={{ opacity: 0, y: 48, scale: 0.9 }}
                    animate={{ opacity: pos === 2 ? 0.55 : 1, y: pos * 18, scale: 1 - pos * 0.045, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: direcao > 0 ? -380 : 380, rotate: reduced ? 0 : direcao > 0 ? -6 : 6, transition: { duration: duracao } }}
                    transition={{ duration: duracao, ease: [0.16, 1, 0.3, 1] }}
                    drag={frente && !reduced ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={frente ? aoSoltar : undefined}
                    aria-hidden={frente ? undefined : true}
                  >
                    <blockquote className="font-serif text-marinho text-[clamp(1.2rem,2.4vw,1.75rem)] leading-snug">
                      <span aria-hidden="true" className="mb-3 block font-serif text-5xl leading-none text-dourado">“</span>
                      {textos[indice]}
                    </blockquote>
                    <figcaption className="mt-6 text-xs font-medium uppercase tracking-widest text-dourado">{avaliacoes.rotulo}</figcaption>
                  </motion.figure>
                );
              })}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-14 flex max-w-2xl items-center justify-between sm:mt-16">
          <button
            type="button"
            onClick={() => ir(-1, true)}
            aria-label="Avaliação anterior"
            className="grid h-12 w-12 place-items-center rounded-full text-marinho ring-1 ring-marinho/20 transition-colors duration-200 hover:bg-marinho hover:text-off"
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.25} className="h-5 w-5" />
          </button>
          <p aria-live="polite" className="num-lining font-serif text-2xl text-marinho">
            {atual + 1} <span className="text-marinho/40">/</span> {total}
          </p>
          <button
            type="button"
            onClick={() => ir(1, true)}
            aria-label="Próxima avaliação"
            className="grid h-12 w-12 place-items-center rounded-full text-marinho ring-1 ring-marinho/20 transition-colors duration-200 hover:bg-marinho hover:text-off"
          >
            <ChevronRight aria-hidden="true" strokeWidth={1.25} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
