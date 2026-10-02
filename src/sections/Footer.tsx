import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL, rodape } from "../content";
import { InstagramIcon, WhatsAppIcon } from "../components/Icons";

export function Footer() {
  return (
    <footer id="rodape" className="relative z-40 bg-marinho-escuro px-5 pb-10 pt-12 sm:px-8 md:px-12 md:pb-12 md:pt-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 border-t border-claro/10 pt-10 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-6">
          <img src="/brand/logo-clara.png" alt="Dra. Camila Egypto, Psiquiatria" width={957} height={917} loading="lazy" className="h-24 w-auto md:h-28" />
          <div className="text-claro">
            <p className="font-serif text-2xl font-medium md:text-3xl">{rodape.nome}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-dourado">{rodape.especialidade}</p>
            <p className="mt-2 text-sm font-light text-claro/70">
              {rodape.registro}
              {/* TODO: inserir RQE antes da publicação */}
              {rodape.rqe && <> · RQE {rodape.rqe}</>}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm font-light text-claro/80">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-70">
            <InstagramIcon className="h-4 w-4 text-dourado" />
            {INSTAGRAM_HANDLE}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-70">
            <WhatsAppIcon className="h-4 w-4 text-dourado" />
            WhatsApp
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1600px] text-xs font-light text-claro/60">© {new Date().getFullYear()} {rodape.nome}</p>
    </footer>
  );
}
