import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';
import { buildAppUrl } from '../lib/attribution';

const BRAZILIAN_STATES = [
  { uf: 'SP', name: 'São Paulo', cee: 'CEE-SP / Parecer Normativo', prazos: '30 a 60 dias' },
  { uf: 'RJ', name: 'Rio de Janeiro', cee: 'CEE-RJ / Resolução Vigente', prazos: '30 a 60 dias' },
  { uf: 'MG', name: 'Minas Gerais', cee: 'CEE-MG / Portaria Estadual', prazos: '30 a 60 dias' },
  { uf: 'BA', name: 'Bahia', cee: 'CEE-BA / Homologação Oficial', prazos: '45 a 60 dias' },
  { uf: 'PR', name: 'Paraná', cee: 'CEE-PR / Amparo Legal', prazos: '30 a 45 dias' },
  { uf: 'RS', name: 'Rio Grande do Sul', cee: 'CEE-RS / Parecer Estadual', prazos: '30 a 60 dias' },
  { uf: 'PE', name: 'Pernambuco', cee: 'CEE-PE / Registro Nominal', prazos: '45 a 60 dias' },
  { uf: 'CE', name: 'Ceará', cee: 'CEE-CE / Portaria EJA', prazos: '30 a 60 dias' },
  { uf: 'GO', name: 'Goiás', cee: 'CEE-GO / Sistema Estadual', prazos: '30 a 45 dias' },
  { uf: 'DF', name: 'Distrito Federal', cee: 'SEEDF / Diário Oficial do DF', prazos: '30 a 45 dias' },
  { uf: 'SC', name: 'Santa Catarina', cee: 'CEE-SC / Homologação', prazos: '30 a 45 dias' },
  { uf: 'OUTRO', name: 'Demais Estados (Todo o Brasil)', cee: 'Validade Nacional (LDB 9.394/96 Art. 38)', prazos: '30 a 60 dias' },
];

interface OfficialValidationProps {
  onOpenLeadModal: (course?: 'medio' | 'fundamental' | 'ambos') => void;
}

export const OfficialValidation: React.FC<OfficialValidationProps> = ({ onOpenLeadModal }) => {
  const [selectedUf, setSelectedUf] = useState<string>('SP');
  const currentState = BRAZILIAN_STATES.find((s) => s.uf === selectedUf) || BRAZILIAN_STATES[0];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="validacao-oficial">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4" />
            Amparo Jurídico & Diário Oficial
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Seu certificado é <span className="text-emerald-400">100% oficial</span>, com publicação nominal no Diário Oficial.
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Não é curso livre. É conclusão oficial amparada pelo <strong>Artigo 38 da Lei Federal nº 9.394/96 (LDB)</strong>. Você pode prestar qualquer concurso público, ingressar na faculdade e apresentar para promoções em empresas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Simulador de Verificação por Estado */}
          <div className="lg:col-span-2 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                Consulta de Registro Estadual
              </h3>
              <div className="flex items-center gap-2">
                <label htmlFor="uf-select" className="text-xs text-slate-400 font-medium">Seu Estado:</label>
                <select
                  id="uf-select"
                  value={selectedUf}
                  onChange={(e) => setSelectedUf(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white text-sm font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  {BRAZILIAN_STATES.map((state) => (
                    <option key={state.uf} value={state.uf}>
                      {state.uf} - {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Órgão Regulador</span>
                <span className="text-sm font-bold text-emerald-400">{currentState.cee}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Prazo de Emissão</span>
                <span className="text-sm font-bold text-white">{currentState.prazos}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Validade Territorial</span>
                <span className="text-sm font-bold text-orange-400">Nacional (Todo Brasil)</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Publicação Nominal:</strong> Seu nome, CPF e número de registro saem no Diário Oficial do Estado para consulta pública eterna.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Código de Autenticidade Digital:</strong> Certificado emitido com QR Code e chave de validação instantânea no portal.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Histórico Escolar Completo:</strong> Documento timbrado com notas por disciplina e carga horária obrigatória.</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={buildAppUrl('/validar')}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                data-cta="consulta-portal"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Acessar Portal Oficial de Consulta no app.supletivo.net.br
              </a>
              <button
                type="button"
                onClick={() => onOpenLeadModal('ambos')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
                data-cta="validacao-matricula"
              >
                Iniciar Matrícula com Garantia Jurídica
              </button>
            </div>
          </div>

          {/* Card Resumo Lateral */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/40 rounded-2xl p-6 md:p-8">
            <FileCheck className="w-12 h-12 text-emerald-400 mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Aceito Onde Você Precisar:</h4>
            <ul className="space-y-3 text-sm text-slate-300 mt-4 mb-6">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Faculdades e Universidades (MEC)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Concursos Públicos Municipais, Estaduais e Federais
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Cursos Técnicos e Profissionalizantes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Promoção de Cargo e Vagas CLT
              </li>
            </ul>
            <div className="bg-emerald-900/30 p-3 rounded-xl border border-emerald-800/50 text-xs text-emerald-300">
              ⚡ Sem pegadinhas. Seu diploma é emitido por instituição credenciada pelos Conselhos de Educação.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
