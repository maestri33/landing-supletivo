import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitLead } from '../lib/supabase';
import type { LeadSubmission } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: 'medio' | 'fundamental' | 'ambos';
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  defaultCourse = 'ambos',
}) => {
  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    email: '',
    phone: '',
    course: defaultCourse,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await submitLead(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        // redirect to app onboarding after brief confirmation
        window.location.href = `https://app.supletivo.net.br?curso=${formData.course}&nome=${encodeURIComponent(
          formData.name
        )}`;
      }, 1800);
    } else {
      setErrorMsg(res.error || 'Erro ao enviar. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Matrícula Pré-Aprovada!</h3>
            <p className="text-slate-600 mb-4">
              Recebemos seus dados com sucesso. Redirecionando você para o ambiente seguro de matrícula...
            </p>
            <div className="flex justify-center items-center gap-2 text-emerald-700 font-semibold text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Carregando portal...
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                Inscrição 100% Online
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Garanta sua Vaga Promocional</h3>
              <p className="text-slate-600 text-sm mt-1">
                Preencha abaixo para receber acesso imediato e garantir a taxa com desconto.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WhatsApp / Celular com DDD
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Curso Desejado
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-900 bg-white"
                >
                  <option value="medio">Ensino Médio (Rápido / 6 Meses)</option>
                  <option value="fundamental">Ensino Fundamental (EJA)</option>
                  <option value="ambos">Ambos (Fundamental + Médio)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Concluir Inscrição
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
