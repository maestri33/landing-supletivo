import React, { useState } from 'react';
import { TrendingUp, DollarSign, Award, ArrowRight } from 'lucide-react';

interface SalaryCalculatorProps {
  onOpenLeadModal: (course?: string) => void;
}

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ onOpenLeadModal }) => {
  const [currentSalary, setCurrentSalary] = useState<number>(1600);
  const [targetLevel, setTargetLevel] = useState<'medio' | 'fundamental'>('medio');

  // Estimativa baseada em dados PNAD Contínua / IBGE sobre diferença salarial por escolaridade
  const multiplier = targetLevel === 'medio' ? 1.45 : 1.25;
  const projectedSalary = Math.round(currentSalary * multiplier);
  const monthlyGain = projectedSalary - currentSalary;
  const yearlyGain = monthlyGain * 12;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Impacto Financeiro Comprovado (IBGE)
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Calcule o Retorno do seu <span className="text-emerald-400">Diploma</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Concluir os estudos é a decisão mais lucrativa da sua vida. Veja quanto seu salário pode aumentar com o certificado oficial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
          {/* Controles do Formulário */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Objetivo de Conclusão:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTargetLevel('medio')}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all text-center border ${
                    targetLevel === 'medio'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  Ensino Médio (+45%)
                </button>
                <button
                  type="button"
                  onClick={() => setTargetLevel('fundamental')}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all text-center border ${
                    targetLevel === 'fundamental'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  Fundamental (+25%)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">
                  Sua renda mensal atual estimada:
                </label>
                <span className="text-lg font-bold text-amber-400">
                  R$ {currentSalary.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="100"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>R$ 1.000</span>
                <span>R$ 3.500</span>
                <span>R$ 6.000+</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 space-y-1">
              <p>• Diploma abre portas para concursos públicos (médio/técnico).</p>
              <p>• Elegibilidade imediata para cursos superiores, tecnólogos e vagas com carteira assinada.</p>
            </div>
          </div>

          {/* Resultado Projetado */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl p-6 md:p-8 border border-emerald-500/30 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
                Projeção Salarial Pós-Certificado
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-300 flex items-center gap-2">
                R$ {projectedSalary.toLocaleString('pt-BR')}
                <span className="text-xs font-normal text-slate-400">/mês</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-emerald-500/20">
              <div>
                <div className="text-xs text-slate-400 font-medium">Ganho Extra / Mês</div>
                <div className="text-xl font-bold text-white flex items-center gap-1 mt-1">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  +R$ {monthlyGain.toLocaleString('pt-BR')}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Ganho Extra / Ano</div>
                <div className="text-xl font-bold text-amber-400 flex items-center gap-1 mt-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  +R$ {yearlyGain.toLocaleString('pt-BR')}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onOpenLeadModal(targetLevel === 'medio' ? 'Ensino Médio' : 'Ensino Fundamental')}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.02]"
              >
                Garantir Meu Aumento Salarial
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-slate-500">
                Matrícula promocional de R$ 99/mês se paga já no primeiro mês de trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
