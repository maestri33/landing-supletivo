export interface HeroCard {
  img: string;
  alt: string;
  label: string;
  titleTop: string;
  titleBottom: string;
  num: string;
  labelTopic: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'validade' | 'estudos' | 'documentos' | 'pagamento';
}

export interface StoryItem {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  avatar: string;
  quote: string;
  conquest: string;
  tag: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  course: 'medio' | 'fundamental' | 'ambos';
  created_at?: string;
}
