import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useIsMobile, useIsTouch, useReducedMotion } from "../hooks/useMedia";
import type { Variante } from "./RingsScene";

const RingsScene = lazy(() => import("./RingsScene"));

type Props = {
  variante: Variante;
  lado: "esquerda" | "direita";
  className?: string;
};

/** Objeto 3D carregado só quando a seção se aproxima, pausado fora da tela. */
export function LazyObject3D({ variante, lado, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [montado, setMontado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const touch = useIsTouch();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisivel(e.isIntersecting);
        if (e.isIntersecting) setMontado(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const x = reduced ? 0 : lado === "esquerda" ? -80 : 80;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {montado && (
        <Suspense fallback={null}>
          <RingsScene variante={variante} ativo={visivel} leve={mobile} estatico={reduced} seguirCursor={!touch && !reduced} />
        </Suspense>
      )}
    </motion.div>
  );
}
