import React, { useState, useEffect } from 'react';
import { HERO_CARDS } from '../data/content';

interface HeroSectionProps {
  onOpenLeadModal: (course?: 'medio' | 'fundamental' | 'ambos') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLeadModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes('fund')) {
      onOpenLeadModal('fundamental');
    } else if (query.includes('méd') || query.includes('med')) {
      onOpenLeadModal('medio');
    } else {
      onOpenLeadModal('ambos');
    }
  };

  return (
    <div className="c6-hero" id="hero">
      <nav className="c6-nav" aria-label="Navegação Principal">
        <div className="c6-logo">
          Supletivo<span>Brasil</span>.
        </div>

        <div className="c6-menu">
          <a href="#como-funciona">Como Funciona</a>
          <a href="#elegibilidade">Requisitos</a>
          <a href="#depoimentos">Histórias Reais</a>
          <a href="#valores">Planos & Valores</a>
          <a href="#duvidas">Dúvidas</a>
        </div>

        <div className="c6-actions">
          <a href="https://app.supletivo.net.br/login" className="c6-login" target="_blank" rel="noreferrer">
            Área do Aluno
          </a>
          <button
            type="button"
            onClick={() => onOpenLeadModal('ambos')}
            className="c6-trial cursor-pointer border-none"
          >
            Matricule-se Já
          </button>
        </div>

        <button
          className={`c6-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Alternar menu de navegação"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`c6-mobile-nav ${menuOpen ? 'open' : ''}`}>
          <a href="#como-funciona" onClick={closeMenu}>Como Funciona</a>
          <a href="#elegibilidade" onClick={closeMenu}>Requisitos</a>
          <a href="#depoimentos" onClick={closeMenu}>Histórias Reais</a>
          <a href="#valores" onClick={closeMenu}>Planos & Valores</a>
          <a href="#duvidas" onClick={closeMenu}>Dúvidas Frequentes</a>
          <a
            href="https://app.supletivo.net.br/login"
            onClick={closeMenu}
            style={{ marginTop: 15, color: 'var(--accent)' }}
          >
            Área do Aluno
          </a>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              onOpenLeadModal('ambos');
            }}
            className="c6-trial w-full mt-2 cursor-pointer border-none text-center"
          >
            Matricule-se Já
          </button>
        </div>
      </nav>

      <main className="c6-main">
        <div className="c6-left">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 border border-emerald-200/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Certificado Válido pelo MEC
          </div>

          <h1 className="c6-title">
            Estude.<br />
            Conclua.<br />
            Dê a Virada.
          </h1>

          <p className="text-slate-600 text-lg md:text-xl font-normal max-w-lg mb-8 leading-relaxed">
            Conclua seu <strong>Ensino Fundamental ou Médio</strong> 100% online no seu próprio ritmo, com publicação oficial em Diário Oficial.
          </p>

          <div className="c6-search-container">
            <form className="c6-search" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Qual curso você precisa? (Médio ou Fundamental)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar curso pretendido"
              />
              <button type="submit">Iniciar Matrícula</button>
            </form>
          </div>
        </div>

        <div className="c6-right" role="region" aria-label="Cursos e Certificação em Destaque">
          {HERO_CARDS.map((card, i) => (
            <div
              className="c6-card group"
              key={i}
              onClick={() => onOpenLeadModal(i === 1 ? 'fundamental' : 'medio')}
              tabIndex={0}
              role="button"
              aria-label={`Ver informações sobre ${card.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenLeadModal(i === 1 ? 'fundamental' : 'medio');
                }
              }}
            >
              <img src={card.img} alt={card.alt} loading="eager" />
              <div className="c6-card-side-content">
                <div className="c6-vertical-text">{card.label}</div>
              </div>
              <div className="c6-card-content">
                <div className="c6-card-title">
                  {card.titleTop}<br />{card.titleBottom}
                </div>
                <div className="c6-card-topics">
                  <span className="num">{card.num}</span>
                  <span className="label">{card.labelTopic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="c6-bottom-info">
        <h3>Certificado <span>válido em todo o território nacional</span> para faculdades e concursos.</h3>
      </footer>
    </div>
  );
};
