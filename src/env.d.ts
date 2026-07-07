/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** URL do app de matrícula (destino dos CTAs) */
  readonly PUBLIC_APP_URL?: string;
  /**
   * CNPJ real da PJ que opera o site (CDC art. 31 / LGPD art. 9).
   * Vazio = rodapé omite a linha do CNPJ (ausência > número falso).
   */
  readonly PUBLIC_CNPJ?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
