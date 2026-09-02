import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="text-2xl font-extrabold text-white mb-3">
            Supletivo<span className="text-orange-500">Brasil</span>.
          </div>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed mb-4">
            Plataforma pioneira em Educação de Jovens e Adultos (EJA 100% online) no Brasil. Capacitando milhares de brasileiros a concluírem seus estudos com certificação oficial válida em todo o território nacional.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
            <ShieldCheck className="w-4 h-4" /> Certificação válida pelo MEC e Diário Oficial
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
            <li><a href="#elegibilidade" className="hover:text-white transition-colors">Simulador de Idade</a></li>
            <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos de Alunos</a></li>
            <li><a href="#valores" className="hover:text-white transition-colors">Investimento</a></li>
            <li><a href="#duvidas" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal & Segurança</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="text-slate-400">Lei nº 9.394/1996 (LDB)</span></li>
            <li><span className="text-slate-400">Resolução CNE/CEB nº 01/2021</span></li>
            <li><a href="https://app.supletivo.net.br/termos" className="hover:text-white transition-colors">Termos de Uso</a></li>
            <li><a href="https://app.supletivo.net.br/privacidade" className="hover:text-white transition-colors">Política de Privacidade (LGPD)</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Supletivo Brasil. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1">
          Feito com <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> para transformar vidas pela educação.
        </p>
      </div>
    </footer>
  );
};
