import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useMedia";

const LenisContext = createContext<React.MutableRefObject<Lenis | null> | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

/** Rolagem suave até uma âncora (usa Lenis quando ativo). */
export function useScrollTo() {
  const ref = useContext(LenisContext);
  return (hash: string) => {
    const alvo = document.querySelector(hash);
    if (!alvo) return;
    if (ref?.current) ref.current.scrollTo(alvo as HTMLElement, { duration: 1.4 });
    else alvo.scrollIntoView({ behavior: "smooth" });
  };
}
