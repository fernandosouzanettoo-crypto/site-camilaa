# Dra. Camila Egypto · Psiquiatria

Site de apresentação estático (HTML + CSS + JS, sem build). Para rodar localmente:

```bash
python3 -m http.server 8000   # e abra http://localhost:8000
```

## Estrutura

```
index.html
assets/
  css/style.css        estilos (cores do logo: marinho #152A45, bege #C5AD90 só em detalhes)
  js/main.js           animações, WhatsApp, menu, FAQ
  vendor/              GSAP 3.15 (+ ScrollTrigger, SplitText) e Lenis 1.3, servidos localmente
  fotos/               fotos originais
  fotos/web/           versões WebP (640, 960 e 1284 px) usadas no site
  logo/                logo oficial e favicons gerados a partir dele
  docs/                portfólio em PDF (fonte das informações)
```

## Animações

- **Lenis** (scroll suave, duração 1.2) integrado ao **ScrollTrigger**.
- **Hero:** loader com o logo; depois a foto revela com clip-path enquanto o scale vai de 1.15 a 1, o título sobe linha a linha por máscaras (SplitText) e "Psiquiatria", a frase e o botão entram em seguida.
- **Parallax em camadas no hero:** a foto, a moldura e o filete dourado se movem em velocidades diferentes. No desktop, também seguem o cursor (até ~14 px).
- **Títulos** revelados linha a linha, fotos com clip-path e parallax interno, manifesto que acende palavra por palavra, cartões empilhados com profundidade (CSS 3D) e foto que se expande até a tela cheia.
- Easing `expo.out` / `power3.out`. Sem WebGL.
- `prefers-reduced-motion` desliga tudo, e sem JavaScript o conteúdo aparece normalmente.

## Editar

- **WhatsApp:** `WHATSAPP` em `assets/js/main.js` e o número no rodapé do `index.html`.
- **Textos:** direto no `index.html`. Use só informações confirmadas (PDF ou cliente).
- **Fotos novas:** gere os WebP com
  `convert foto.jpeg -resize 960x -strip -quality 86 foto-960.webp` (repita para 640 e 1284).

## Pendências

- RQE de Psiquiatria (não consta no PDF).
- Modalidade de atendimento (presencial/online) e endereço, se houver.
