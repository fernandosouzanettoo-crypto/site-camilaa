import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero } from "../content";
import { ConsultButton } from "../components/ConsultButton";
import { FadeIn } from "../components/FadeIn";
import { Magnet } from "../components/Magnet";
import { Navbar } from "../components/Navbar";
import { Picture } from "../components/Picture";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Retrato desce mais devagar que o título (no celular, metade da intensidade)
  const intensidade = reduced ? 0 : mobile ? 0.5 : 1;
  const retratoY = useTransform(scrollYProgress, [0, 1], [0, 220 * intensidade]);
  const tituloY = useTransform(scrollYProgress, [0, 1], [0, 60 * intensidade]);

  return (
    <section id="inicio" ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-marinho-escuro">
      {/* luz suave atrás do retrato */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_62%,rgba(110,128,153,0.22),transparent_70%)]" />

      <Navbar />

      {/* Título gigante */}
      <motion.div style={{ y: tituloY }} className="absolute inset-x-0 top-[15%] z-0 overflow-hidden px-3 sm:top-[22%] md:top-[24%]">
        <FadeIn delay={0.15} y={40}>
          <h1 className="text-center font-serif font-medium uppercase leading-[0.86]">
            <span className="mb-1 block text-[clamp(1rem,2.2vw,2rem)] tracking-[0.3em] text-claro/70 sm:mb-2">{hero.prefixo}</span>
            <span className="hero-heading block whitespace-nowrap text-[23vw] sm:text-[11.6vw]">
              <span className="block sm:inline">Camila</span>
              <span className="hidden sm:inline"> </span>
              <span className="block sm:inline">Egypto</span>
            </span>
          </h1>
        </FadeIn>
      </motion.div>

      {/* Retrato em arco, sobreposto ao título */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-[38%] justify-center sm:bottom-0 sm:top-auto sm:translate-y-0">
        <motion.div style={{ y: retratoY }}>
          <FadeIn delay={0.6} y={30}>
            <Magnet>
              <div className="relative w-[240px] overflow-hidden rounded-t-full border border-dourado/40 bg-[#c9cacc] sm:w-[320px] md:w-[400px] lg:w-[460px] aspect-[4/5.1] sm:aspect-[4/5]">
                <Picture
                  nome="hero-camila"
                  alt="Dra. Camila Egypto, psiquiatra, sentada em uma banqueta, de blazer preto"
                  sizes="(min-width: 1024px) 460px, (min-width: 768px) 400px, (min-width: 640px) 320px, 240px"
                  prioridade
                  largura={1280}
                  altura={1812}
                  className="h-full w-full object-cover object-[50%_18%]"
                />
              </div>
            </Magnet>
          </FadeIn>
        </motion.div>
      </div>

      {/* Barra inferior */}
      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[1600px] items-end justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="mb-2 text-[0.62rem] font-medium uppercase tracking-widest text-dourado sm:text-xs">{hero.especialidade}</p>
          <p className="max-w-[180px] text-[clamp(0.8rem,1.4vw,1.4rem)] font-light leading-snug text-claro sm:max-w-[240px] md:max-w-[280px]">{hero.frase}</p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ConsultButton />
        </FadeIn>
      </div>
    </section>
  );
}
