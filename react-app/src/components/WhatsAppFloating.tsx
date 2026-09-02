import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface WhatsAppFloatingProps {
  onOpenLeadModal: () => void;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ onOpenLeadModal }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover de mensagem */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                SB
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Supletivo Brasil</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block animate-pulse"></span>
                  Plantão de Dúvidas Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs text-slate-700 leading-relaxed border border-slate-100">
              Olá! Quer terminar seu <strong>Ensino Médio ou Fundamental</strong> ainda este ano? Tire suas dúvidas com nossa equipe pedagógica agora mesmo.
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenLeadModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              Falar com Atendente Pedagógico
            </button>
          </div>
        </div>
      )}

      {/* Botão de Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
        aria-label="Atendimento via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
