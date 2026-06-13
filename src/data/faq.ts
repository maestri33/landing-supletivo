/**
 * Fonte única do FAQ: alimenta o componente <Faq /> e o schema FAQPage (JSON-LD).
 * Regras de copy: sem nome de instituição parceira, sem números de prova social.
 * Ordem: maiores objeções primeiro (medo de golpe e dinheiro).
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: 'O certificado é reconhecido? Vale em todo o Brasil?',
    a: 'Sim. A certificação é emitida por instituição parceira credenciada ao MEC e tem validade em todo o território nacional, com amparo na Lei nº 9.394/96 (LDB).',
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Você pode pagar em 12x de R$ 99 no cartão de crédito ou R$ 999 à vista no Pix. A escolha é feita na matrícula, dentro do app. O valor é promocional e pode mudar sem aviso.',
  },
  {
    q: 'O certificado serve para faculdade, concurso e CNH?',
    a: 'Sim. O certificado de conclusão serve para se matricular em faculdades, prestar concursos públicos, tirar a CNH e comprovar escolaridade no trabalho.',
  },
  {
    q: 'Qual é a idade mínima para fazer o supletivo?',
    a: 'Pela Lei nº 9.394/96 (LDB), a idade mínima é de 15 anos completos para concluir o Ensino Fundamental e de 18 anos completos para o Ensino Médio.',
  },
  {
    q: 'Em quanto tempo consigo terminar?',
    a: 'Depende do seu ritmo. O curso é 100% online e você estuda nos horários que tiver. Quanto mais constância nos estudos e nas avaliações, mais cedo você chega ao certificado.',
  },
  {
    q: 'Como são as provas?',
    a: 'As avaliações são feitas de forma online, dentro da própria plataforma, pelo celular ou computador — sem precisar se deslocar.',
  },
  {
    q: 'Preciso de computador para estudar?',
    a: 'Não. Tudo — da matrícula às avaliações — funciona pelo celular. Se preferir, também dá para usar computador ou tablet.',
  },
  {
    q: 'Posso fazer o Ensino Fundamental e o Médio no mesmo lugar?',
    a: 'Sim. O Supletivo Brasil atende às duas etapas da EJA: você conclui o Ensino Fundamental e depois segue direto para o Ensino Médio, tudo 100% online.',
  },
  {
    q: 'Como faço para me matricular agora?',
    a: 'É só tocar no botão "Quero meu diploma" aqui da página: você cai direto no app de matrícula, faz o cadastro pelo celular em poucos minutos e escolhe a forma de pagamento (12x no cartão ou Pix).',
  },
];
