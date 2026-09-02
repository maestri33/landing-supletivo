import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('mec');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto" id="duvidas">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          Tire suas Dúvidas
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          Tudo o que você precisa saber sobre a validade legal, prazos e metodologia do EJA.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-orange-300 shadow-md ring-1 ring-orange-200'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-base md:text-lg">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
