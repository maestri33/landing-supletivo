import React, { useState } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, MapPin } from 'lucide-react';

const BRAZILIAN_STATES = [
  { uf: 'SP', name: 'São Paulo' },
  { uf: 'RJ', name: 'Rio de Janeiro' },
  { uf: 'MG', name: 'Minas Gerais' },
  { uf: 'PR', name: 'Paraná' },
  { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'BA', name: 'Bahia' },
  { uf: 'GO', name: 'Goiás' },
  { uf: 'PE', name: 'Pernambuco' },
  { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' },
];

export const OfficialValidation: React.FC = () => {
  const [selectedUf, setSelectedUf] = useState('SP');

  const currentState = BRAZILIAN_STATES.find((s) => s.uf === selectedUf) || BRAZILIAN_STATES[0];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="validacao-oficial">
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-8 md:p-14 text-white shadow-2xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              Segurança Jurídica & Amparo Legal
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Validação Nacional & Publicação em <span className="text-emerald-400">Diário Oficial</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              Nosso método é 100% amparado pela <strong>Lei Federal de Diretrizes e Bases da Educação Nacional (Lei nº 9.394/96)</strong> e pelas Resoluções dos Conselhos Estaduais de Educação (CEE).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-100 text-base">Publicação Nominal</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Seu nome e CPF são publicados no Diário Oficial do Estado ao término, comprovando a autenticidade perante qualquer órgão público.
                </p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-100 text-base">Registro SISTEC / MEC</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Certificado inserido no sistema oficial federal de dados da educação brasileira, aceito em universidades e empresas.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 shadow-inner">
              <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  Consulta de Validade por Estado
                </div>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                  100% Válido
                </span>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Selecione sua Unidade Federativa:
                </label>
                <select
                  value={selectedUf}
                  onChange={(e) => setSelectedUf(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {BRAZILIAN_STATES.map((state) => (
                    <option key={state.uf} value={state.uf}>
                      {state.name} ({state.uf})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-750 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Jurisdição:</span>
                  <span className="font-semibold text-slate-200">{currentState.name} - {currentState.uf}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Amparo:</span>
                  <span className="font-semibold text-slate-200">LDB Art. 37 & 38</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Aceitação Faculdade:</span>
                  <span className="font-semibold text-emerald-400">Aprovado (MEC)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Concursos Públicos:</span>
                  <span className="font-semibold text-emerald-400">Aceito em todo o Brasil</span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <p className="text-[11px] text-slate-400">
                  Certificado emitido por instituição regular e credenciada em conformidade com as normas educacionais brasileiras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
