---
version: alpha
name: Supletivo Brasil Design System
description: Modern, accessible, zero-friction Brazilian EJA educational platform design system.
colors:
  primary: "#0F172A"
  secondary: "#334155"
  tertiary: "#9A3412"
  neutral: "#F8FAFC"
  surface: "#FFFFFF"
  accent: "#C2410C"
  success: "#065F46"
  warning: "#92400E"
typography:
  h1:
    fontFamily: Outfit
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Outfit
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h3:
    fontFamily: Outfit
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Outfit
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Outfit
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Outfit
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  page-layout:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: 16px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: 16px
  button-success:
    backgroundColor: "{colors.success}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 14px
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-dark:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: 28px
  badge-accent:
    backgroundColor: "#FFEDD5"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    padding: 6px
  badge-warning:
    backgroundColor: "#FEF3C7"
    textColor: "{colors.warning}"
    rounded: "{rounded.full}"
    padding: 6px
  text-muted:
    textColor: "{colors.secondary}"
---

## Overview

O **Supletivo Brasil Design System** foi concebido sob o Princípio Zero-Atrito, priorizando inclusão, clareza, alta legibilidade e conversão direta para estudantes adultos que buscam a conclusão do Ensino Fundamental e Médio (EJA). A estética equilibra autoridade institucional e acolhimento humano.

## Colors

- **Primary (`#0F172A` - Deep Slate):** Utilizado para títulos de alto impacto, textos mestres e componentes escuros estruturantes.
- **Secondary (`#334155` - Slate Muted):** Subtítulos, parágrafos informativos e rótulos de baixa ênfase (contraste WCAG AAA).
- **Tertiary & Accent (`#9A3412` / `#C2410C` - High-Contrast Solar Orange):** Cores motrizes para botões de matrícula, ênfase interativa e badges com conformidade WCAG AA.
- **Success (`#065F46` - Deep Emerald):** Destaque para homologações oficiais, Diário Oficial, conformidade legal MEC e validações no simulador.
- **Warning (`#92400E` - Amber Contrast):** Avisos de prazos e alertas informativos.
- **Neutral (`#F8FAFC` - Off-White):** Fundo suave que reduz a fadiga visual.

## Typography

A família tipográfica **Outfit** é utilizada em toda a aplicação devido à sua geometria moderna e alta legibilidade em dispositivos móveis.

- **Títulos (`h1`, `h2`, `h3`):** Pesos 600 a 700 com kerning fechado (`-0.02em`) para autoridade editorial.
- **Corpo de texto (`body-lg`, `body-md`, `body-sm`):** Pesos 400 a 500 com espaçamento entre linhas generoso (`1.5` a `1.6`) para facilitar a leitura contínua.

## Layout

A grade segue o conceito mobile-first com transição fluida para desktops em contêineres máximos de `1600px` para o Hero e `1280px` (`max-w-7xl`) para as seções de conteúdo.

- **Espaçamentos padrão:** Escala geométrica de 8px a 48px (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`).
- **Touch targets:** Dimensões mínimas de toque de `44x44px` para todos os elementos interativos em dispositivos móveis.

## Elevation & Depth

- **Superfícies Leves:** Bordas sutis em `border-slate-200/80` combinadas com sombras difusas (`shadow-sm` a `shadow-xl`) com tintura da cor de fundo.
- **Superfícies Escuras:** Gradientes profundos (`from-slate-900 via-slate-850 to-slate-900`) com acentos em blur atmosférico verde/laranja.

## Shapes

- Raios de curvatura modernos e amigáveis: `8px` (`sm`) para inputs e tags, `16px` (`md`) a `24px` (`lg`) para cartões de benefícios e calculadoras, e `9999px` (`full`) para CTAs e crachás.

## Components

- **`page-layout`:** Estrutura base da aplicação.
- **`button-primary`:** Botão de chamada principal para matrícula com fundo laranja solar, contraste elevado (`> 4.5:1`) e cantos arredondados (`rounded-full`).
- **`button-success`:** Botão de confirmação de elegibilidade e avanço imediato.
- **`card-surface`:** Cartão padrão para calculadoras, depoimentos e tópicos da grade curricular.
- **`card-dark`:** Painel de segurança jurídica e validador do Diário Oficial.
- **`badge-accent` / `badge-warning`:** Indicadores contextuais de status.

## Do's and Don'ts

### Do's
- Utilize o acordeão horizontal nativo com transições CSS puras sem dependências externas pesadas.
- Priorize imagens de pessoas reais e contextuais ao público trabalhador brasileiro de EJA.
- Mantenha sempre contraste WCAG AA mínimo de `4.5:1` para todo texto informativo.
- Exiba feedback visual imediato em simuladores e calculadoras.

### Don'ts
- Não utilize animações invasivas ou bloqueios de tela sem possibilidade de dispensa rápida.
- Não insira cores hexadecimais arbitrárias no código JSX — consuma sempre os tokens do tema.
- Não oculte informações de preços ou validade jurídica em rodapés inacessíveis.
