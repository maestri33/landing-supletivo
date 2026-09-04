import React from 'react';
import { STORIES } from '../data/content';
import { Quote, CheckCircle2, Star } from 'lucide-react';

export const StoriesSection: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-50 rounded-3xl my-10 border border-slate-200/60" id="depoimentos">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          Histórias de Sucesso
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Quem deu a virada com o Supletivo Brasil
        </h2>
        <p className="text-slate-600 text-lg">
          Veja como a conquista do diploma transformou a carreira de quem não desistiu do futuro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-orange-50 text-orange-700 rounded-md border border-orange-100">
                  {s.tag}
                </span>
              </div>

              <Quote className="w-8 h-8 text-slate-200 mb-3" />
              <p className="text-slate-700 italic text-sm md:text-base leading-relaxed mb-6">
                "{s.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
              <img
                src={s.avatar}
                alt={s.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-400/50 shadow"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-1.5">
                  {s.name}
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {s.age} anos • {s.city}
                </p>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  {s.conquest}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
