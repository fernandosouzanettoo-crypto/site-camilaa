// Todos os textos do site (briefing, seção 9). Não acrescentar textos além destes.

export const WHATSAPP_URL =
  "https://wa.me/5585991034586?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Camila%20Egypto.";
export const INSTAGRAM_URL = "https://instagram.com/camilaegypto.psiquiatria";
export const INSTAGRAM_HANDLE = "@camilaegypto.psiquiatria";

export const hero = {
  titulo: "Você não precisa esperar chegar ao seu limite para procurar ajuda.",
  // Palavra do título destacada em dourado
  destaque: "limite",
  subtitulo: "Cuidar da mente é conectar histórias.",
};

export const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const sobre = {
  titulo: "Sobre mim",
  texto:
    "Atendimento psiquiátrico com escuta qualificada, precisão clínica e uma abordagem técnica, empática e individualizada. Cada pessoa possui uma história, um contexto e necessidades diferentes. Antes de pensar em um diagnóstico, é preciso compreender a pessoa que está diante de nós.",
};

export const quandoProcurar = {
  titulo: "Quando procurar um psiquiatra?",
  subtitulo: "Você não precisa esperar chegar ao seu limite para procurar ajuda.",
  linha1: [
    "Depressão e transtorno bipolar",
    "Ansiedade, pânico, fobias e TOC",
    "TDAH em adultos",
    "Insônia e problemas de sono",
  ],
  linha2: [
    "Transtornos psicóticos",
    "Uso de álcool e outras substâncias",
    "Transtornos de personalidade",
    "Sofrimento psíquico no dia a dia",
  ],
  fechamento1: "Nem todo sofrimento significa um transtorno mental.",
  fechamento2: "Mas todo sofrimento que está limitando a sua vida merece ser compreendido.",
};

export const cuidado = {
  titulo: "Um cuidado centrado em você",
  itens: [
    { numero: "01", nome: "Ciência", descricao: "Condutas orientadas pelas melhores evidências científicas disponíveis." },
    {
      numero: "02",
      nome: "Individualidade",
      descricao: "Diagnóstico e tratamento considerando sua história, necessidades, preferências e contexto de vida.",
    },
    {
      numero: "03",
      nome: "Humanização",
      descricao: "Um espaço de escuta sem julgamentos, onde você participa das decisões sobre o seu tratamento.",
    },
  ],
};

export type CardComoFunciona = {
  numero: string;
  titulo: string;
  texto: string;
  destaque?: string;
  foto?: { nome: string; alt: string };
};

export const comoFunciona: { titulo: string; cards: CardComoFunciona[] } = {
  titulo: "Como funciona",
  cards: [
    {
      numero: "01",
      titulo: "A consulta",
      texto:
        "Um espaço de investigação, escuta e construção conjunta do cuidado. Conversamos sobre sua história, saúde física e mental, sono, rotina, relacionamentos e trabalho.",
      foto: { nome: "atendimento-camila", alt: "Dra. Camila Egypto sentada, de blazer preto" },
    },
    {
      numero: "02",
      titulo: "O plano de cuidado",
      texto:
        "A partir da avaliação, discutimos juntos as possibilidades: psicoeducação, mudanças de hábitos, psicoterapia, encaminhamentos e, quando houver indicação clínica, tratamento medicamentoso.",
      foto: { nome: "atuacao-camila", alt: "Dra. Camila Egypto sorrindo, de conjunto branco, sentada em cadeira de madeira" },
    },
    {
      numero: "03",
      titulo: "O acompanhamento",
      destaque: "Saúde mental é processo, não apenas uma consulta.",
      texto: "Acompanhar a evolução permite ajustar o tratamento, prevenir recaídas e construir um cuidado sustentável ao longo do tempo.",
    },
  ],
};

export const duvidas = {
  titulo: "Dúvidas frequentes",
  itens: [
    {
      pergunta: "Preciso estar em uma situação grave para procurar um psiquiatra?",
      resposta:
        "Não. Quanto mais cedo identificamos um sofrimento que está causando prejuízo, mais cedo podemos compreender o que está acontecendo e discutir estratégias de cuidado.",
    },
    {
      pergunta: "Vou precisar tomar medicação?",
      resposta:
        "Não necessariamente. A indicação depende da avaliação clínica e é discutida individualmente. A decisão terapêutica deve ser segura, fundamentada e compartilhada.",
    },
    {
      pergunta: "Uma consulta é suficiente?",
      resposta:
        "Depende do caso. Algumas situações podem ser esclarecidas em uma consulta; outras exigem acompanhamento para avaliação diagnóstica, ajuste terapêutico e monitoramento da evolução.",
    },
    {
      pergunta: "Psiquiatra e psicólogo fazem a mesma coisa?",
      resposta:
        "Não. São atuações diferentes e frequentemente complementares. Quando houver indicação, o acompanhamento conjunto pode fazer parte do plano terapêutico.",
    },
    {
      pergunta: "Você emite laudos, relatórios e atestados?",
      resposta:
        "Documentos médicos são emitidos quando existe indicação clínica e respaldo técnico. A necessidade é avaliada individualmente, por isso a consulta não implica emissão automática de documentos.",
    },
  ],
};

export const cta = {
  titulo: "Cuidar da saúde mental é um processo.",
  texto: "Você não precisa esperar o sofrimento se tornar insuportável para começar a cuidar da sua saúde mental.",
  botao: "Marcar consulta",
};

export const rodape = {
  nome: "Dra. Camila Egypto",
  especialidade: "Psiquiatria",
  registro: "CREMEC 29104",
  // TODO: inserir RQE antes da publicação
  rqe: "",
  aviso: {
    texto: "Em situação de crise ou risco, procure o pronto-socorro mais próximo ou ligue",
    samu: { label: "192 (SAMU)", tel: "tel:192" },
    cvv: { label: "188 (CVV)", tel: "tel:188" },
  },
};

export const whatsappFlutuante = "Agende seu atendimento";

// Rótulos dos ícones da navbar
export const navWhatsappLabel = "Agendar pelo WhatsApp";
export const navInstagramLabel = "Instagram da Dra. Camila Egypto";
