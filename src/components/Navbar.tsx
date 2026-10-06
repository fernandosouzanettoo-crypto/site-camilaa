import { motion } from "framer-motion";
import { INSTAGRAM_URL, QUALIFICACAO, WHATSAPP_URL, avaliacoes, nav, navInstagramLabel, navWhatsappLabel } from "../content";
import { useScrollTo } from "../hooks/useLenis";
import { EASE } from "./FadeIn";
import { InstagramIcon, WhatsAppLineIcon } from "./Icons";

const ICONE = "grid h-10 w-10 place-items-center rounded-full text-marinho transition-colors duration-200 hover:text-dourado";

/** Topo do Hero claro: logo azul à esquerda; links (desktop) e ícones à direita. */
export function Navbar() {
  const scrollTo = useScrollTo();
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0, ease: EASE }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 pt-4 sm:px-8 md:px-12 md:pt-6">
        <a href="#inicio" aria-label="Dra. Camila Egypto, início" onClick={(e) => { e.preventDefault(); scrollTo("#inicio"); }}>
          <img src="/brand/logo-original.png" alt={`Dra. Camila Egypto, ${QUALIFICACAO}`} width={957} height={917} className="h-16 w-auto sm:h-[4.5rem] md:h-20" />
        </a>

        <div className="flex items-center gap-6 lg:gap-10">
          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex lg:gap-12">
            {nav
              // O link de Avaliações só aparece quando a seção tem textos
              .filter((item) => item.href !== "#avaliacoes" || avaliacoes.textos.length > 0)
              .map((item) => (
              <a key={item.label} href={item.href} className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={navInstagramLabel} className={ICONE}>
              <InstagramIcon className="h-[22px] w-[22px]" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={navWhatsappLabel} className={ICONE}>
              <WhatsAppLineIcon className="h-[22px] w-[22px]" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
