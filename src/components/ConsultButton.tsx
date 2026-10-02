import { WHATSAPP_URL, cta } from "../content";
import { Magnet } from "./Magnet";

type Props = { label?: string; className?: string };

export function ConsultButton({ label = cta.botao, className = "" }: Props) {
  return (
    <Magnet padding={40} strength={6} className={`inline-block ${className}`}>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-6 py-3 min-[400px]:px-8 text-[0.72rem] font-medium uppercase tracking-widest text-off outline outline-1 outline-offset-[3px] outline-dourado transition-[outline-color] duration-500 sm:px-10 sm:py-3.5 sm:text-xs md:px-12 md:py-4 md:text-[0.8rem] focus-visible:outline-2"
        style={{ background: "linear-gradient(123deg, #0E1D31 0%, #1E3A5F 60%, #0E1D31 100%)" }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-[101%] rounded-full bg-dourado transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        />
        <span className="relative transition-colors duration-500 group-hover:text-marinho-escuro">{label}</span>
      </a>
    </Magnet>
  );
}
