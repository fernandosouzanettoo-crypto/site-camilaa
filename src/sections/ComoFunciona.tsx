import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { comoFunciona, type CardComoFunciona } from "../content";
import { FadeIn } from "../components/FadeIn";
import { Picture } from "../components/Picture";
import { useReducedMotion } from "../hooks/useMedia";

const total = comoFunciona.cards.length;

function Card({ card, index, progresso, reduced }: { card: CardComoFunciona; index: number; progresso: MotionValue<number>; reduced: boolean }) {
  // Escala final diminui conforme os próximos cards sobem
  const escalaFinal = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progresso, [index / total, 1], [1, reduced ? 1 : escalaFinal]);

  return (
    // Abaixo de md o card tem a altura do conteúdo (sem 85vh fixo), mantendo o sticky e a escala
    <div className="sticky top-24 flex items-start justify-center pb-6 md:top-32 md:h-[85vh] md:pb-0">
      <motion.article
        style={{ scale, top: `${index * 28}px` }}
        className="relative flex w-full origin-top flex-col gap-5 md:h-[min(74vh,640px)] overflow-hidden rounded-[40px] border border-dourado/40 bg-marinho-escuro p-5 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.6)] sm:rounded-[50px] sm:p-6 md:flex-row md:gap-10 md:rounded-[60px] md:p-8"
      >
        {card.foto && (
          <div className="relative h-[240px] shrink-0 overflow-hidden rounded-[32px] bg-[#c9cacc] sm:h-[300px] md:order-2 md:h-full md:w-[44%] md:rounded-[40px]">
            <Picture
              nome={card.foto.nome}
              alt={card.foto.alt}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-full w-full object-cover object-[50%_22%]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 md:justify-between md:gap-0 md:p-6">
          <span className="num-lining font-serif font-medium leading-none text-dourado text-[clamp(2.6rem,9vw,8.5rem)]">{card.numero}</span>
          <div>
            <h3 className="font-serif font-medium leading-tight text-claro text-[clamp(1.8rem,3.6vw,3.4rem)]">{card.titulo}</h3>
            {card.destaque && (
              <p className="mt-3 font-serif italic leading-[1.1] text-claro text-[clamp(1.5rem,3vw,2.8rem)]">{card.destaque}</p>
            )}
            <p className="mt-4 max-w-xl font-light leading-relaxed text-claro/70 text-[clamp(0.88rem,1.3vw,1.1rem)]">{card.texto}</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function ComoFunciona() {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="como-funciona" className="secao-sobreposta z-20 bg-marinho-escuro pb-16 pt-20 sm:pt-24 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <FadeIn>
          <h2 className="hero-heading mb-10 text-center font-serif font-medium uppercase leading-none text-[clamp(2.8rem,10vw,140px)] md:mb-16">
            {comoFunciona.titulo}
          </h2>
        </FadeIn>
        <div ref={container}>
          {comoFunciona.cards.map((card, i) => (
            <Card key={card.numero} card={card} index={i} progresso={scrollYProgress} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
