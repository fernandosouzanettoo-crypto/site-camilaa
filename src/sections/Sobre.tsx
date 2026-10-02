import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { sobre } from "../content";
import { AnimatedText } from "../components/AnimatedText";
import { FadeIn } from "../components/FadeIn";
import { Picture } from "../components/Picture";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";
import { LazyObject3D } from "../three/LazyObject3D";

export function Sobre() {
  const fotoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: fotoRef, offset: ["start end", "end start"] });
  // Imagem com ~120% da altura deslizando dentro do container
  const amplitude = reduced ? 0 : mobile ? 4 : 8;
  const imgY = useTransform(scrollYProgress, [0, 1], [`-${amplitude}%`, `${amplitude}%`]);

  return (
    <section id="sobre" className="relative overflow-hidden bg-marinho-escuro pb-56 pt-24 sm:pb-64 sm:pt-28 md:min-h-screen md:py-36">
      {/* Objetos 3D nos cantos, atrás do conteúdo */}
      <LazyObject3D variante="aneis" lado="direita" className="absolute -right-12 bottom-0 z-0 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:-right-6 md:bottom-auto md:top-10 md:h-[420px] md:w-[420px]" />
      {!mobile && (
        <LazyObject3D variante="esferas" lado="esquerda" className="absolute -left-10 bottom-4 z-0 h-[300px] w-[300px] lg:h-[360px] lg:w-[360px]" />
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        <FadeIn>
          <h2 className="hero-heading text-center font-serif font-medium uppercase leading-none text-[clamp(3rem,12vw,160px)]">{sobre.titulo}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-center font-serif text-[clamp(1.4rem,3vw,2.4rem)] italic text-claro/90 md:mt-6">{sobre.subtitulo}</p>
        </FadeIn>

        <div className="mt-14 grid items-center gap-10 sm:mt-16 md:mt-24 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-24">
          <motion.div
            ref={fotoRef}
            className="mx-auto w-full max-w-[460px]"
            initial="oculto"
            whileInView="visivel"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] bg-[#d9d9da] md:rounded-[60px]"
              variants={{
                oculto: { clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
                visivel: { clipPath: "inset(0% 0% 0% 0%)" },
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={{ y: imgY }}>
                <Picture
                  nome="sobre-camila"
                  alt="Dra. Camila Egypto de perfil, com blazer branco"
                  sizes="(min-width: 768px) 460px, 90vw"
                  largura={1280}
                  altura={1923}
                  className="h-full w-full object-cover object-[50%_20%]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="mx-auto max-w-xl md:mx-0">
            <AnimatedText text={sobre.texto} />
          </div>
        </div>
      </div>
    </section>
  );
}
