# Dra. Camila Egypto · Psiquiatria

Site de apresentação em React 18 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + Lenis.
O briefing original está em [`BRIEFING-SITE.md`](BRIEFING-SITE.md), e o prompt que descreve a versão no ar (base para novas mudanças) está em [`PROMPT-SITE-ATUAL.md`](PROMPT-SITE-ATUAL.md).

## Rodar

```bash
npm install
npm run dev       # desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/ (o mesmo que a Vercel executa)
npm run preview   # serve o build localmente
```

## Deploy na Vercel

1. Em vercel.com → **Add New… → Project**, importe este repositório do GitHub.
2. A Vercel detecta o Vite sozinha (as configurações também estão em `vercel.json`): build `npm run build`, saída `dist`.
3. Depois do primeiro deploy, ative **Analytics** no painel do projeto (Web Analytics, sem cookies).

## Estrutura

```
public/
  images/           fotos WebP (-640 e -1280) e og-image.jpg (1200x630, gerada a partir de hero-camila)
  brand/            logos, monogramas e favicons do kit
  robots.txt
materiais/          kit original (fotos JPEG, logos, PDF). Não é publicado no site.
src/
  content.ts        TODOS os textos do site, links de WhatsApp e Instagram
  App.tsx           ordem das seções
  sections/         Hero, Sobre, QuandoProcurar, CuidadoCentrado, ComoFunciona, Duvidas, CtaFinal, Footer
  components/       FadeIn, Magnet, AnimatedText, ConsultButton, WhatsAppFloat, Navbar, Picture, Icons
  hooks/            useLenis (scroll suave) e useMedia (reduced-motion, touch, mobile)
```

## Editar

- **Textos e links:** só em `src/content.ts`.
- **RQE:** preencha `rodape.rqe` em `src/content.ts` (procure `TODO: inserir RQE antes da publicação`). Ele aparece no rodapé ao lado do CREMEC.
- **Cores:** `tailwind.config.js` (`marinho`, `dourado`, `off`, `claro`).

## Acessibilidade e desempenho

- `prefers-reduced-motion` desliga Lenis, parallax, faixas, Magnet e AnimatedText; ficam só fades simples.
- Em telas de toque, os efeitos de cursor e hover ficam desligados.
- Lighthouse mobile (build local): desempenho 91, acessibilidade 100, boas práticas 96, SEO 100.

Endereço publicado: https://dra-camila-egypto.vercel.app/ (se mudar para um domínio próprio, atualize `og:url`, `og:image`, `canonical` no `index.html`, o `robots.txt` e o `sitemap.xml`).
