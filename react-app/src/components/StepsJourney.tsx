import React from 'react';
import { UserPlus, Laptop, Award, ArrowRight } from 'lucide-react';

interface StepsJourneyProps {
  onOpenLeadModal: (course?: 'medio' | 'fundamental' | 'ambos') => void;
}

export const StepsJourney: React.FC<StepsJourneyProps> = ({ onOpenLeadModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Matrícula Rápida e Online',
      desc: 'Faça sua inscrição em menos de 3 minutos sem sair de casa. Acesso imediato à plataforma de estudos.',
      icon: <UserPlus className="w-6 h-6 text-white" />,
    },
    {
      num: '02',
      title: 'Estude no Celular no Seu Ritmo',
      desc: 'Assista a videoaulas curtas e resolva exercícios focados no que realmente cai nas avaliações.',
      icon: <Laptop className="w-6 h-6 text-white" />,
    },
    {
      num: '03',
      title: 'Prova e Certificado Oficial',
      desc: 'Realize sua avaliação com suporte completo e receba seu certificado com publicação no Diário Oficial.',
      icon: <Award className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="como-funciona">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            Jornada do Aluno
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 tracking-tight">
            Como funciona o Supletivo Online?
          </h2>
          <p className="text-slate-300 text-base md:text-lg">
            Um método simplificado e direto ao ponto, criado para quem não tem tempo a perder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-8 relative flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-orange-500/80 group-hover:text-orange-400 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center text-orange-400 font-semibold text-sm">
                Passo {idx + 1} de 3
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => onOpenLeadModal('ambos')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
          >
            Quero Começar Meus Estudos Agora
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
