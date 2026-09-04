export interface Story {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  quote: string;
  conquest: string;
  tag: string;
}

export const STORIES: Story[] = [
  {
    id: '1',
    name: 'Carlos Eduardo Silveira',
    age: 38,
    city: 'Campinas, SP',
    role: 'Encarregado de Logística',
    quote:
      'Passei 15 anos ouvindo que para ser promovido eu precisava do Ensino Médio. Com as aulas no celular entre os turnos, concluí em 6 meses e fui promovido no mês seguinte.',
    conquest: 'Promovido a Líder de Turno',
    tag: 'Ensino Médio',
  },
  {
    id: '2',
    name: 'Juliana Mendes Santos',
    age: 29,
    city: 'Salvador, BA',
    role: 'Técnica de Enfermagem',
    quote:
      'Tive que parar de estudar cedo para ajudar minha família. O Supletivo Brasil me deu a chance de terminar no meu tempo, de madrugada, e hoje já entrei no curso técnico dos meus sonhos.',
    conquest: 'Aprovada no Curso Técnico',
    tag: 'Ensino Médio',
  },
  {
    id: '3',
    name: 'Marcos Vinícius Rocha',
    age: 44,
    city: 'Curitiba, PR',
    role: 'Servidor Público Municipal',
    quote:
      'Precisava do certificado para tomar posse no concurso público municipal. Meu nome saiu no Diário Oficial e o certificado foi aceito na posse sem nenhum problema.',
    conquest: 'Tomou Posse em Concurso Público',
    tag: 'Fundamental & Médio',
  },
];
