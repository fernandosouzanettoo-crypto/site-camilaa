import { Analytics } from "@vercel/analytics/react";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { LenisProvider } from "./hooks/useLenis";
import { Avaliacoes } from "./sections/Avaliacoes";
import { ComoFunciona } from "./sections/ComoFunciona";
import { CtaFinal } from "./sections/CtaFinal";
import { CuidadoCentrado } from "./sections/CuidadoCentrado";
import { Duvidas } from "./sections/Duvidas";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { QuandoProcurar } from "./sections/QuandoProcurar";
import { Sobre } from "./sections/Sobre";

export default function App() {
  return (
    <LenisProvider>
      <div className="relative bg-marinho-escuro font-sans antialiased" style={{ overflowX: "clip" }}>
        <main>
          <Hero />
          <Sobre />
          <QuandoProcurar />
          <CuidadoCentrado />
          <ComoFunciona />
          <Avaliacoes />
          <Duvidas />
          <CtaFinal />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
      {import.meta.env.PROD && <Analytics />}
    </LenisProvider>
  );
}
