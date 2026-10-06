import { motion } from "framer-motion";
import { cuidado } from "../content";
import { FadeIn } from "../components/FadeIn";
import { useIsTouch, useReducedMotion } from "../hooks/useMedia";

export function CuidadoCentrado() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const hover = !touch && !reduced;

  return (
    <section className="secao-sobreposta z-10 bg-off pb-28 pt-20 sm:pb-32 sm:pt-24 md:pb-44 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        <FadeIn>
          <h2 className="mb-16 text-center font-serif font-medium leading-[1.02] text-marinho text-[clamp(2.5rem,8vw,120px)] sm:mb-20 md:mb-28">
            {cuidado.titulo}
          </h2>
        </FadeIn>

        <ol className="mx-auto max-w-5xl border-t border-marinho/15">
          {cuidado.itens.map((item, i) => (
            <li key={item.numero} className="border-b border-marinho/15">
              <FadeIn delay={i * 0.1}>
                <motion.div
                  className="group grid grid-cols-[auto_1fr] items-center gap-6 py-8 sm:gap-10 sm:py-10 md:gap-16 md:py-12"
                  whileHover={hover ? { x: 8 } : undefined}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="num-lining font-serif font-medium leading-none text-marinho text-[clamp(3rem,10vw,140px)] transition-colors duration-500 group-hover:text-dourado">
                    {item.numero}
                  </span>
                  <div>
                    <h3 className="font-sans font-medium uppercase tracking-wider text-marinho text-[clamp(1rem,2.2vw,2.1rem)]">{item.nome}</h3>
                    <p className="mt-2 max-w-xl font-light text-marinho opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)]">{item.descricao}</p>
                  </div>
                </motion.div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
