import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { sobre } from "../content";
import { AnimatedText } from "../components/AnimatedText";
import { FadeIn } from "../components/FadeIn";
import { Picture } from "../components/Picture";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";

export function Sobre() {
  const fotoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: fotoRef, offset: ["start end", "end start"] });
  // Imagem com ~120% da altura deslizando dentro do container
  const amplitude = reduced ? 0 : mobile ? 4 : 8;
  const imgY = useTransform(scrollYProgress, [0, 1], [`-${amplitude}%`, `${amplitude}%`]);

  return (
    // Sobrepõe o Hero (claro) com cantos arredondados, como as demais seções que mudam de cor
    <section id="sobre" className="secao-sobreposta z-[5] overflow-clip bg-marinho-escuro py-24 sm:py-28 md:min-h-screen md:py-36">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        <FadeIn>
          <h2 className="hero-heading text-center font-serif font-medium uppercase leading-none text-[clamp(3rem,12vw,160px)]">{sobre.titulo}</h2>
        </FadeIn>

        <div className="mt-14 grid items-start gap-10 sm:mt-16 md:mt-24 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-24">
          {/* No desktop a foto fica fixa ao lado enquanto o texto (mais longo) rola */}
          <motion.div
            ref={fotoRef}
            className="mx-auto w-full max-w-[460px] md:sticky md:top-24"
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

          <div className="mx-auto flex max-w-xl flex-col gap-6 md:mx-0 md:gap-7">
            {/* Vários parágrafos: cada um acende enquanto entra na tela e fica aceso, para não ficar texto apagado na leitura */}
            {sobre.paragrafos.map((paragrafo) => (
              <AnimatedText key={paragrafo} text={paragrafo} offset={["start 0.95", "end 0.8"]} />
            ))}
            <FadeIn delay={0.1}>
              <p className="mt-2 font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] italic leading-snug text-dourado">{sobre.destaque}</p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
