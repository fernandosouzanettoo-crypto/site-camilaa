import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { QUALIFICACAO, hero } from "../content";
import { ConsultButton } from "../components/ConsultButton";
import { FadeIn } from "../components/FadeIn";
import { Navbar } from "../components/Navbar";
import { Picture } from "../components/Picture";
import { useIsMobile, useReducedMotion } from "../hooks/useMedia";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const INICIO_TITULO = 0.35; // o título começa enquanto a foto ainda está entrando
const STAGGER = 0.06;

// Borda da foto que se dissolve no fundo: à esquerda no desktop, embaixo no celular
const MASCARA_DESKTOP = "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 18%, #000 42%)";
const MASCARA_MOBILE = "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.55) 78%, transparent 100%)";

function Titulo() {
  const reduced = useReducedMotion();
  const palavras = hero.titulo.split(" ");
  return (
    <h1
      aria-label={hero.titulo}
      className="font-serif font-medium leading-tight text-marinho text-[clamp(2.4rem,5.5vw,5.5rem)]"
    >
      {palavras.map((palavra, i) => {
        const limpa = palavra.replace(/[.,!?;:]/g, "");
        const destaque = limpa.toLowerCase() === hero.destaque.toLowerCase();
        return (
          // Cada palavra sobe de dentro de uma máscara (overflow hidden)
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${destaque ? "text-dourado" : ""}`}
              initial={reduced ? { opacity: 0 } : { y: "110%" }}
              animate={reduced ? { opacity: 1 } : { y: "0%" }}
              transition={{ duration: 1, delay: INICIO_TITULO + i * STAGGER, ease: EXPO_OUT }}
            >
              {palavra}
            </motion.span>
            {i < palavras.length - 1 && " "}
          </span>
        );
      })}
    </h1>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // A foto desce mais devagar que o texto (no celular, metade da intensidade)
  const intensidade = reduced ? 0 : mobile ? 0.5 : 1;
  const fotoY = useTransform(scrollYProgress, [0, 1], [0, 160 * intensidade]);

  // Subtítulo e botão entram depois da última palavra do título
  const fimTitulo = INICIO_TITULO + hero.titulo.split(" ").length * STAGGER;

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative z-0 flex min-h-[100svh] flex-col overflow-hidden bg-off md:block md:h-[100svh] md:min-h-[620px]"
    >
      <Navbar />

      {/* Foto: metade direita no desktop, topo no celular, sem moldura */}
      <motion.div
        style={{ y: fotoY, WebkitMaskImage: mobile ? MASCARA_MOBILE : MASCARA_DESKTOP, maskImage: mobile ? MASCARA_MOBILE : MASCARA_DESKTOP }}
        className="relative h-[55svh] w-full shrink-0 md:absolute md:inset-y-0 md:right-0 md:h-full md:w-1/2"
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: reduced ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EXPO_OUT }}
        >
          <Picture
            nome="hero-camila-branco"
            alt={`Dra. Camila Egypto (${QUALIFICACAO}), de blazer branco, olhando por cima do ombro`}
            sizes="(min-width: 768px) 50vw, 100vw"
            prioridade
            largura={1280}
            altura={1282}
            // Foto já próxima do rosto: sem zoom; o enquadramento prioriza rosto e tronco
            className="h-full w-full object-cover object-[50%_20%] md:object-[45%_30%]"
          />
        </motion.div>
      </motion.div>

      {/* Texto: à esquerda, alinhado ao centro-baixo no desktop; abaixo da foto no celular */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 px-5 pb-12 sm:px-8 md:h-full md:items-end md:px-12 md:pb-[14vh]">
        <div className="-mt-6 w-full md:mt-0 md:w-1/2 md:max-w-[720px] md:pr-8">
          <Titulo />
          <FadeIn delay={fimTitulo - 0.1} y={16}>
            <p className="mt-5 font-light text-marinho/70 text-[clamp(1rem,1.6vw,1.4rem)] md:mt-7">{hero.subtitulo}</p>
          </FadeIn>
          <FadeIn delay={fimTitulo + 0.05} y={16} className="mt-7 md:mt-10">
            <ConsultButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
