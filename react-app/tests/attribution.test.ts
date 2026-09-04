/**
 * Testes Unitários de Atribuição de Afiliados e Parâmetros de Campanhas (First-Touch).
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  initAttribution,
  buildAppUrl,
  getAffiliateRef,
  decorateCtas,
} from '../src/lib/attribution';

describe('Atribuição de Afiliados & Propagação de URLs', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = 'sb_ref=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  it('deve capturar e persistir o ref da URL com first-touch', () => {
    const attr = initAttribution('?ref=afiliado_vip123&utm_source=google');
    expect(attr).not.toBeNull();
    expect(attr?.ref).toBe('afiliado_vip123');
    expect(attr?.utm_source).toBe('google');

    expect(localStorage.getItem('sb_attribution')).toContain('afiliado_vip123');
    expect(document.cookie).toContain('sb_ref=afiliado_vip123');
  });

  it('deve respeitar first-touch: nova visita sem ref mantém o ref salvo anteriormente', () => {
    initAttribution('?ref=parceiro_original');
    expect(getAffiliateRef()).toBe('parceiro_original');

    // Segunda visita sem parâmetro ref
    const secondVisit = initAttribution('');
    expect(secondVisit?.ref).toBe('parceiro_original');
    expect(getAffiliateRef()).toBe('parceiro_original');
  });

  it('deve sobrescrever ref quando um novo ref explícito for informado', () => {
    initAttribution('?ref=parceiro_antigo');
    expect(getAffiliateRef()).toBe('parceiro_antigo');

    initAttribution('?ref=parceiro_novo');
    expect(getAffiliateRef()).toBe('parceiro_novo');
  });

  it('deve capturar múltiplos parâmetros de rastreamento (UTMs, gclid, fbclid)', () => {
    const attr = initAttribution('?utm_source=facebook&utm_medium=cpc&utm_campaign=black_friday&gclid=test12345');
    expect(attr?.utm_source).toBe('facebook');
    expect(attr?.utm_medium).toBe('cpc');
    expect(attr?.utm_campaign).toBe('black_friday');
    expect(attr?.gclid).toBe('test12345');
  });

  it('deve construir URL segura para https://app.supletivo.net.br repassando parâmetros de afiliados', () => {
    initAttribution('?ref=top_afiliado&utm_source=tiktok');

    const appUrl = buildAppUrl('/cadastro', { curso: 'medio', promo: '99' });
    expect(appUrl).toContain('https://app.supletivo.net.br/cadastro');
    expect(appUrl).toContain('ref=top_afiliado');
    expect(appUrl).toContain('utm_source=tiktok');
    expect(appUrl).toContain('curso=medio');
    expect(appUrl).toContain('promo=99');
  });

  it('deve construir URL base correta quando nenhum path ou parâmetro extra for fornecido', () => {
    initAttribution('?ref=promo2026');
    const appUrl = buildAppUrl();
    expect(appUrl).toBe('https://app.supletivo.net.br/?ref=promo2026');
  });

  it('deve construir URL limpa quando não houver atribuição', () => {
    const appUrl = buildAppUrl('/login');
    expect(appUrl).toBe('https://app.supletivo.net.br/login');
  });

  it('deve recuperar o ref a partir do cookie caso o localStorage tenha sido apagado', () => {
    document.cookie = 'sb_ref=cookie_promoter; path=/;';
    localStorage.clear();

    const attr = initAttribution('');
    expect(attr?.ref).toBe('cookie_promoter');
    expect(getAffiliateRef()).toBe('cookie_promoter');
  });

  it('deve decorar links e botões com data-cta', () => {
    initAttribution('?ref=decor_test');
    document.body.innerHTML = `
      <a href="https://app.supletivo.net.br/cadastro" data-cta="signup">Cadastrar</a>
      <a href="/faq">FAQ</a>
    `;

    decorateCtas();
    const link = document.querySelector('a[data-cta="signup"]') as HTMLAnchorElement;
    expect(link.href).toContain('ref=decor_test');
  });
});
