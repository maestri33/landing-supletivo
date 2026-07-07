/**
 * Destino único de todos os CTAs da página.
 * Configurável via PUBLIC_APP_URL (.env). Fallbacks:
 *  - dev:   http://localhost:3000
 *  - build: https://app.supletivo.net.br
 */
const rawAppUrl =
  import.meta.env.PUBLIC_APP_URL ??
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://app.supletivo.net.br');

// sem barra final: evita ref colado em path duplicado e 301 no destino
export const APP_URL: string = rawAppUrl.replace(/\/+$/, '');

export const BRAND = 'Supletivo Brasil';

/** Texto único de CTA em toda a página (regra de copy) */
export const CTA_LABEL = 'Quero meu diploma';

/** Site institucional da empresa (V7M) */
export const COMPANY_URL = 'https://v7m.org';
/** Página de vagas / trabalhe conosco */
export const CAREERS_URL = 'https://job.v7m.org';

/* ----------------------------------------------------------------------------
 * Identificação legal do fornecedor (CDC art. 31 / LGPD art. 9).
 * Sem PUBLIC_CNPJ, o rodapé omite a linha do CNPJ em vez de exibir um número
 * falso — placeholder em produção é bloqueador jurídico.
 * -------------------------------------------------------------------------- */
/** CNPJ real da PJ (vazio = não renderiza; não inventar placeholder) */
export const CNPJ: string = (import.meta.env.PUBLIC_CNPJ ?? '').trim();
