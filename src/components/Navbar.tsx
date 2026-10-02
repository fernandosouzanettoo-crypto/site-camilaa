import { motion } from "framer-motion";
import { nav, navWhatsappLabel, WHATSAPP_URL } from "../content";
import { useScrollTo } from "../hooks/useLenis";
import { EASE } from "./FadeIn";
import { WhatsAppIcon } from "./Icons";

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
          <img src="/brand/logo-clara.png" alt="Dra. Camila Egypto, Psiquiatria" width={957} height={917} className="h-16 w-auto sm:h-[4.5rem] md:h-20" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex lg:gap-12">
          {nav.map((item) =>
            item.externo ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="nav-link">
                {item.label}
              </a>
            ) : (
              <a key={item.label} href={item.href} className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={navWhatsappLabel}
          className="grid h-11 w-11 place-items-center rounded-full text-claro ring-1 ring-dourado/40 transition-opacity duration-200 hover:opacity-70 md:hidden"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
      </div>
    </motion.header>
  );
}
