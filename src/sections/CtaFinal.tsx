import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cta } from "../content";
import { ConsultButton } from "../components/ConsultButton";
import { FadeIn } from "../components/FadeIn";
import { Picture } from "../components/Picture";
import { useReducedMotion } from "../hooks/useMedia";

// Quebra de linhas do título para o reveal linha a linha
const LINHAS = ["Cuidar da saúde", "mental é um", "processo."];

export function CtaFinal() {
  const bloco = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bloco, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 1.1, 1]);

  return (
    <section id="contato" className="secao-sobreposta z-40 bg-marinho-escuro px-3 pb-10 pt-12 sm:px-6 sm:pt-16 md:px-10 md:pb-14 md:pt-20">
      <div ref={bloco} className="relative mx-auto h-[86svh] min-h-[560px] max-w-[1600px] overflow-hidden rounded-[40px] bg-[#bfc0c2] md:h-[88vh] md:rounded-[60px]">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Picture
            nome="contato-camila"
            alt="Dra. Camila Egypto, de macacão preto, olhando por cima do ombro"
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_18%] md:object-[62%_22%]"
          />
        </motion.div>
        {/* Degradê azul-marinho do lado do texto */}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,29,49,0.95)_0%,rgba(14,29,49,0.75)_38%,rgba(14,29,49,0)_70%)] md:bg-[linear-gradient(90deg,rgba(14,29,49,0.94)_0%,rgba(14,29,49,0.72)_38%,rgba(14,29,49,0)_66%)]" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:inset-y-0 md:right-auto md:flex md:max-w-[52%] md:flex-col md:justify-center md:p-16 lg:p-20">
          <motion.h2
            className="font-serif font-medium leading-[1.02] text-claro text-[clamp(2.4rem,5.4vw,5.6rem)]"
            aria-label={cta.titulo}
            initial="oculto"
            whileInView="visivel"
            viewport={{ once: true, amount: 0.5 }}
          >
            {LINHAS.map((linha, i) => (
              <span key={linha} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
                <motion.span
                  className="block"
                  variants={{
                    oculto: { y: reduced ? "0%" : "105%", opacity: reduced ? 0 : 1 },
                    visivel: { y: "0%", opacity: 1, transition: { duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {linha}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <FadeIn delay={0.35} y={20}>
            <p className="mt-5 max-w-md font-light leading-relaxed text-claro/80 text-[clamp(0.92rem,1.4vw,1.15rem)] md:mt-7">{cta.texto}</p>
          </FadeIn>
          <FadeIn delay={0.5} y={20} className="mt-7 md:mt-10">
            <ConsultButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
