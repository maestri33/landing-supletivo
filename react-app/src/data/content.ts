import type { HeroCard, FaqItem, StoryItem } from '../types';

export const HERO_CARDS: HeroCard[] = [
  {
    img: 'https://v3b.fal.media/files/b/0aa8c997/96gS66wg3j6MN5D57ob5Q_nVFZAWVD.png',
    alt: 'Mulher brasileira estudando para o Ensino Médio pelo celular',
    label: 'Ensino Médio',
    titleTop: 'Ensino',
    titleBottom: 'Médio Rápido',
    num: '100%',
    labelTopic: 'Online',
  },
  {
    img: 'https://v3b.fal.media/files/b/0aa8c9ad/U_NeeJsX9xQp4LuWsdi4i_f1ZjWbd9.png',
    alt: 'Trabalhador brasileiro estudando EJA Fundamental',
    label: 'Fundamental',
    titleTop: 'Ensino',
    titleBottom: 'Fundamental',
    num: '6',
    labelTopic: 'Meses',
  },
  {
    img: 'https://v3b.fal.media/files/b/0aa8c997/uA_GZvR04a9n_WlC26aQJ_H4fIzVTz.png',
    alt: 'Aluno com certificado oficial reconhecido pelo MEC e Diário Oficial',
    label: 'Certificado',
    titleTop: 'Certificado',
    titleBottom: 'Oficial D.O.',
    num: 'MEC',
    labelTopic: 'Válido',
  },
];

export const STORIES: StoryItem[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Silveira',
    age: 38,
    city: 'Campinas, SP',
    role: 'Encarregado de Logística',
    avatar: 'https://v3b.fal.media/files/b/0aa8c9ad/U_NeeJsX9xQp4LuWsdi4i_f1ZjWbd9.png',
    quote: 'Passei 15 anos ouvindo que para ser promovido eu precisava do Ensino Médio. Com as aulas no celular entre os turnos, concluí em 6 meses e fui promovido no mês seguinte.',
    conquest: 'Promovido a Líder de Turno',
    tag: 'Ensino Médio',
  },
  {
    id: '2',
    name: 'Juliana Mendes Santos',
    age: 29,
    city: 'Salvador, BA',
    role: 'Técnica de Enfermagem (em formação)',
    avatar: 'https://v3b.fal.media/files/b/0aa8c997/96gS66wg3j6MN5D57ob5Q_nVFZAWVD.png',
    quote: 'Tive que parar de estudar cedo para ajudar minha família. O Supletivo Brasil me deu a chance de terminar no meu tempo, de madrugada, e hoje já entrei no curso técnico dos meus sonhos.',
    conquest: 'Aprovada no Curso Técnico',
    tag: 'Ensino Médio',
  },
  {
    id: '3',
    name: 'Marcos Vinícius Rocha',
    age: 44,
    city: 'Curitiba, PR',
    role: 'Concursista Aprovado',
    avatar: 'https://v3b.fal.media/files/b/0aa8c997/uA_GZvR04a9n_WlC26aQJ_H4fIzVTz.png',
    quote: 'Precisava do certificado para tomar posse no concurso público municipal. Meu nome saiu no Diário Oficial e o certificado foi aceito na posse sem nenhum problema.',
    conquest: 'Tomou Posse em Concurso Público',
    tag: 'Fundamental & Médio',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'mec',
    question: 'O certificado é realmente válido em todo o Brasil e aceito pelo MEC?',
    answer: 'Sim. A certificação é emitida por instituição parceira devidamente credenciada junto ao Ministério da Educação (MEC) e aos Conselhos Estaduais de Educação, com publicação nominal no Diário Oficial e registro no SISTEC/GDAE. É 100% válido para faculdades, concursos públicos, cursos técnicos e empresas.',
    category: 'validade',
  },
  {
    id: 'tempo',
    question: 'Quanto tempo leva para concluir?',
    answer: 'O tempo médio de conclusão varia entre 3 a 6 meses, dependendo da sua dedicação e do volume de matérias a cursar. Todo o material didático e videoaulas ficam disponíveis 24 horas por dia no seu celular ou computador.',
    category: 'estudos',
  },
  {
    id: 'idade',
    question: 'Qual a idade mínima para fazer o Supletivo EJA?',
    answer: 'De acordo com a Lei de Diretrizes e Bases da Educação (LDB): a idade mínima para o Ensino Fundamental é de 15 anos completos; para o Ensino Médio, a idade mínima é de 18 anos completos.',
    category: 'documentos',
  },
  {
    id: 'como-funciona',
    question: 'Como são as aulas e as provas?',
    answer: 'As aulas, simulados e apostilas digitais são 100% online no ambiente virtual do aluno. A avaliação final segue as diretrizes legais e é realizada com agendamento prévio com todo o suporte pedagógico.',
    category: 'estudos',
  },
  {
    id: 'preco-pagamento',
    question: 'Quais são as formas de pagamento disponíveis?',
    answer: 'O valor promocional é de R$ 1.615 por apenas 12x de R$ 99,00 no cartão de crédito (sem comprometer o limite total em modalidades recorrentes) ou R$ 999,00 à vista no Pix com desconto especial.',
    category: 'pagamento',
  },
  {
    id: 'garantia',
    question: 'Existe garantia de satisfação?',
    answer: 'Sim! Você tem 7 dias de garantia incondicional pelo Código de Defesa do Consumidor. Se por qualquer motivo não se adaptar à plataforma, devolvemos 100% do seu investimento.',
    category: 'pagamento',
  },
];

export const PRICE_INFO = {
  originalPrice: 'R$ 1.615',
  cardInstallments: '12x de R$ 99,00',
  pixTotal: 'R$ 999,00',
  economy: 'Economize R$ 616 hoje',
};
