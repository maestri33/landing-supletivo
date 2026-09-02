import React, { useState } from 'react';
import { CheckCircle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface EligibilityQuizProps {
  onSelectCourse: (course: 'medio' | 'fundamental' | 'ambos') => void;
}

export const EligibilityQuiz: React.FC<EligibilityQuizProps> = ({ onSelectCourse }) => {
  const [age, setAge] = useState<number | ''>('');
  const [level, setLevel] = useState<'fundamental_incompleto' | 'medio_incompleto' | 'nao_estudou' | ''>('');

  const calculateEligibility = () => {
    if (age === '' || level === '') return null;
    const numAge = Number(age);

    if (numAge < 15) {
      return {
        status: 'ineligible',
        title: 'Idade mínima não atingida',
        desc: 'Pela Lei Federal de Diretrizes e Bases da Educação (LDB), a idade mínima para o EJA é de 15 anos para o Fundamental e 18 anos para o Médio.',
        canEnroll: false,
      };
    }

    if (numAge >= 18) {
      return {
        status: 'eligible_both',
        title: 'Parabéns! Você está 100% elegível para o Ensino Médio ou Fundamental',
        desc: 'Por ter 18 anos ou mais, você pode se matricular diretamente no Ensino Médio e conquistar seu diploma completo com rapidez.',
        canEnroll: true,
        recommended: 'medio' as const,
      };
    }

    if (numAge >= 15 && numAge < 18) {
      return {
        status: 'eligible_fundamental',
        title: 'Você está elegível para o Ensino Fundamental!',
        desc: 'Com 15 a 17 anos, você pode concluir todas as etapas do Ensino Fundamental pelo EJA online.',
        canEnroll: true,
        recommended: 'fundamental' as const,
      };
    }

    return null;
  };

  const result = calculateEligibility();

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto" id="elegibilidade">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3 border border-blue-200">
            <HelpCircle className="w-4 h-4" />
            Simulador de Elegibilidade Gratuito
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Descubra em 30 segundos se você pode concluir seus estudos
          </h2>
          <p className="text-slate-600 mt-2 text-sm md:text-base">
            Consulte os critérios oficiais do Ministério da Educação para o EJA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              1. Qual é a sua idade atual?
            </label>
            <input
              type="number"
              placeholder="Ex: 28"
              min="10"
              max="99"
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              2. Qual foi o último ano que você concluiu?
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900 font-medium bg-white"
            >
              <option value="">Selecione sua escolaridade...</option>
              <option value="fundamental_incompleto">Parei no Ensino Fundamental (1º ao 9º ano)</option>
              <option value="medio_incompleto">Parei no Ensino Médio (1º ao 3º ano)</option>
              <option value="nao_estudou">Não cursei a escola regular</option>
            </select>
          </div>
        </div>

        {result && (
          <div
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              result.canEnroll
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-4">
              {result.canEnroll ? (
                <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-1">{result.title}</h3>
                <p className="text-sm md:text-base opacity-90 leading-relaxed mb-4">{result.desc}</p>

                {result.canEnroll && result.recommended && (
                  <button
                    type="button"
                    onClick={() => onSelectCourse(result.recommended)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer text-sm md:text-base"
                  >
                    Prosseguir com Matrícula para o {result.recommended === 'medio' ? 'Ensino Médio' : 'Fundamental'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
