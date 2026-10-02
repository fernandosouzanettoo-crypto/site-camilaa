import { useEffect, useState } from "react";
import { WHATSAPP_URL, whatsappFlutuante } from "../content";
import { WhatsAppIcon } from "./Icons";

/** Botão fixo nas cores da marca. Fica oculto no Hero e no rodapé para não cobrir botões. */
export function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const fim = document.getElementById("rodape");
    const cta = document.getElementById("contato");
    const estado = { hero: true, fim: false, cta: false };
    const atualizar = () => setVisivel(!estado.hero && !estado.fim && !estado.cta);
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.target === hero) estado.hero = e.isIntersecting;
        if (e.target === fim) estado.fim = e.isIntersecting;
        if (e.target === cta) estado.cta = e.intersectionRatio > 0.35;
      });
      atualizar();
    }, { threshold: [0, 0.35] });
    [hero, fim, cta].forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappFlutuante}
      tabIndex={visivel ? 0 : -1}
      className={`group fixed bottom-4 right-4 z-50 flex h-12 items-center overflow-hidden rounded-full bg-marinho text-off shadow-[0_14px_34px_-12px_rgba(0,0,0,0.6)] ring-1 ring-dourado/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-marinho-medio md:bottom-6 md:right-6 md:h-14 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center md:h-14 md:w-14">
        <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />
      </span>
      <span className="hidden max-w-0 whitespace-nowrap pr-0 text-xs font-medium uppercase tracking-widest opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[16rem] group-hover:pr-6 group-hover:opacity-100 md:inline">
        {whatsappFlutuante}
      </span>
    </a>
  );
}
