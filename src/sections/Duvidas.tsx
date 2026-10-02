import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { duvidas } from "../content";
import { FadeIn } from "../components/FadeIn";

function Item({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-marinho/15">
      <h3>
        <button
          type="button"
          aria-expanded={aberto}
          aria-controls={`${id}-resposta`}
          id={`${id}-pergunta`}
          onClick={() => setAberto((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif font-medium text-marinho text-[clamp(1.2rem,2.2vw,1.75rem)] leading-snug transition-opacity duration-200 hover:opacity-70 md:py-8"
        >
          <span>{pergunta}</span>
          <motion.span animate={{ rotate: aberto ? 45 : 0 }} transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }} className="shrink-0 text-dourado">
            <Plus aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 md:h-7 md:w-7" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            id={`${id}-resposta`}
            role="region"
            aria-labelledby={`${id}-pergunta`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 font-light leading-relaxed text-marinho/75 text-[clamp(0.92rem,1.4vw,1.1rem)] md:pb-9">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Duvidas() {
  return (
    <section id="duvidas" className="secao-sobreposta z-30 bg-off pb-28 pt-20 sm:pb-32 sm:pt-24 md:pb-44 md:pt-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <FadeIn>
          <h2 className="mb-12 text-center font-serif font-medium leading-[1.02] text-marinho text-[clamp(2.5rem,7vw,100px)] md:mb-20">{duvidas.titulo}</h2>
        </FadeIn>
        <div className="border-t border-marinho/15">
          {duvidas.itens.map((d, i) => (
            <FadeIn key={d.pergunta} delay={i * 0.06} y={20}>
              <Item {...d} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
