import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAttribution } from '../lib/attribution';

interface WhatsAppFloatingProps {
  onOpenLeadModal: (course?: string) => void;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ onOpenLeadModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useAttribution();

  const whatsappNumber = '5511999999999';
  const message = `Olá! Vim pelo site${ref ? ` (ref: ${ref})` : ''} e quero tirar dúvidas sobre a matrícula rápida no Supletivo Brasil.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-base">
                  SB
                </div>
                <span className="w-3 h-3 bg-emerald-400 border-2 border-white rounded-full absolute bottom-0 right-0"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Plantão de Dúvidas Online</h4>
                <p className="text-[11px] text-emerald-100">Atendimento Pedagógico Oficial</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-slate-50/50">
            <div className="p-3 bg-white rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed shadow-sm">
              👋 Olá! Tem alguma dúvida sobre a publicação no <strong>Diário Oficial</strong> ou sobre o prazo de conclusão do seu <strong>Ensino Médio</strong>?
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                Chamar no WhatsApp
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenLeadModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                Solicitar Ligação de Consultor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão Gatilho */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Atendimento via WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-all hover:scale-110 cursor-pointer relative"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center">1</span>
        </span>
      </button>
    </div>
  );
};
