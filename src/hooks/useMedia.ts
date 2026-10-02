import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [ok, setOk] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return ok;
}

/** Dispositivos sem mouse: desativa efeitos de cursor e hover. */
export const useIsTouch = () => useMediaQuery("(hover: none), (pointer: coarse)");
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
