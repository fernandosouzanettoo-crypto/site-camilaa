# PROMPT — SITE DRA. CAMILA EGYPTO (VERSÃO ATUAL, EM PRODUÇÃO)

Este é o prompt que descreve **exatamente o site que está no ar** em https://dra-camila-egypto.vercel.app/.
Ele parte do `BRIEFING-SITE.md` original e já incorpora os ajustes feitos depois (veja "Histórico de ajustes" no fim).

**Como usar para pedir mudanças:** não refaça o site do zero. Parta do código atual deste repositório e altere só o que for pedido, mantendo tudo o que está descrito aqui. Ao concluir, atualize este arquivo (a seção afetada e o "Histórico de ajustes") para que ele continue descrevendo a versão no ar.

## 0. ESTADO DO REPOSITÓRIO
O kit `kit-site-camila.zip` já foi descompactado e removido. Os materiais originais continuam em `materiais/`:

```
BRIEFING-SITE.md                  ← este arquivo
materiais/
  fotos/original/                 ← 5 fotos originais (JPEG, 1284px de largura)
  fotos/webp/                     ← as mesmas fotos já otimizadas em WebP, larguras 640 e 1280
  logo/logo-original.png          ← logo oficial azul-marinho (fundos claros)
  logo/logo-clara.png             ← variação para fundos escuros (já gerada, aprovada)
  logo/monograma-original-512.png ← monograma "CE" azul (transparente)
  logo/monograma-clara-512.png    ← monograma "CE" claro (transparente)
  logo/favicon.ico, favicon-32.png, apple-touch-icon.png
  pdf/portfolio-dra-camila-egypto.pdf ← material profissional (imagem, sem texto selecionável)
```

Situação atual:
1. As fotos WebP estão em `public/images` (mais `og-image.jpg`, 1200x630) e as logos e favicons em `public/brand`. Use os JPEG de `materiais/fotos/original` só se precisar gerar outro tamanho.
2. O PDF NÃO está na pasta pública (ele contém preços que não devem ser publicados). Ele só existe em `materiais/pdf`.
3. Hospedagem: Vercel, projeto `dra-camila-egypto`, ligado ao GitHub. Todo push na branch `claude/novo-site-d40j9m` (a branch padrão do repositório) é publicado automaticamente em 1 a 2 minutos.
4. Antes de enviar mudanças: `npm run build` precisa passar (é o mesmo comando que a Vercel executa).

## 1. CONTEXTO
Site de apresentação profissional, voltado principalmente para quem chega pelo Instagram. Não é um portal médico. Deve transmitir profissionalismo, sofisticação, confiança, acolhimento e exclusividade: uma marca pessoal premium, com linguagem visual de portfólio moderno (tipografia gigante, seções sobrepostas, profundidade e 3D sutil).
Princípio central: MENOS INFORMAÇÃO, MAIS EXPERIÊNCIA.

## 2. STACK
React 18 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + Lenis (scroll suave) + three + @react-three/fiber + @react-three/drei + lucide-react.
Esta é a stack em uso; mantenha-a. Deploy na Vercel (configuração em `vercel.json`).
Use apenas Framer Motion para animações (não usar GSAP).

## 3. FOTOS
Estúdio, fundo cinza claro. Uso definido:
- `hero-camila` → blazer preto, sentada em banqueta → HERO
- `sobre-camila` → blazer branco, de perfil → SOBRE
- `atendimento-camila` → blazer preto, sentada → COMO FUNCIONA, card 01
- `atuacao-camila` → conjunto branco, sentada em cadeira de madeira → COMO FUNCIONA, card 02
- `contato-camila` → macacão preto, de costas olhando por cima do ombro → CTA FINAL

Use `<picture>`/`srcset` com as versões `-640.webp` e `-1280.webp`, `loading="lazy"` em todas exceto a do Hero (que deve ter `fetchpriority="high"`).
Não remova o fundo das fotos. Nunca use imagens da internet ou de terceiros.

## 4. CONTEÚDO
Todos os textos do site estão na seção 9 e foram transcritos do PDF. Use-os como estão, podendo apenas encurtar. O PDF serve só como conferência: NÃO é referência de layout, cores ou estrutura.
Não invente formação, especializações, localização, modalidade de atendimento, valores, credenciais ou depoimentos.
NÃO incluir preços nem planos, mesmo constando no PDF.

## 5. LOGO
Use as logos do kit sem recriar, distorcer ou aplicar efeitos.
- `logo-original.png` em fundos claros.
- `logo-clara.png` em fundos escuros.
- Favicon e apple-touch-icon: use os arquivos prontos do kit.

## 6. IDENTIDADE VISUAL
Cores (extraídas da logo):
- Azul-marinho da marca: #152A45
- Azul-marinho escuro (fundo das seções escuras): #0E1D31
- Dourado/bege da marca: #C4AC8F (apenas detalhes, nunca dominante)
- Off-white (fundo das seções claras): #F7F4EE
- Texto claro: #E6ECF2

Classe `.hero-heading`: texto em degradê com `background: linear-gradient(180deg, #6E8099 0%, #E6ECF2 100%)`, `-webkit-background-clip: text` e `-webkit-text-fill-color: transparent` (sobre fundo escuro).

Tipografia (Google Fonts, `font-display: swap`), coerente com os materiais da marca:
- Títulos: Cormorant Garamond (500–700).
- Textos: Montserrat (300–600).

Uso intensivo de `clamp()` para tipografia fluida. Wrapper principal com `overflowX: 'clip'`.

## 7. REFERÊNCIA DE NÍVEL
Referência de acabamento: https://shopmariamoura.com (analise HTML, JS e CSS apenas para entender o nível técnico; não copie textos, estrutura ou identidade).
Os efeitos das seções 8 e 10 são obrigatórios mesmo que a referência não possa ser analisada.

## 8. ESTRUTURA E EFEITOS
Ordem e fundos:
1. Hero (escuro) → 2. Sobre (escuro) → 3. Quando procurar (escuro) → 4. Cuidado centrado em você (claro) → 5. Como funciona (escuro) → 6. Dúvidas (claro) → 7. CTA final (escuro) → 8. Footer (escuro)

Seções sobrepostas: a partir da seção 4, cada seção que muda de cor tem `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`, é puxada para cima com `-mt-10 sm:-mt-12 md:-mt-14` e tem z-index maior que a anterior.
Cada seção é curta. Nada de blocos longos de texto.

### 8.1 HERO (h-screen)
- Navbar: `logo-clara.png` à esquerda e links "Sobre", "Como funciona", "Dúvidas", "Contato" (Contato abre o WhatsApp). Cor #E6ECF2, maiúsculas, tracking-wider, text-sm md:text-base. Hover: opacidade 70%, 200ms. No mobile, apenas a logo e um ícone de WhatsApp.
- Título: "Dra." pequeno acima e "Camila Egypto" gigante com `.hero-heading` em Cormorant Garamond, maiúsculas, ocupando a largura da tela (clamp/vw, sem quebrar palavras; no mobile pode ficar em duas linhas: "Camila" / "Egypto"). Container overflow-hidden.
- Retrato: `hero-camila` em moldura em arco (topo totalmente arredondado, borda fina #C4AC8F a 40% de opacidade), centralizado e sobreposto ao título (z-10), ancorado na base a partir de sm (no mobile, centralizado verticalmente). Largura `w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px]`. `object-cover` priorizando rosto e tronco.
  - Componente Magnet (versão suavizada): segue o mouse quando o cursor está a até 150px da borda, deslocamento = distância / 12, limitado a no máximo 18px em cada eixo (`<Magnet strength={12} limite={18} suave>`), entrada "transform 0.9s ease-out", saída "transform 0.6s ease-in-out", `willChange: 'transform'`. Somente desktop. O ConsultButton mantém o magnetismo leve dele (padding 40, strength 6).
  - Parallax no scroll: o retrato desce mais devagar que o título.
- Barra inferior (justify-between, items-end):
  - Esquerda: "PSIQUIATRIA" em #C4AC8F (pequeno, tracking-widest) e abaixo "Cuidar da mente é conectar histórias", cor #E6ECF2, font-light, `clamp(0.8rem, 1.4vw, 1.4rem)`, `max-w-[180px] sm:max-w-[240px] md:max-w-[280px]`.
  - Direita: ConsultButton.
- Entrada (FadeIn): navbar delay 0 / y -20; título delay 0.15 / y 40; texto delay 0.35 / y 20; botão delay 0.5 / y 20; retrato delay 0.6 / y 30.

### 8.2 SOBRE (min-h-screen)
- Título "Sobre" com `.hero-heading`, centralizado, `clamp(3rem, 12vw, 160px)`.
- Subtítulo em serif: "Um cuidado que começa pela escuta."
- Layout: `sobre-camila` à esquerda (desktop) ou acima (mobile), `rounded-[40px] md:rounded-[60px]`, reveal por clip-path e parallax interno (imagem ~120% da altura deslizando no container). Texto à direita.
- Texto com AnimatedText (letra por letra, ver seção 11).
- Objetos 3D (seção 10) nos cantos, atrás do conteúdo.

### 8.3 QUANDO PROCURAR UM PSIQUIATRA? (faixas em movimento)
- Título: "Quando procurar um psiquiatra?" (serif, grande, centralizado) e abaixo "Você não precisa esperar chegar ao seu limite para procurar ajuda."
- Duas faixas horizontais de TEXTO (não imagens) que se movem com o scroll: linha 1 para a direita, linha 2 para a esquerda. Offset = `(window.scrollY - topoDaSeção + window.innerHeight) * 0.3`; linha 1 `translateX(offset - 200)`, linha 2 `translateX(-(offset - 200))`. Conteúdo triplicado para não ter vazios. Listener de scroll passivo, `willChange: 'transform'`.
- Itens em Cormorant Garamond grande (`clamp(1.8rem, 5vw, 4.5rem)`), cor #E6ECF2 a 85%, separados por um pequeno losango ou ponto #C4AC8F.
- Fechamento centralizado abaixo: "Nem todo sofrimento significa um transtorno mental." em #C4AC8F e "Mas todo sofrimento que está limitando a sua vida merece ser compreendido." em #E6ECF2.

### 8.4 UM CUIDADO CENTRADO EM VOCÊ (fundo claro, sobreposta)
- Título "Um cuidado centrado em você" em #152A45, serif, centralizado, `clamp(2.5rem, 8vw, 120px)`, `mb-16 sm:mb-20 md:mb-28`.
- Lista vertical numerada (max-w-5xl, centralizada) com 3 itens:
  - número grande à esquerda (01, 02, 03) em serif, `clamp(3rem, 10vw, 140px)`, #152A45;
  - à direita, nome (maiúsculas, Montserrat, `clamp(1rem, 2.2vw, 2.1rem)`) e descrição (font-light, opacidade 0.6, `clamp(0.85rem, 1.6vw, 1.25rem)`);
  - linhas divisórias de 1px (#152A45 a 15%), `py-8 sm:py-10 md:py-12`;
  - FadeIn em sequência (delay i * 0.1);
  - desktop: no hover, o número fica #C4AC8F e a linha desliza x: 8px.

### 8.5 COMO FUNCIONA (fundo escuro, sobreposta)
- Título "Como funciona" com `.hero-heading`.
- 3 cards empilháveis (sticky stacking) com Framer Motion `useScroll` + `useTransform`:
  - cada card em container `h-[85vh]`, `sticky top-24 md:top-32`, deslocado `top: index * 28px`;
  - escala final = `1 - (totalCards - 1 - index) * 0.03`, diminuindo conforme o próximo card sobe;
  - `rounded-[40px] sm:rounded-[50px] md:rounded-[60px]`, borda 1px #C4AC8F a 40%, fundo #0E1D31, `p-5 sm:p-6 md:p-8`.
- Layout do card: número grande + título + texto curto de um lado; foto do outro (`rounded-[40px]`, object-cover). No mobile, foto acima do texto.
  - Card 01 → `atendimento-camila`
  - Card 02 → `atuacao-camila`
  - Card 03 → sem foto: frase em destaque, serif grande.

### 8.6 DÚVIDAS (fundo claro, sobreposta)
- Título "Dúvidas frequentes" em #152A45, serif.
- Accordion com as 5 perguntas da seção 9: todas fechadas, abertura animando a altura real (AnimatePresence), ícone "+" gira 45°, divisórias finas, acessível por teclado (`aria-expanded`).

### 8.7 CTA FINAL (fundo escuro, sobreposta)
- `contato-camila` em bloco grande, `rounded-[40px] md:rounded-[60px]`, scale de 1.1 para 1 durante o scroll, com overlay azul-marinho em degradê no lado do texto para garantir leitura.
- Sobre a foto: título com reveal por linhas, texto curto e ConsultButton.

### 8.8 FOOTER
Enxuto: `logo-clara.png`, "Dra. Camila Egypto", "Psiquiatria", "CREMEC 29104", Instagram e WhatsApp.
Abaixo, em texto pequeno (#E6ECF2 a 60%), o aviso de crise com os números clicáveis (`tel:192` e `tel:188`): "Em situação de crise ou risco, procure o pronto-socorro mais próximo ou ligue 192 (SAMU) ou 188 (CVV)." e o "© ano Dra. Camila Egypto" (no desktop, aviso à esquerda e © à direita).
Deixe um campo para o RQE oculto, com o comentário `// TODO: inserir RQE antes da publicação`. Não exiba número fictício.
Não incluir localização nem modalidade de atendimento.

## 9. TEXTOS (centralizar em `src/content.ts`)

**HERO**
- "Dra." / "Camila Egypto" / "PSIQUIATRIA" / "Cuidar da mente é conectar histórias"

**SOBRE**
- Subtítulo: "Um cuidado que começa pela escuta."
- Texto: "Atendimento psiquiátrico com escuta qualificada, precisão clínica e uma abordagem técnica, empática e individualizada. Cada pessoa possui uma história, um contexto e necessidades diferentes. Antes de pensar em um diagnóstico, é preciso compreender a pessoa que está diante de nós."

**QUANDO PROCURAR (itens das faixas)**
- Linha 1: "Depressão e transtorno bipolar" · "Ansiedade, pânico, fobias e TOC" · "TDAH em adultos" · "Insônia e problemas de sono"
- Linha 2: "Transtornos psicóticos" · "Uso de álcool e outras substâncias" · "Transtornos de personalidade" · "Sofrimento psíquico no dia a dia"

**CUIDADO CENTRADO EM VOCÊ**
- 01 CIÊNCIA — "Condutas orientadas pelas melhores evidências científicas disponíveis."
- 02 INDIVIDUALIDADE — "Diagnóstico e tratamento considerando sua história, necessidades, preferências e contexto de vida."
- 03 HUMANIZAÇÃO — "Um espaço de escuta sem julgamentos, onde você participa das decisões sobre o seu tratamento."

**COMO FUNCIONA**
- 01 A consulta — "Um espaço de investigação, escuta e construção conjunta do cuidado. Conversamos sobre sua história, saúde física e mental, sono, rotina, relacionamentos e trabalho."
- 02 O plano de cuidado — "A partir da avaliação, discutimos juntos as possibilidades: psicoeducação, mudanças de hábitos, psicoterapia, encaminhamentos e, quando houver indicação clínica, tratamento medicamentoso."
- 03 O acompanhamento — destaque: "Saúde mental é processo, não apenas uma consulta." Texto: "Acompanhar a evolução permite ajustar o tratamento, prevenir recaídas e construir um cuidado sustentável ao longo do tempo."

**DÚVIDAS FREQUENTES**
1. "Preciso estar em uma situação grave para procurar um psiquiatra?" — "Não. Quanto mais cedo identificamos um sofrimento que está causando prejuízo, mais cedo podemos compreender o que está acontecendo e discutir estratégias de cuidado."
2. "Vou precisar tomar medicação?" — "Não necessariamente. A indicação depende da avaliação clínica e é discutida individualmente. A decisão terapêutica deve ser segura, fundamentada e compartilhada."
3. "Uma consulta é suficiente?" — "Depende do caso. Algumas situações podem ser esclarecidas em uma consulta; outras exigem acompanhamento para avaliação diagnóstica, ajuste terapêutico e monitoramento da evolução."
4. "Psiquiatra e psicólogo fazem a mesma coisa?" — "Não. São atuações diferentes e frequentemente complementares. Quando houver indicação, o acompanhamento conjunto pode fazer parte do plano terapêutico."
5. "Você emite laudos, relatórios e atestados?" — "Documentos médicos são emitidos quando existe indicação clínica e respaldo técnico. A necessidade é avaliada individualmente, por isso a consulta não implica emissão automática de documentos."

**RODAPÉ**
- "Dra. Camila Egypto" / "Psiquiatria" / "CREMEC 29104" / RQE (vazio até ser informado)
- Aviso: "Em situação de crise ou risco, procure o pronto-socorro mais próximo ou ligue" + "192 (SAMU)" + "ou" + "188 (CVV)."

**CTA FINAL**
- Título: "Cuidar da saúde mental é um processo."
- Texto: "Você não precisa esperar o sofrimento se tornar insuportável para começar a cuidar da sua saúde mental."
- Botão: "Marcar consulta"

Não acrescente textos além destes, exceto rótulos curtos de interface.

## 10. OBJETOS 3D (React Three Fiber)
Conceito: "conectar histórias". Nada de objetos aleatórios.
- Peça principal: dois anéis (torus) entrelaçados; mais uma ou duas esferas pequenas.
- Materiais: vidro azulado (MeshTransmissionMaterial ou MeshPhysicalMaterial com transmission) e dourado acetinado #C4AC8F (metalness alto, roughness ~0.3). Iluminação suave com Environment discreto. Sem neon.
- Movimento: rotação lenta, flutuação suave (Float do drei) e leve parallax com o cursor (desktop).
- Entrada: os objetos deslizam das laterais (x ±80, 0.9s) ao entrar na seção.
- Onde: cantos da seção Sobre. Desktop: anéis no canto superior direito e esferas no canto inferior esquerdo. Mobile: só os anéis, no canto inferior direito (para não cobrir o título). O anel opcional no Hero NÃO foi usado (atrasaria o carregamento da primeira tela).
- O canvas usa fundo #0E1D31 (igual ao da seção) para o vidro com transmission não renderizar preto.
- Performance obrigatória:
  - Canvas com React.lazy, renderizado só quando a seção está visível (pausar fora da tela);
  - dpr máximo 1.5;
  - mobile: apenas um objeto, sem transmission;
  - prefers-reduced-motion: objetos estáticos.

## 11. COMPONENTES REUTILIZÁVEIS
- **FadeIn**: wrapper Framer Motion com `whileInView`, viewport `{ once: true, margin: "50px", amount: 0 }`. Props: delay, duration (padrão 0.7), x (padrão 0), y (padrão 30). Easing `[0.25, 0.1, 0.25, 1]`.
- **Magnet**: efeito magnético descrito no Hero.
- **AnimatedText**: revelação letra por letra guiada pelo scroll; cada caractere vai de opacity 0.2 a 1 (`useScroll` no parágrafo, offset `['start 0.8', 'end 0.2']`), com placeholder invisível + span animado posicionado. Cor #E6ECF2, font-medium, leading-relaxed, `clamp(1rem, 2vw, 1.35rem)`. Incluir `aria-label` com o texto completo.
- **ConsultButton**: pílula (rounded-full) com degradê sutil `linear-gradient(123deg, #0E1D31 0%, #1E3A5F 60%, #0E1D31 100%)`, outline 1px #C4AC8F com outline-offset 3px, texto #F7F4EE, maiúsculas, tracking-widest, `px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4`. Hover: preenchimento #C4AC8F deslizando (texto passa a #0E1D31) + magnetismo leve (desktop). Label: "Marcar consulta".

## 12. MOVIMENTO GLOBAL
- Lenis em todo o site (duration ~1.2).
- prefers-reduced-motion: desativar Lenis, parallax, faixas em movimento, Magnet, AnimatedText (texto em opacidade total) e animação 3D; manter apenas fades simples.
- Touch: desativar efeitos de cursor/hover.
- Mobile: parallax com intensidade ~50%, 60fps, animar apenas transform e opacity.
- Discreto e premium: o usuário deve sentir a profundidade, não pensar "isso tem um efeito".

## 13. WHATSAPP
Todos os botões de consulta apontam para:
https://wa.me/5585991034586?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Camila%20Egypto.

Abrir em nova aba.
Botão flutuante fixo no canto inferior direito: pequeno, elegante, nas cores da marca (NÃO o verde genérico). Desktop: no hover expande com "Agende seu atendimento". Mobile: só o ícone, sem cobrir conteúdo, botões ou footer. `aria-label` obrigatório.

## 14. INSTAGRAM
@camilaegypto.psiquiatria → https://instagram.com/camilaegypto.psiquiatria
Discreto, no footer. Sem feed.

## 15. IMPLEMENTAÇÃO
- Código limpo, componentes reutilizáveis, HTML semântico, `lang="pt-BR"`.
- SEO: title "Dra. Camila Egypto | Psiquiatria", meta description baseada no texto do Sobre, Open Graph com imagem de compartilhamento 1200x630 gerada a partir de `hero-camila`, favicons do kit.
- Acessibilidade: contraste adequado, alt nas fotos, navegação por teclado.
- Performance: Lighthouse mobile acima de 85; 3D com carregamento preguiçoso.
- Vercel Web Analytics (`@vercel/analytics`), sem cookies.
- Responsivo mobile-first para celular, tablet, notebook e desktop.

## 15.1 PUBLICAÇÃO E COMPARTILHAMENTO
- Endereço atual: https://dra-camila-egypto.vercel.app/
- `og:url`, `og:image`, `twitter:image` e `canonical` usam esse endereço completo; há `robots.txt` e `sitemap.xml` em `public/`.
- Se passar a usar domínio próprio, atualize esses endereços no `index.html`, no `robots.txt` e no `sitemap.xml`.
- Vercel Web Analytics: componente `<Analytics />` só no build de produção.

## 16. NÃO QUERO
Preços, planos, valores; textos além dos da seção 9; depoimentos, números ou credenciais inventados; imagens, GIFs ou objetos 3D de terceiros; fundo removido das fotos; cores neon ou roxas; visual de games ou de clínica genérica; excesso de dourado; animações exageradas; PDF publicado no site.

## 17. RESULTADO ESPERADO
Ao abrir o site, a sensação deve ser: "essa é uma médica com uma presença profissional sofisticada e muito bem construída".
Tipografia gigante + fotografia forte + seções sobrepostas + 3D com significado + microinterações. Preciso, elegante e memorável.

## 18. PROCESSO DE TRABALHO (PARA MUDANÇAS)
- Leia este arquivo e o código atual antes de alterar qualquer coisa.
- Altere só o que foi pedido; não substitua nenhum efeito por uma versão mais simples sem avisar e justificar.
- Textos novos ou alterados vão em `src/content.ts`. Continue sem inventar dados (formação, valores, depoimentos etc.).
- Rode `npm run build`, verifique erros no console e teste no celular (390px) e no desktop antes de enviar.
- Depois de publicar, atualize este arquivo e o "Histórico de ajustes".

## 19. CHECKLIST (ESTADO ATUAL: TUDO FEITO, EXCETO O RQE)
Mantenha todos os itens válidos a cada mudança:
- [x] Kit descompactado; imagens, logos e favicons na pasta pública; PDF fora dela
- [x] Stack conforme seção 2, sem GSAP
- [x] Hero: título gigante em degradê, retrato em arco com Magnet e parallax, entrada em sequência
- [x] Sobre: AnimatedText, foto com clip-path e parallax interno
- [x] Objetos 3D: anéis entrelaçados, lazy load, versão leve no mobile, reduced-motion
- [x] Quando procurar: duas faixas de texto em sentidos opostos guiadas pelo scroll
- [x] Cuidado centrado: lista numerada com stagger e hover
- [x] Como funciona: 3 cards sticky com escala
- [x] Seções sobrepostas com cantos arredondados
- [x] FAQ com as 5 perguntas, animado e acessível
- [x] CTA com scale no scroll
- [x] ConsultButton e WhatsApp flutuante
- [x] Lenis, prefers-reduced-motion e touch tratados
- [x] Todos os textos em src/content.ts
- [x] Sem preços; CREMEC 29104 no footer; aviso SAMU 192 / CVV 188 no footer
- [ ] RQE: pendente (preencher `rodape.rqe` em `src/content.ts` quando a Dra. Camila informar)
- [x] Lighthouse mobile acima de 85 (último: desempenho 94, acessibilidade 100, boas práticas 96, SEO 100)
- [x] kit-site-camila.zip removido do repositório


## HISTÓRICO DE AJUSTES (depois do briefing original)
1. **Redesign inicial** seguindo o `BRIEFING-SITE.md` (React + Vite + Framer Motion + 3D).
2. **Desempenho:** o AnimatedText passou a atualizar as letras direto no DOM (uma única inscrição no scroll, em vez de um componente animado por letra), o que levou o Lighthouse mobile de 66 para 94. Mesmo efeito visual.
3. **Revelações:** a foto do Sobre e o título do CTA usam um wrapper externo que dispara a animação (um elemento totalmente recortado por clip-path ou máscara não é detectado como visível).
4. **Aviso de crise** (SAMU 192 / CVV 188) adicionado ao rodapé, a pedido do cliente.
5. **Magnet do retrato suavizado:** de distância/3 (até ~120px) para distância/12, com limite de 18px.
6. **Publicação** na Vercel em https://dra-camila-egypto.vercel.app/, com metatags de compartilhamento usando o endereço completo e `sitemap.xml`.

### Pendências
- RQE de Psiquiatria.
- Feedback da Dra. Camila (o site foi enviado para ela analisar).
- Opcional: domínio próprio; avaliar hospedagem com uso comercial permitido (Vercel Pro, Cloudflare Pages ou Netlify).
