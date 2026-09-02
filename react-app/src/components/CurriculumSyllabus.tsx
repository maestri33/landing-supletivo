import React, { useState } from 'react';
import { BookOpen, Calculator, Globe2, Atom, CheckCircle2, Clock } from 'lucide-react';

export const CurriculumSyllabus: React.FC = () => {
  const [activeArea, setActiveArea] = useState<number>(0);

  const areas = [
    {
      title: 'Linguagens & Códigos',
      icon: <BookOpen className="w-5 h-5 text-amber-500" />,
      tag: 'Português, Redação, Literatura, Artes e Inglês',
      description: 'Aprenda a interpretar textos, elaborar redações de forma clara e dominar a comunicação exigida no mercado.',
      modules: [
        'Interpretação e Compreensão Textual',
        'Gramática Aplicada e Redação Direta',
        'Literatura Brasileira e Contemporânea',
        'Inglês Instrumental para o Dia a Dia',
      ],
      timeEstimate: 'Aulas em vídeo de 15 min + apostilas digitais',
    },
    {
      title: 'Matemática & Tecnologias',
      icon: <Calculator className="w-5 h-5 text-blue-500" />,
      tag: 'Matemática Básica, Álgebra, Geometria e Finanças',
      description: 'Matemática prática e sem traumas, focada em raciocínio lógico, porcentagens e resolução de problemas cotidianos.',
      modules: [
        'Operações Fundamentais e Regra de Três',
        'Matemática Financeira e Porcentagens',
        'Equações e Análise de Gráficos',
        'Geometria Prática e Medidas',
      ],
      timeEstimate: 'Exercícios práticos com correção comentada',
    },
    {
      title: 'Ciências Humanas',
      icon: <Globe2 className="w-5 h-5 text-emerald-500" />,
      tag: 'História, Geografia, Filosofia e Sociologia',
      description: 'Entenda a formação da sociedade brasileira, geopolítica, cidadania, direitos trabalhistas e ética.',
      modules: [
        'História do Brasil e do Mundo Ocidental',
        'Geografia Física, Política e Urbana',
        'Cidadania, Constituição e Direitos',
        'Sociedade, Trabalho e Globalização',
      ],
      timeEstimate: 'Resumos ilustrados em PDF para download',
    },
    {
      title: 'Ciências da Natureza',
      icon: <Atom className="w-5 h-5 text-purple-500" />,
      tag: 'Biologia, Física e Química',
      description: 'Conceitos fundamentais da natureza, ecologia, corpo humano, saúde e energia explicados de forma simples e direta.',
      modules: [
        'Biologia Humana, Saúde e Meio Ambiente',
        'Química Cotidiana e Transformações',
        'Fundamentos de Física e Eletricidade',
        'Sustentabilidade e Recursos Naturais',
      ],
      timeEstimate: 'Simulados oficiais com pontuação instantânea',
    },
  ];

  return (
    <section id="conteudo" className="py-20 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Estrutura Pedagógica Completa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            O que você vai estudar no seu ritmo
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Conteúdo 100% alinhado à Base Nacional Comum Curricular (BNCC), direto ao ponto, sem enrolação.
          </p>
        </div>

        {/* Abas */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          {areas.map((area, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveArea(index)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all border ${
                activeArea === index
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {area.icon}
              {area.title}
            </button>
          ))}
        </div>

        {/* Card do Conteúdo Ativo */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {areas[activeArea].tag}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {areas[activeArea].title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-full w-fit">
              <Clock className="w-4 h-4 text-slate-500" />
              {areas[activeArea].timeEstimate}
            </div>
          </div>

          <p className="text-slate-700 mb-8 text-base leading-relaxed">
            {areas[activeArea].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {areas[activeArea].modules.map((mod, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
