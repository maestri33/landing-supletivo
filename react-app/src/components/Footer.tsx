import React from 'react';
import { ShieldCheck, Award, Lock, BookOpen } from 'lucide-react';
import { buildAppUrl, useAttribution } from '../lib/attribution';

export const Footer: React.FC = () => {
  const { ref } = useAttribution();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="text-2xl font-bold text-white mb-4">
            Supletivo<span className="text-orange-500">Brasil</span>.
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
            Plataforma pioneira em Educação de Jovens e Adultos (EJA) a distância. Metodologia moderna, flexível e 100% legalizada conforme a Lei de Diretrizes e Bases da Educação (LDB nº 9.394/96).
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Publicação em Diário Oficial
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Award className="w-4 h-4 text-orange-400" /> Reconhecido pelo MEC / CEE
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Lock className="w-4 h-4 text-emerald-400" /> Plataforma Segura SSL
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-4">Navegação</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
            <li><a href="#elegibilidade" className="hover:text-white transition-colors">Simulador de Idade</a></li>
            <li><a href="#grade-curricular" className="hover:text-white transition-colors">Grade Curricular</a></li>
            <li><a href="#calculadora-salarial" className="hover:text-white transition-colors">Calculadora Salarial</a></li>
            <li><a href="#validacao-oficial" className="hover:text-white transition-colors">Diário Oficial</a></li>
            <li><a href="#valores" className="hover:text-white transition-colors">Investimento</a></li>
            <li><a href="#duvidas" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-4">Ambiente do Aluno & Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a 
                href={buildAppUrl('/login')} 
                target="_blank" 
                rel="noreferrer" 
                className="text-orange-400 hover:text-orange-300 transition-colors font-medium flex items-center gap-1"
                data-cta="footer-login"
              >
                Acessar Portal do Aluno →
              </a>
            </li>
            <li>
              <a 
                href={buildAppUrl('/termos')} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
                data-cta="footer-termos"
              >
                Termos de Uso
              </a>
            </li>
            <li>
              <a 
                href={buildAppUrl('/privacidade')} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
                data-cta="footer-privacidade"
              >
                Política de Privacidade (LGPD)
              </a>
            </li>
            <li>
              <a 
                href={buildAppUrl('/validar')} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
                data-cta="footer-validar"
              >
                Consulta de Autenticidade
              </a>
            </li>
          </ul>
          {ref && (
            <div className="mt-4 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400">
              Afiliado parceiro: <strong className="text-emerald-400">{ref}</strong>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Supletivo Brasil Educação Continuada. Todos os direitos reservados.</p>
        <p className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-orange-400" />
          Conclusão rápida e legalizada do Ensino Fundamental e Médio.
        </p>
      </div>
    </footer>
  );
};
