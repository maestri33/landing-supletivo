/**
 * Captura, persistência e propagação de atribuição de afiliados e campanhas.
 * 
 * Regras de Negócio:
 * 1. First-touch para `ref`: o primeiro ref capturado vence e NÃO é sobrescrito por visitas subsequentes sem ref.
 * 2. Se o usuário chegar com um NOVO `ref`, o ref mais recente assume.
 * 3. Persistência dupla: localStorage (chave `sb_attribution`) + Cookie (chave `sb_ref`) com validade de 90 dias.
 * 4. URLs de checkout/inscrição apontam para `https://app.supletivo.net.br` mantendo todos os parâmetros de rastreamento.
 */
import { useState, useEffect } from 'react';

export const APP_BASE_URL = 'https://app.supletivo.net.br';

export const ATTR_KEYS = [
  'ref',
  'aff',
  'promoter',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'src',
  'sck',
] as const;

export type AttrKey = typeof ATTR_KEYS[number];
export type Attribution = Partial<Record<AttrKey, string>> & {
  captured_at?: string;
};

const STORAGE_KEY = 'sb_attribution';
const COOKIE_KEY = 'sb_ref';
const COOKIE_EXPIRY_DAYS = 90;

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(prefix) === 0) {
      return decodeURIComponent(c.substring(prefix.length));
    }
  }
  return null;
}

export function getStoredAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

export function getAffiliateRef(): string | null {
  const stored = getStoredAttribution();
  if (stored?.ref) return stored.ref;
  return getCookie(COOKIE_KEY);
}

export function parseAttributionParams(search: string = ''): Partial<Attribution> {
  const result: Partial<Attribution> = {};
  if (!search) return result;

  const params = new URLSearchParams(search);
  for (const key of ATTR_KEYS) {
    const val = params.get(key);
    if (val && val.trim() !== '') {
      result[key] = val.trim();
    }
  }

  // Mapeamentos de sinônimos para `ref`
  if (!result.ref) {
    if (result.aff) result.ref = result.aff;
    else if (result.promoter) result.ref = result.promoter;
  }

  return result;
}

export function initAttribution(customSearch?: string): Attribution | null {
  if (typeof window === 'undefined') return null;

  const search = customSearch !== undefined ? customSearch : window.location.search;
  const currentParams = parseAttributionParams(search);
  const existing = getStoredAttribution() || {};
  const cookieRef = getCookie(COOKIE_KEY);

  const merged: Attribution = { ...existing };

  // Atualiza ou insere novos parâmetros da URL
  for (const [k, v] of Object.entries(currentParams)) {
    if (v) {
      merged[k as AttrKey] = v;
    }
  }

  // Regra de First-Touch do Afiliado: se não tem novo na URL mas tem no Cookie ou LocalStorage, mantém
  if (!merged.ref && cookieRef) {
    merged.ref = cookieRef;
  }

  if (merged.ref) {
    setCookie(COOKIE_KEY, merged.ref, COOKIE_EXPIRY_DAYS);
  }

  if (Object.keys(merged).length > 0) {
    merged.captured_at = merged.captured_at || new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // LocalStorage desabilitado ou indisponível
    }
    return merged;
  }

  return null;
}

export function getAttribution(): Attribution | null {
  return getStoredAttribution() || initAttribution();
}

/**
 * Constrói uma URL para `app.supletivo.net.br` repassando todos os parâmetros de afiliado e adicionais.
 */
export function buildAppUrl(
  path: string = '',
  extraParams?: Record<string, string | number | boolean | undefined | null>
): string {
  const cleanPath = path.startsWith('/') ? path : (path ? `/${path}` : '/');
  const base = `${APP_BASE_URL}${cleanPath}`;
  
  const attr = getAttribution() || {};
  const searchParams = new URLSearchParams();

  // 1. Anexa parâmetros de atribuição (ref, UTMs, etc.)
  for (const key of ATTR_KEYS) {
    const val = attr[key];
    if (val) searchParams.set(key, val);
  }

  // 2. Anexa parâmetros extras específicos da ação
  if (extraParams) {
    for (const [k, v] of Object.entries(extraParams)) {
      if (v !== undefined && v !== null && v !== '') {
        searchParams.set(k, String(v));
      }
    }
  }

  const qs = searchParams.toString();
  return qs ? `${base}?${qs}` : base;
}

/**
 * Decora tags e botões existentes com a URL atualizada para o app com afiliados.
 */
export function decorateCtas(): void {
  if (typeof document === 'undefined') return;
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-cta]');
  links.forEach((link) => {
    const originalHref = link.getAttribute('href') || '';
    if (originalHref.includes(APP_BASE_URL) || originalHref.startsWith('/')) {
      const url = new URL(originalHref, APP_BASE_URL);
      const appUrl = buildAppUrl(url.pathname);
      link.setAttribute('href', appUrl);
    }
  });
}

/**
 * Hook React para acessar a atribuição no ciclo de vida dos componentes.
 */
export function useAttribution() {
  const [attribution, setAttribution] = useState<Attribution | null>(null);

  useEffect(() => {
    const attr = initAttribution();
    setAttribution(attr);
    decorateCtas();
  }, []);

  return {
    attribution,
    ref: attribution?.ref || null,
    buildAppUrl,
  };
}
