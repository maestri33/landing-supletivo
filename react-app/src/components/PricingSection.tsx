import React from 'react';
import { Check, ShieldCheck, Zap, Lock, CreditCard } from 'lucide-react';
import { PRICE_INFO } from '../data/content';

interface PricingSectionProps {
  onOpenLeadModal: (course?: 'medio' | 'fundamental' | 'ambos') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="valores">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          Investimento Acessível
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Conquiste seu certificado sem pesar no bolso
        </h2>
        <p className="text-slate-600 text-lg">
          Taxa única promocional com material didático, aulas gravadas e emissão do certificado inclusos.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-700">
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold uppercase px-6 py-2 rounded-bl-2xl shadow-md">
          {PRICE_INFO.economy}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-orange-400 font-bold text-sm uppercase tracking-wider">
              Acesso Completo EJA
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-1 mb-4">
              Ensino Fundamental ou Médio
            </h3>

            <div className="mb-6">
              <span className="text-slate-400 line-through text-lg mr-2">{PRICE_INFO.originalPrice}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white">
                  {PRICE_INFO.cardInstallments}
                </span>
                <span className="text-slate-300 text-sm">no cartão</span>
              </div>
              <p className="text-emerald-400 font-semibold text-sm mt-1 flex items-center gap-1.5">
                <Zap className="w-4 h-4 inline" /> ou {PRICE_INFO.pixTotal} à vista no Pix com desconto
              </p>
            </div>

            <ul className="space-y-3 mb-8 text-slate-300 text-sm md:text-base">
              {[
                'Acesso imediato à plataforma 24/7',
                'Videoaulas completas e apostilas digitais',
                'Simulados ilimitados com gabarito comentado',
                'Suporte e tutoria pedagógica',
                'Emissão do certificado oficial publicado no D.O.',
                'Sem mensalidades nem taxas extras',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onOpenLeadModal('ambos')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-500/30 transition-all text-center cursor-pointer text-base md:text-lg transform hover:-translate-y-0.5"
            >
              Garantir Valor Promocional
            </button>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base">Garantia Incondicional de 7 Dias</h4>
                  <p className="text-xs text-slate-400">Risco zero para sua decisão</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Experimente a plataforma por até 7 dias. Se você achar que o método não é para você, devolvemos 100% do seu dinheiro sem perguntas nem burocracia.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Lock className="w-4 h-4 text-orange-400" />
                <span>Pagamento 100% criptografado e seguro</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CreditCard className="w-4 h-4 text-orange-400" />
                <span>Parcelamento em até 12x ou Pix imediato</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
