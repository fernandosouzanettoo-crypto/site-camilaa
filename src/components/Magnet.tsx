import { useEffect, useRef, type ReactNode } from "react";
import { useIsTouch, useReducedMotion } from "../hooks/useMedia";

type Props = {
  children: ReactNode;
  /** Distância (px) a partir da borda em que o efeito começa. */
  padding?: number;
  /** Deslocamento = distância do centro / strength. */
  strength?: number;
  /** Deslocamento máximo (px) em cada eixo. */
  limite?: number;
  /** Entrada mais lenta, para elementos grandes como o retrato. */
  suave?: boolean;
  className?: string;
};

/** Segue o cursor quando ele se aproxima. Somente em desktop com mouse. */
export function Magnet({ children, padding = 150, strength = 3, limite = Infinity, suave = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const ativo = !touch && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || !ativo) return;
    let dentro = false;
    let raf = 0;
    const mover = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Mede sem o próprio deslocamento para não "fugir" do cursor
        const r = el.getBoundingClientRect();
        const atualX = Number(el.dataset.x || 0);
        const atualY = Number(el.dataset.y || 0);
        const left = r.left - atualX;
        const top = r.top - atualY;
        const cx = left + r.width / 2;
        const cy = top + r.height / 2;
        const perto =
          e.clientX > left - padding && e.clientX < left + r.width + padding &&
          e.clientY > top - padding && e.clientY < top + r.height + padding;
        if (perto) {
          const limitar = (v: number) => Math.max(-limite, Math.min(limite, v));
          const x = limitar((e.clientX - cx) / strength);
          const y = limitar((e.clientY - cy) / strength);
          el.style.transition = `transform ${suave ? "0.9s" : "0.3s"} ease-out`;
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          el.dataset.x = String(x);
          el.dataset.y = String(y);
          dentro = true;
        } else if (dentro) {
          el.style.transition = "transform 0.6s ease-in-out";
          el.style.transform = "translate3d(0, 0, 0)";
          el.dataset.x = "0";
          el.dataset.y = "0";
          dentro = false;
        }
      });
    };
    window.addEventListener("mousemove", mover, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", mover);
      el.style.transform = "";
    };
  }, [ativo, padding, strength, limite, suave]);

  return (
    <div ref={ref} className={className} style={{ willChange: ativo ? "transform" : undefined }}>
      {children}
    </div>
  );
}
