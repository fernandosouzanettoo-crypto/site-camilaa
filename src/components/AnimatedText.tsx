import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "../hooks/useMedia";

type Props = {
  text: string;
  className?: string;
  /** Faixa do scroll em que as letras acendem (padrão do briefing: ["start 0.8", "end 0.2"]). */
  offset?: ["start 0.8", "end 0.2"] | ["start 0.85", "end 0.55"];
};

const ESTILO = "text-claro font-medium leading-relaxed text-[clamp(1rem,2vw,1.35rem)]";

/**
 * Revela o texto letra por letra conforme a rolagem (opacidade 0.2 → 1).
 * Cada letra tem um placeholder invisível e um span posicionado por cima; as opacidades
 * são escritas direto no DOM a partir de uma única inscrição no scroll (sem um componente
 * animado por letra), para manter o custo baixo no celular.
 */
export function AnimatedText({ text, className = "", offset = ["start 0.8", "end 0.2"] }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const letras = useRef<HTMLSpanElement[]>([]);
  const ultimo = useRef(-1);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const palavras = useMemo(() => text.split(" "), [text]);
  const total = text.length;

  const pintar = (progresso: number) => {
    const els = letras.current;
    // Cada letra ocupa uma fatia [i/total, (i+1)/total] do progresso
    const pos = progresso * total;
    const ativo = Math.floor(pos);
    if (ativo === ultimo.current && ativo >= 0 && ativo < total) {
      const el = els[ativo];
      if (el) el.style.opacity = String(0.2 + 0.8 * (pos - ativo));
      return;
    }
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const t = Math.min(1, Math.max(0, pos - i));
      el.style.opacity = String(0.2 + 0.8 * t);
    }
    ultimo.current = ativo;
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduced) pintar(v);
  });
  useEffect(() => {
    if (!reduced) pintar(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (reduced) return <p className={`${ESTILO} ${className}`}>{text}</p>;

  let indice = 0;
  return (
    <p ref={ref} aria-label={text} className={`${ESTILO} ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {palavras.map((palavra, p) => {
          const inicio = indice;
          indice += palavra.length + 1;
          return (
            <span key={p} className="inline-block whitespace-nowrap">
              {palavra.split("").map((c, i) => (
                <span key={i} className="relative">
                  <span className="invisible">{c}</span>
                  <span
                    ref={(el) => {
                      if (el) letras.current[inicio + i] = el;
                    }}
                    className="absolute left-0 top-0"
                    style={{ opacity: 0.2 }}
                  >
                    {c}
                  </span>
                </span>
              ))}
              {p < palavras.length - 1 && <span>&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </p>
  );
}
