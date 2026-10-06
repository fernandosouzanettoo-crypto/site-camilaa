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
Site de apresentação profissional, voltado principalmente para quem chega pelo Instagram. Não é um portal médico. Deve transmitir profissionalismo, sofisticação, confiança, acolhimento e exclusividade: uma marca pessoal premium, com linguagem visual de portfólio moderno (tipografia editorial, seções sobrepostas e profundidade sutil, sem 3D).
Princípio central: MENOS INFORMAÇÃO, MAIS EXPERIÊNCIA.

## 2. STACK
React 18 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + Lenis (scroll suave) + lucide-react. (three / React Three Fiber foram removidos.)
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
1. Hero (claro, off-white) → 2. Sobre mim (escuro, sobreposto ao Hero) → 3. Quando procurar (escuro) → 4. Cuidado centrado em você (claro) → 5. Como funciona (escuro) → 5.1 Avaliações "O que dizem os pacientes" (claro, #avaliacoes) → 6. Dúvidas (claro) → 7. CTA final (escuro) → 8. Footer (escuro)

Seções sobrepostas: a partir da seção 2 (Sobre mim, que sobe sobre o Hero claro), cada seção que muda de cor tem `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`, é puxada para cima com `-mt-10 sm:-mt-12 md:-mt-14` e tem z-index maior que a anterior.
Cada seção é curta. Nada de blocos longos de texto.

### 8.1 HERO (h-screen) — layout "claro e editorial"
- Fundo off-white #F7F4EE.
- Navbar: `logo-original.png` (azul) à esquerda. À direita, ícones de Instagram e WhatsApp em traço fino (#152A45, hover #C4AC8F, `aria-label`s "Instagram da Dra. Camila Egypto" e "Agendar pelo WhatsApp"). No desktop, os links "Sobre", "Como funciona", "Avaliações", "Dúvidas" (maiúsculas, tracking-wider, #152A45, hover #C4AC8F) ficam ao lado dos ícones. No mobile: logo + os dois ícones. Entrada: fade com y -20.
- Foto: `hero-camila-branco` (blazer branco, olhando por cima do ombro; escolhida pela cliente) ocupando a metade direita (desktop), altura total, sem moldura, `object-cover` priorizando rosto e tronco. A borda esquerda se dissolve no fundo com `mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.55) 18%, #000 42%)`, sem linha de corte. `fetchpriority="high"`, preload no `index.html` com `imagesizes="(min-width: 768px) 50vw, 100vw"`. Original em `materiais/fotos/original/hero-camila-branco.jpeg` (1717×2576), WebP 640 e 1280 (1280×1920).
- Texto à esquerda, alinhado ao centro-baixo (pb ~14vh):
  - Título em Cormorant Garamond, #152A45, `clamp(2.4rem, 5.5vw, 5.5rem)`, leading-tight: "Você não precisa esperar chegar ao seu limite para procurar ajuda.", com a palavra "limite" em #C4AC8F.
  - Subtítulo em Montserrat font-light, #152A45 a 70%, `clamp(1rem, 1.6vw, 1.4rem)`: "Cuidar da mente é conectar histórias."
  - ConsultButton abaixo.
- Mobile: foto em cima (55svh), aproximada (scale 1.45, origem no rosto) para priorizar rosto e tronco, dissolvendo na parte inferior com mask-image vertical; título (4 linhas em 390px), subtítulo e botão abaixo.
- Entrada: foto com fade + scale 1.08 → 1 (1.6s, expo.out); palavras do título sobem uma a uma de dentro de uma máscara (início 0.35s, stagger 0.06s); subtítulo e botão com fade + leve subida logo após a última palavra.
- Parallax: a foto desce mais devagar que o texto no scroll (desktop; 50% no mobile).
- Não há mais título gigante com `.hero-heading`, moldura em arco nem Magnet no retrato.

### 8.2 SOBRE MIM (min-h-screen, sobreposto ao Hero)
- Seção escura com cantos superiores arredondados (`secao-sobreposta`), sobrepondo o Hero.
- Título "Sobre mim" com `.hero-heading`, centralizado, maiúsculas, `clamp(3rem, 12vw, 160px)`. Sem subtítulo.
- Layout: `sobre-camila` à esquerda (desktop) ou acima (mobile), `rounded-[40px] md:rounded-[60px]`, reveal por clip-path e parallax interno (imagem ~120% da altura deslizando no container). Texto à direita.
- No desktop a foto fica fixa (`sticky top-24`) enquanto o texto, mais longo, rola. Por isso a seção usa `overflow-clip` (e não `overflow-hidden`, que impediria o sticky).
- Texto em 4 parágrafos (seção 9), cada um com AnimatedText (letra por letra, ver seção 11), faixa de scroll `["start 0.95", "end 0.8"]`. O progresso só avança: depois de acesos, os parágrafos ficam com opacidade total (não apagam ao rolar para cima).
- Frase final em destaque, fora do AnimatedText: Cormorant Garamond itálico, #C4AC8F, `clamp(1.5rem, 2.6vw, 2.2rem)`.

### 8.3 QUANDO PROCURAR UM PSIQUIATRA? (faixas em movimento)
- Título: "Quando procurar atendimento?" (serif, grande, centralizado). Sem subtítulo.
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

### 8.4.1 ALGARISMOS
Todos os números grandes (01/02/03 do "Cuidado centrado", do "Como funciona" e o contador das avaliações) usam a classe `.num-lining` (`font-variant-numeric: lining-nums; font-feature-settings: "lnum" 1`), porque no Cormorant Garamond o padrão são algarismos de estilo antigo ("01" parecia "OI").

### 8.5 COMO FUNCIONA (fundo escuro, sobreposta)
- Título "Como funciona" com `.hero-heading`.
- 3 cards empilháveis (sticky stacking) com Framer Motion `useScroll` + `useTransform`:
  - cada card em container `h-[85vh]`, `sticky top-24 md:top-32`, deslocado `top: index * 28px`;
  - escala final = `1 - (totalCards - 1 - index) * 0.03`, diminuindo conforme o próximo card sobe;
  - `rounded-[40px] sm:rounded-[50px] md:rounded-[60px]`, borda 1px #C4AC8F a 40%, fundo #0E1D31, `p-5 sm:p-6 md:p-8`.
- Layout do card: número grande + título + texto curto de um lado; foto do outro (`rounded-[40px]`, object-cover). No mobile, foto acima do texto.
  - Card 01 → `atendimento-camila`
  - Card 02 → `atuacao-camila`
  - Card 03 → `hero-camila` (blazer preto, na banqueta; antiga foto da entrada), com a frase em destaque um pouco menor (`clamp(1.5rem, 3vw, 2.8rem)`).

- Mobile (abaixo de md): o card tem a altura do conteúdo (sem `h-[85vh]` nem altura fixa), foto com 240px (300px em sm), espaçamento de 24px entre cards; mantém o sticky e a escala. Desktop sem mudanças.

### 8.5.1 AVALIAÇÕES (fundo claro, sobreposta, #avaliacoes)
- Entre "Como funciona" e "Dúvidas". Título "O que dizem os pacientes" (o link da navbar continua "Avaliações").
- Fundo off-white #F7F4EE. Pilha de cartões brancos (o da frente e dois atrás, deslocados e menores), altura 340px (os 9 textos cabem até em 320px de largura). Cartão: aspas grandes (5.5–6.5rem) em #C4AC8F, texto em Cormorant Garamond #152A45, rótulo "Paciente" em #152A45 a 70% com um filete dourado antes (o rótulo em dourado sobre branco não passava no contraste AA). Sem estrelas, notas, nomes ou iniciais.
- Interações: arrastar o cartão da frente (limiar 90px ou velocidade), setas anterior/próxima (aria-labels), contador "3 / 9" (`aria-live`, algarismos alinhados), teclado ← → com a pilha focada.
- Autoplay de 6s, apenas com a seção visível, e que para depois da primeira interação. Com prefers-reduced-motion: sem autoplay, sem arrastar e trocas sem animação.
- Os cartões aparecem já no primeiro render (sem estado inicial invisível).
- Os textos ficam em `avaliacoes.textos` (`src/content.ts`), na ordem indicada pela cliente (seção 9). Se a lista ficar vazia, a seção e o link da navbar deixam de aparecer.

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

**QUALIFICAÇÃO**
- Constante única `QUALIFICACAO` em `src/content.ts`, usada em todo lugar onde "Psiquiatria" aparece como qualificação: rodapé, textos alternativos do logo e da foto do Hero, `<title>`, `og:title` e `og:image:alt` (no `index.html` via placeholder `%QUALIFICACAO%`, substituído no build por um plugin no `vite.config.ts`).
- Valor atual: `"Psiquiatria"`. Alternativa pendente de confirmação com o CREMEC: `"Médica · Residente em Psiquiatria (UFC)"` (comentada no código). Para trocar, basta mudar a constante.

**HERO**
- Título: "Você não precisa esperar chegar ao seu limite para procurar ajuda." (destaque em "limite")
- Subtítulo: "Cuidar da mente é conectar histórias."

**SOBRE MIM**
- Título: "Sobre mim"
- Parágrafos:
  1. "Sou médica, paraibana, e atualmente moro em Fortaleza, onde faço Residência Médica em Psiquiatria na Universidade Federal do Ceará."
  2. "Escolhi a Psiquiatria por acreditar que, por trás de cada sintoma, existe uma história que precisa ser compreendida. É a partir dessa visão que conduzo cada atendimento: com escuta atenta, acolhimento e respeito à individualidade de cada pessoa."
  3. "Para mim, cuidar da saúde mental vai além de estabelecer um diagnóstico ou prescrever uma medicação. É entender como aquela pessoa vive, o que tem enfrentado, suas relações, sua rotina e o impacto de tudo isso em seu bem-estar."
  4. "Busco unir empatia e ciência, com as melhores evidências disponíveis, para construir junto com cada paciente um tratamento individualizado, seguro e possível para a sua realidade."
- Destaque final: "Porque cuidar da mente também é compreender histórias."

**QUANDO PROCURAR**
- Título: "Quando procurar atendimento?" (sem subtítulo)
- Linha 1: "Quando a tristeza não passa" · "Quando a ansiedade limita a rotina" · "Quando o sono não vem" · "Quando a concentração falha"
- Linha 2: "Quando o trabalho pesa demais" · "Quando os relacionamentos sofrem" · "Quando o uso de álcool preocupa" · "Quando algo não parece bem"
- Fechamento mantido.

**CUIDADO CENTRADO EM VOCÊ**
- 01 CIÊNCIA — "Condutas orientadas pelas melhores evidências científicas disponíveis."
- 02 INDIVIDUALIDADE — "Diagnóstico e tratamento considerando sua história, necessidades, preferências e contexto de vida."
- 03 HUMANIZAÇÃO — "Um espaço de escuta sem julgamentos, onde você participa das decisões sobre o seu tratamento."

**COMO FUNCIONA**
- 01 A consulta — "Um espaço de investigação, escuta e construção conjunta do cuidado. Conversamos sobre sua história, saúde física e mental, sono, rotina, relacionamentos e trabalho."
- 02 O plano de cuidado — "A partir da avaliação, discutimos juntos as possibilidades: psicoeducação, mudanças de hábitos, psicoterapia, encaminhamentos e, quando houver indicação clínica, tratamento medicamentoso."
- 03 O acompanhamento — destaque: "Saúde mental é processo, não apenas uma consulta." Texto: "Acompanhar a evolução permite ajustar o tratamento, prevenir recaídas e construir um cuidado sustentável ao longo do tempo."

**AVALIAÇÕES** (avaliações reais, enviadas pela cliente; usar exatamente estes, nesta ordem)
- Título: "O que dizem os pacientes" · rótulo de cada cartão: "Paciente"
  1. "Médica muito profissional, atenciosa e empática, conduzindo o atendimento com acolhimento, respeito e cuidado."
  2. "Nunca havia feito psiquiatra, mas ela me acolheu mais que tudo! Estou impressionada com tamanha dedicação e respeito. Muito obrigada, doutora."
  3. "Dra. Camila é extremamente atenciosa, comunicação clara, gostei muito da consulta."
  4. "Atendimento humanizado, quis entender minha demanda."
  5. "Muito cuidadosa e atenciosa! Com certeza vou continuar meu tratamento com você, Dra."
  6. "Dra. extremamente humana e simpática, amei."
  7. "Super atenciosa, amei a nossa consulta."
  8. "Eu achei a doutora super educada e atenciosa."
  9. "Profissional pontual, capaz, eficiente."

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

## 10. OBJETOS 3D
Removidos a pedido da cliente: não há objetos 3D em nenhuma seção, e three, @react-three/fiber e @react-three/drei foram desinstalados. Não colocar nada no lugar.

## 11. COMPONENTES REUTILIZÁVEIS
- **FadeIn**: wrapper Framer Motion com `whileInView`, viewport `{ once: true, margin: "50px", amount: 0 }`. Props: delay, duration (padrão 0.7), x (padrão 0), y (padrão 30). Easing `[0.25, 0.1, 0.25, 1]`.
- **Magnet**: mantido porque é usado pelo ConsultButton (magnetismo leve do botão), que ficou como único uso depois que saiu o do retrato; (padding 40, deslocamento = distância / 6, entrada 0.3s ease-out, saída 0.6s ease-in-out). Somente desktop.
- **AnimatedText**: revelação letra por letra guiada pelo scroll; cada caractere vai de opacity 0.2 a 1 (`useScroll` no parágrafo, offset `['start 0.8', 'end 0.2']`), com placeholder invisível + span animado posicionado. Aceita `offset` opcional (usado no Sobre mim, com vários parágrafos). O progresso só avança (o texto não volta a apagar). Cor #E6ECF2, font-medium, leading-relaxed, `clamp(1rem, 2vw, 1.35rem)`. Incluir `aria-label` com o texto completo.
- **ConsultButton**: pílula (rounded-full) com degradê sutil `linear-gradient(123deg, #0E1D31 0%, #1E3A5F 60%, #0E1D31 100%)`, outline 1px #C4AC8F com outline-offset 3px, texto #F7F4EE, maiúsculas, tracking-widest, `px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4`. Hover: preenchimento #C4AC8F deslizando (texto passa a #0E1D31) + magnetismo leve (desktop). Label: "Marcar consulta".

## 12. MOVIMENTO GLOBAL
- Lenis em todo o site (duration ~1.2).
- prefers-reduced-motion: desativar Lenis, parallax, faixas em movimento, Magnet e AnimatedText (texto em opacidade total); manter apenas fades simples (no Hero, as palavras do título só fazem fade).
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
- Performance: Lighthouse mobile acima de 85.
- Vercel Web Analytics (`@vercel/analytics`), sem cookies.
- Responsivo mobile-first para celular, tablet, notebook e desktop.

## 15.1 PUBLICAÇÃO E COMPARTILHAMENTO
- Endereço atual: https://dra-camila-egypto.vercel.app/
- `og:url`, `og:image`, `twitter:image` e `canonical` usam esse endereço completo; há `robots.txt` e `sitemap.xml` em `public/`.
- Se passar a usar domínio próprio, atualize esses endereços no `index.html`, no `robots.txt` e no `sitemap.xml`.
- Vercel Web Analytics: componente `<Analytics />` só no build de produção.

## 16. NÃO QUERO
Preços, planos, valores; textos além dos da seção 9; depoimentos inventados (continuam proibidos), números ou credenciais inventados; avaliações com estrelas, notas, nomes ou iniciais (as avaliações reais enviadas pela cliente são permitidas, sem identificação); imagens, GIFs ou objetos 3D de terceiros; fundo removido das fotos; cores neon ou roxas; visual de games ou de clínica genérica; excesso de dourado; animações exageradas; PDF publicado no site.

## 17. RESULTADO ESPERADO
Ao abrir o site, a sensação deve ser: "essa é uma médica com uma presença profissional sofisticada e muito bem construída".
Tipografia editorial + fotografia forte + seções sobrepostas + microinterações. Preciso, elegante e memorável.

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
- [x] Hero claro e editorial: foto à direita dissolvendo no fundo, título com "limite" em dourado, palavras subindo de máscaras, parallax
- [x] Sobre mim: sobreposto ao Hero, AnimatedText, foto com clip-path e parallax interno
- [x] Sem objetos 3D e sem dependências de three.js (three, @react-three/fiber e @react-three/drei desinstalados; nenhum Canvas)
- [x] Avaliações "O que dizem os pacientes": 9 textos reais, pilha com arrastar, setas, contador, teclado, autoplay e reduced-motion
- [x] Constante QUALIFICACAO usada no rodapé, alt texts, title e meta tags
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
- [x] Lighthouse mobile acima de 85 (último: desempenho 94–95, acessibilidade 100, boas práticas 96, SEO 100)
- [x] kit-site-camila.zip removido do repositório


## HISTÓRICO DE AJUSTES (depois do briefing original)
1. **Redesign inicial** seguindo o `BRIEFING-SITE.md` (React + Vite + Framer Motion + 3D).
2. **Desempenho:** o AnimatedText passou a atualizar as letras direto no DOM (uma única inscrição no scroll, em vez de um componente animado por letra), o que levou o Lighthouse mobile de 66 para 94. Mesmo efeito visual.
3. **Revelações:** a foto do Sobre e o título do CTA usam um wrapper externo que dispara a animação (um elemento totalmente recortado por clip-path ou máscara não é detectado como visível).
4. **Aviso de crise** (SAMU 192 / CVV 188) adicionado ao rodapé, a pedido do cliente.
5. **Magnet do retrato suavizado:** de distância/3 (até ~120px) para distância/12, com limite de 18px.
6. **Publicação** na Vercel em https://dra-camila-egypto.vercel.app/, com metatags de compartilhamento usando o endereço completo e `sitemap.xml`.
7. **Ajustes pedidos pela cliente (lote 1):**
   - Hero refeito no layout "claro e editorial" (fundo off-white, logo azul, ícones de Instagram e WhatsApp, foto à direita dissolvendo no fundo, título "Você não precisa esperar chegar ao seu limite para procurar ajuda."). Saíram o nome gigante, o arco e o Magnet do retrato. O link "Contato" da navbar foi substituído pelo ícone de WhatsApp.
   - Objetos 3D removidos e three / React Three Fiber desinstalados.
   - "Sobre" virou "Sobre mim", sem subtítulo, e passou a sobrepor o Hero com cantos arredondados.
   - Novo texto do "Sobre mim" em 6 parágrafos, enviado pela cliente; foto fixa ao lado no desktop e parágrafos acendendo ao passar pelo meio da tela.
   - Subtítulo do "Quando procurar um psiquiatra?" trocado (a frase antiga ficou repetida com o novo título do Hero) por uma frase do PDF: "O acompanhamento psiquiátrico também pode ser importante quando mudanças emocionais, comportamentais ou cognitivas começam a comprometer sua qualidade de vida."

8. **Revisão do lote 1** (o pedido original chegou cortado no item 3; os itens 4 a 8 nunca foram recebidos):
   - "Quando procurar" virou "Quando procurar atendimento?", sem subtítulo, com novos itens nas faixas.
   - "Sobre mim" com o texto revisado em 4 parágrafos (sem "2º ano") e a frase final em destaque dourado itálico. O AnimatedText passou a só avançar e a terminar mais cedo, garantindo opacidade total.
   - Algarismos alinhados (`.num-lining`) em todos os números grandes.
   - Cards de "Como funciona" no mobile com a altura do conteúdo.
   - Seção de Avaliações (pilha de cartões) implementada.
9. **Itens finais do lote 1:**
   - Avaliações com os 9 textos reais da cliente, título "O que dizem os pacientes", cartões de 340px.
   - Constante `QUALIFICACAO` (valor "Psiquiatria", alternativa de residente comentada) usada no rodapé, alt texts, title e meta tags.
   - Confirmada a remoção do 3D (pacotes, componentes e Canvas). Magnet e AnimatedText seguem em uso (botão de consulta e Sobre mim).
   - Regra "NÃO QUERO" atualizada: depoimentos inventados proibidos; avaliações reais permitidas, sem estrelas, notas ou identificação.
   - `html { position: relative }` para o useScroll do Framer Motion medir corretamente (removia um aviso no console de desenvolvimento).

10. **Foto da entrada trocada** pela de blazer branco escolhida pela cliente (primeiro a partir de um print, depois substituída pelo arquivo original em alta, 1717×2576). A foto antiga da entrada (`hero-camila`, blazer preto na banqueta) passou para o card 03.
11. **Card 03 de "Como funciona" com foto:** usa a antiga foto da entrada (`hero-camila`), como os cards 01 e 02.
12. **Prévia de compartilhamento** (`og-image.jpg`) refeita com a foto nova da entrada; URL com `?v=2` para o WhatsApp não usar a versão antiga em cache.

### Pendências
- RQE de Psiquiatria.
- Possível nova frase para a entrada (a cliente está pensando).
- Confirmar com o CREMEC a qualificação (trocar `QUALIFICACAO` se for o caso) e a publicação das avaliações.
- Confirmar com a cliente a menção à especialidade enquanto residente (RQE), ver observação abaixo.
- Opcional: domínio próprio; avaliar hospedagem com uso comercial permitido (Vercel Pro, Cloudflare Pages ou Netlify).

### Observação sobre a especialidade (CFM)
O texto do "Sobre mim" informa que a Dra. Camila faz Residência Médica em Psiquiatria. Pelas regras de publicidade médica do CFM, o título de especialista (e o RQE) só existe após a conclusão da residência; até lá, a recomendação é não se apresentar como "psiquiatra" ou "especialista em Psiquiatria". O site usa "Psiquiatria" na marca e nos títulos, e "psiquiatra" em alguns textos alternativos das fotos. Vale a cliente confirmar como quer se apresentar (por exemplo, "médica residente em Psiquiatria") antes da divulgação.
