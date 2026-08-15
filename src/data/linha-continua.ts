/**
 * Fonte única da campanha "A Linha Contínua" (handoff v1.0, 10/08/2026:
 * .claude/campaigns/supletivo-linha-continua/handoff-landing-a-linha-continua.md).
 *
 * BLOQUEADORES DE PUBLICAÇÃO (seção 2 do handoff): os campos `null` abaixo
 * são decisões pendentes de Comercial/Financeiro/Jurídico. Enquanto forem
 * null, a página NÃO exibe quantidade, evento de confirmação nem o preço de
 * referência de R$ 1.615 — a copy cai na formulação honesta de "em definição".
 */
import { cardLine, pixBRL } from './price';

export const CAMPAIGN_ID = 'linha-continua';
/** variante fixa até existir infra de experimento (seção 17 do handoff) */
export const VARIANT_ID = 'a';

export interface Offer {
  /** X — quantidade promocional real [DECISÃO PENDENTE — Comercial] */
  promoQuantity: number | null;
  /** Evento que consome a condição [DECISÃO PENDENTE — Comercial + Tecnologia] */
  confirmationEvent: 'pagamento_aprovado' | 'reserva_pix' | null;
  /** Regra/preço depois da condição [DECISÃO PENDENTE] */
  afterRule: string | null;
  /** Preço de referência R$ 1.615 [VALIDAR — Financeiro + Jurídico] */
  referencePriceApproved: boolean;
}

export const OFFER: Offer = {
  promoQuantity: null,
  confirmationEvent: null,
  afterRule: null,
  referencePriceApproved: false,
};

/** Regra da condição exibida na oferta — nunca inventa número nem urgência. */
export function offerRuleText(o: Offer = OFFER): string {
  if (o.promoQuantity !== null && o.confirmationEvent !== null) {
    const evento =
      o.confirmationEvent === 'pagamento_aprovado'
        ? 'pagamento aprovado'
        : 'reserva Pix confirmada';
    const depois = o.afterRule ? ` Depois, ${o.afterRule}.` : '';
    return `Para as primeiras ${o.promoQuantity} matrículas confirmadas por ${evento}.${depois}`;
  }
  // Placeholder honesto enquanto a seção 2 do handoff não é resolvida.
  return 'Condição de lançamento em definição: a quantidade de matrículas e a regra de confirmação serão publicadas aqui antes do início da campanha.';
}

/* ------------------------------------------------------------------ */
/* Diagnóstico (seção 7.3 do handoff)                                  */
/* ------------------------------------------------------------------ */

export interface DiagOption {
  key: string;
  label: string;
}

export interface DiagQuestion {
  id: 'etapa' | 'idade' | 'estado' | 'objetivo';
  title: string;
  options: DiagOption[];
}

const UFS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS',
  'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC',
  'SE', 'SP', 'TO',
];

export const DIAG_QUESTIONS: DiagQuestion[] = [
  {
    id: 'etapa',
    title: 'Onde seus estudos ficaram?',
    options: [
      { key: 'fundamental', label: 'Parei no Ensino Fundamental' },
      { key: 'medio', label: 'Parei no Ensino Médio' },
      { key: 'nao-sei', label: 'Não sei ao certo' },
    ],
  },
  {
    id: 'idade',
    title: 'Qual é a sua idade?',
    options: [
      { key: '15-17', label: '15 a 17 anos' },
      { key: '18-29', label: '18 a 29 anos' },
      { key: '30-44', label: '30 a 44 anos' },
      { key: '45+', label: '45 anos ou mais' },
      { key: 'nao-dizer', label: 'Prefiro não dizer' },
    ],
  },
  {
    id: 'estado',
    title: 'Em qual estado você está?',
    options: [
      ...UFS.map((uf) => ({ key: uf, label: uf })),
      { key: 'nao-informar', label: 'Prefiro não informar' },
    ],
  },
  {
    id: 'objetivo',
    title: 'O que você quer destravar primeiro?',
    options: [
      { key: 'concluir', label: 'Concluir a etapa que ficou para trás' },
      { key: 'trabalho', label: 'Comprovar escolaridade para trabalho ou concurso' },
      { key: 'faculdade', label: 'Abrir caminho para uma faculdade' },
      { key: 'rotina', label: 'Organizar uma rotina de estudos possível' },
      { key: 'nao-sei', label: 'Ainda não sei' },
    ],
  },
];

export type DiagAnswers = Partial<Record<DiagQuestion['id'], string>>;

export interface DiagResult {
  /** rótulo curto do caminho ("Ensino Fundamental", "Ensino Médio", "a definir") */
  pathLabel: string;
  /** explicação do porquê do direcionamento */
  pathWhy: string;
  /** o que já pode ser explicado agora */
  known: string[];
  /** o que ainda precisa ser confirmado antes da matrícula */
  pending: string[];
}

/**
 * Direcionamento inicial — NÃO é promessa (seção 7.4 do handoff):
 * documentos, regras e disponibilidade são confirmados antes da matrícula.
 */
export function computeResult(a: DiagAnswers): DiagResult {
  const menorDeIdade = a.idade === '15-17';

  let pathLabel: string;
  let pathWhy: string;
  if (a.etapa === 'fundamental' || (a.etapa === 'nao-sei' && menorDeIdade)) {
    pathLabel = 'Ensino Fundamental (EJA)';
    pathWhy = menorDeIdade
      ? 'Pela Lei nº 9.394/96 (LDB), a certificação do Ensino Médio pela EJA exige 18 anos completos — então o caminho começa pelo Fundamental.'
      : 'Você indicou que parou no Ensino Fundamental: é dele que o caminho recomeça, sem voltar ao começo.';
  } else if (a.etapa === 'medio') {
    pathLabel = 'Ensino Médio (EJA)';
    pathWhy =
      'Você indicou que parou no Ensino Médio: o caminho retoma dessa etapa, com estudo online e prova final presencial.';
  } else {
    pathLabel = 'Fundamental ou Médio — a confirmar';
    pathWhy =
      'Como você não tem certeza de onde parou, a etapa exata é confirmada na matrícula, a partir dos seus documentos e do seu histórico.';
  }

  const known = [
    'O estudo é 100% online, pelo celular, no horário que couber na sua rotina.',
    'A prova final é presencial, em um dos nossos polos, marcada quando você se sentir preparado.',
    'A certificação é emitida por instituição parceira credenciada ao MEC, com validade em todo o Brasil.',
  ];

  const pending = [
    'Documentos exatos para a sua etapa e o seu estado.',
    a.estado && a.estado !== 'nao-informar'
      ? `Disponibilidade de polo para a prova presencial no seu estado (${a.estado}).`
      : 'Disponibilidade de polo para a prova presencial na sua região.',
    'Regras acadêmicas aplicáveis ao seu histórico escolar.',
  ];

  return { pathLabel, pathWhy, known, pending };
}

/* ------------------------------------------------------------------ */
/* FAQ decisivo (seção 7.10 do handoff)                                */
/* ------------------------------------------------------------------ */

export interface LcFaqItem {
  id: string;
  q: string;
  /** resposta curta (sempre visível ao abrir, antes do detalhe) */
  short: string;
  /** detalhe */
  a: string;
}

export const LC_FAQ: LcFaqItem[] = [
  {
    id: 'para-quem',
    q: 'Para quem esse caminho é indicado?',
    short: 'Para adultos que interromperam o Fundamental ou o Médio e querem concluir.',
    a: 'Pela Lei nº 9.394/96 (LDB), a idade mínima é de 15 anos completos para concluir o Ensino Fundamental e de 18 anos completos para o Ensino Médio pela EJA. O estudo é online e a prova final é presencial.',
  },
  {
    id: 'documentos',
    q: 'Quais documentos serão necessários?',
    short: 'Documentos de identidade e escolares, confirmados antes da matrícula.',
    a: 'A lista exata depende da etapa e do seu histórico (por exemplo, documento de identidade, comprovante e histórico escolar, quando houver). Você recebe a lista do seu caso antes de concluir a matrícula — nenhuma etapa é cobrada sem que você saiba o que será exigido.',
  },
  {
    id: 'etapas',
    q: 'Como funcionam as etapas?',
    short: 'Estudo online no seu ritmo e prova final presencial em um polo.',
    a: 'Você entende sua situação, confere documentos e regras, segue um plano de estudos orientado 100% online e, quando se sentir preparado, marca a prova final presencial em um dos polos. É nesse encontro que a documentação oficial é assinada e enviada à Secretaria de Educação do estado.',
  },
  {
    id: 'tempo',
    q: 'Quanto tempo pode levar?',
    short: 'Depende do seu ritmo — não existe um prazo garantido.',
    a: 'Você estuda nos horários que tiver e marca a prova final quando se sentir preparado. Quanto mais constância, mais cedo você conclui. Não prometemos prazo fechado porque ele depende da sua rotina e do seu histórico.',
  },
  {
    id: 'suporte',
    q: 'Como funciona o suporte?',
    short: 'Atendimento humano antes e depois da matrícula, por canais oficiais.',
    a: 'Você pode tirar dúvidas antes de pagar e continua com canal de atendimento depois da matrícula, dentro do app. Se algo sobre preço ou condição estiver divergente, fale com o atendimento antes de confirmar qualquer pagamento.',
  },
  {
    id: 'presencial',
    q: 'Existe avaliação ou etapa presencial?',
    short: 'Sim: a prova final é presencial, em um polo.',
    a: 'Todo o estudo é online, mas a prova final é presencial — você escolhe um polo e o dia. É o passo que dá validade oficial ao certificado. A disponibilidade de polos varia por estado e é confirmada antes da matrícula.',
  },
  {
    id: 'certificacao',
    q: 'Como funciona a certificação?',
    short: 'Certificado emitido por instituição parceira credenciada ao MEC, válido em todo o Brasil.',
    a: 'Após a aprovação na prova final e a entrega da documentação, a certificação é emitida por instituição de ensino parceira credenciada ao MEC, com amparo na Lei nº 9.394/96 (LDB) e validade em todo o território nacional. Serve para faculdade, concursos, CNH e comprovação de escolaridade no trabalho.',
  },
  {
    id: 'cobertura',
    q: 'Em quais estados ou localidades está disponível?',
    short: 'O estudo online atende todo o Brasil; os polos de prova variam por estado.',
    a: 'Você pode estudar de qualquer lugar do país. A prova final presencial depende de polo disponível na sua região — confirme a cobertura do seu estado no diagnóstico ou com o atendimento antes de pagar.',
  },
  {
    id: 'reembolso',
    q: 'Como funciona reembolso ou cancelamento?',
    short: 'Arrependimento em até 7 dias, conforme o Código de Defesa do Consumidor.',
    a: 'Compras feitas fora do estabelecimento (como pela internet) têm direito de arrependimento em até 7 dias, com devolução integral dos valores, conforme o art. 49 do Código de Defesa do Consumidor. Depois desse prazo, as condições seguem os termos apresentados antes do pagamento.',
  },
  {
    id: 'encceja',
    q: 'Qual a diferença para o Encceja?',
    short: 'O Encceja é um exame público gratuito; aqui você tem plano, acompanhamento e previsibilidade.',
    a: 'O Encceja é um exame gratuito do Inep para quem quer se preparar por conta própria — é uma alternativa legítima e reconhecemos isso. O caminho do Supletivo Brasil inclui plano de estudos orientado, conteúdo organizado, acompanhamento, prova final em polo e todo o processo documental conduzido com você. Você paga pela preparação, organização e previsibilidade — não por um diploma.',
  },
  {
    id: 'condicao',
    q: `Como funciona a condição de ${pixBRL}?`,
    short: `${pixBRL} à vista no Pix, ou ${cardLine} no cartão.`,
    a: `A condição de lançamento é de ${pixBRL} à vista no Pix; também é possível pagar em ${cardLine} no cartão de crédito. ${offerRuleText()} O preço exibido na matrícula e no checkout é sempre o que vale — se algo divergir, fale com o atendimento antes de pagar.`,
  },
  {
    id: 'dados',
    q: 'Como meus dados serão usados?',
    short: 'Só para conduzir sua matrícula e seu atendimento, conforme a Política de Privacidade.',
    a: 'Suas respostas do diagnóstico servem para direcionar o caminho. Nome e contato só são pedidos depois do resultado, e CPF apenas quando for necessário para a etapa de matrícula. Não vendemos dados e não enviamos dados pessoais para ferramentas de analytics. Os detalhes estão na Política de Privacidade.',
  },
];

/* ------------------------------------------------------------------ */
/* Seções da jornada (marcos da linha) — seção 6 do handoff            */
/* ------------------------------------------------------------------ */

export const LC_SECTIONS = [
  { id: 'hero', label: 'Reconhecimento' },
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'resultado', label: 'Resultado' },
  { id: 'vida', label: 'A vida entrou na frente' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'verifique', label: 'Verifique antes de decidir' },
  { id: 'oferta', label: 'Oferta' },
  { id: 'faq', label: 'FAQ' },
  { id: 'comecar', label: 'Começar' },
] as const;
