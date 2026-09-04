import React from 'react';
import { ShieldCheck, BookOpen, Smartphone, Award, Clock, CheckCircle2 } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
      title: 'Reconhecimento Oficial MEC',
      desc: 'Certificação emitida com publicação nominal no Diário Oficial e registro no SISTEC/GDAE.',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-emerald-600" />,
      title: '100% Pelo Celular',
      desc: 'Acesse apostilas, videoaulas e simulados direto no seu smartphone quando e onde puder.',
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: 'Conclusão Acelerada',
      desc: 'Ritmo adaptável às suas necessidades, permitindo concluir em poucos meses conforme seu empenho.',
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: 'Válido para Concursos e Faculdades',
      desc: 'Diploma com o mesmo valor legal de uma escola presencial regular.',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
      title: 'Sem Mensalidades Surpresa',
      desc: 'Investimento único com tudo incluso: material digital, suporte e emissão do certificado.',
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
      title: 'Professores e Tutoria',
      desc: 'Tire dúvidas diretamente com a equipe pedagógica durante toda a sua jornada.',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="beneficios">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          Por que escolher o Supletivo Brasil
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Tudo o que você precisa para dar a virada na sua vida profissional
        </h2>
        <p className="text-slate-600 text-lg">
          Desenvolvido especialmente para jovens e adultos que trabalham e precisam de flexibilidade com segurança jurídica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-slate-50 rounded-xl w-fit mb-5 border border-slate-100">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
