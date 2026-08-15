/**
 * Campanha "A Linha Contínua" — client script.
 * Progressive enhancement: a página funciona sem este arquivo
 * (noscript mostra o fallback do diagnóstico; a linha fica completa).
 *
 * Eventos (seção 14 do handoff): lp_view, path_started, path_answered,
 * path_completed, result_viewed, trust_opened, offer_viewed, app_click.
 * NENHUM dado pessoal vai para o dataLayer — só chaves de resposta.
 */
import {
  CAMPAIGN_ID,
  VARIANT_ID,
  DIAG_QUESTIONS,
  computeResult,
  type DiagAnswers,
} from '../data/linha-continua';
import { track } from './track';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const STORAGE_KEY = 'lc-diagnostico-v1';
const OFFER_ID = 'oferta-lancamento-pix';
const QUESTION_IDS = DIAG_QUESTIONS.map((q) => q.id);
const TOTAL = QUESTION_IDS.length;

const base = { campaign_id: CAMPAIGN_ID, variant_id: VARIANT_ID };

/* ================================================================== */
/* lp_view — primeira visualização válida                              */
/* ================================================================== */
const deviceClass = window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop';
track('lp_view', {
  ...base,
  referrer: document.referrer ? new URL(document.referrer, location.href).hostname : 'direto',
  device_class: deviceClass,
});

/* ================================================================== */
/* app_click — clique em CTA que leva ao app (delegado)                */
/* ================================================================== */
document.addEventListener('click', (e) => {
  const target = e.target as Element | null;
  const cta = target?.closest<HTMLAnchorElement>('a[data-cta]');
  if (!cta) return;
  const href = cta.getAttribute('href') ?? '';
  if (!href.startsWith('http')) return; // âncoras internas não são app_click
  track('app_click', { ...base, cta_id: cta.dataset.cta, offer_id: OFFER_ID });
});

/* ================================================================== */
/* Diagnóstico                                                         */
/* ================================================================== */
const diagApp = document.querySelector<HTMLElement>('[data-diag]');

function loadAnswers(): DiagAnswers {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as DiagAnswers;
    // saneamento: só chaves conhecidas
    const clean: DiagAnswers = {};
    for (const q of DIAG_QUESTIONS) {
      const v = parsed[q.id];
      if (v && q.options.some((o) => o.key === v)) clean[q.id] = v;
    }
    return clean;
  } catch {
    return {};
  }
}

function saveAnswers(a: DiagAnswers): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* storage indisponível: a sessão atual continua funcionando */
  }
}

function optionLabel(qid: string, key: string): string {
  const q = DIAG_QUESTIONS.find((x) => x.id === qid);
  return q?.options.find((o) => o.key === key)?.label ?? key;
}

if (diagApp) {
  diagApp.hidden = false;

  const cards = Array.from(diagApp.querySelectorAll<HTMLElement>('[data-diag-card]'));
  const backBtn = diagApp.querySelector<HTMLButtonElement>('[data-diag-back]')!;
  const stepNow = diagApp.querySelector<HTMLElement>('[data-diag-step-now]')!;
  const bar = diagApp.querySelector<HTMLElement>('[data-diag-bar]')!;
  const barFill = diagApp.querySelector<HTMLElement>('[data-diag-bar-fill]')!;
  const ufSelect = diagApp.querySelector<HTMLSelectElement>('[data-diag-uf]')!;
  const ufError = diagApp.querySelector<HTMLElement>('[data-diag-error="estado"]')!;
  const ufNext = diagApp.querySelector<HTMLButtonElement>('[data-diag-next="estado"]')!;

  const resultSection = document.getElementById('resultado')!;
  const resultBody = resultSection.querySelector<HTMLElement>('[data-result-body]')!;
  const resultError = resultSection.querySelector<HTMLElement>('[data-result-error]')!;
  const live = resultSection.querySelector<HTMLElement>('[data-result-live]')!;

  let answers = loadAnswers();
  let current = 0;
  let startedAt: number | null = null;
  let completed = false;

  const answeredCount = (): number => QUESTION_IDS.filter((id) => answers[id]).length;

  function showCard(index: number, direction: 'in' | 'back' = 'in'): void {
    current = index;
    cards.forEach((card, i) => {
      card.hidden = i !== index;
      card.removeAttribute('data-anim');
    });
    const card = cards[index];
    if (!card) return;
    if (!REDUCED) {
      card.setAttribute('data-anim', direction === 'in' ? 'in' : 'in');
    }
    stepNow.textContent = String(index + 1);
    bar.setAttribute('aria-valuenow', String(answeredCount()));
    barFill.style.width = `${(answeredCount() / TOTAL) * 100}%`;
    backBtn.hidden = index === 0;
    // foco vai para a pergunta (teclado/leitor de tela não se perdem)
    const legend = card.querySelector('legend');
    if (legend) {
      legend.setAttribute('tabindex', '-1');
      (legend as HTMLElement).focus({ preventScroll: true });
    }
  }

  function paintAnswers(): void {
    for (const q of DIAG_QUESTIONS) {
      const v = answers[q.id];
      diagApp
        .querySelectorAll<HTMLButtonElement>(`[data-opt][data-q="${q.id}"]`)
        .forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.key === v)));
      if (q.id === 'estado' && v) ufSelect.value = v;
    }
  }

  function firstUnanswered(): number {
    const i = QUESTION_IDS.findIndex((id) => !answers[id]);
    return i === -1 ? TOTAL - 1 : i;
  }

  function answer(qid: string, key: string): void {
    if (startedAt === null) {
      startedAt = performance.now();
      track('path_started', { ...base, question_id: qid });
    }
    answers = { ...answers, [qid]: key };
    saveAnswers(answers);
    paintAnswers();
    track('path_answered', {
      ...base,
      question_id: qid,
      answer_key: key,
      step_index: QUESTION_IDS.indexOf(qid as (typeof QUESTION_IDS)[number]),
    });
    lineBoost(answeredCount() / TOTAL);

    const idx = QUESTION_IDS.indexOf(qid as (typeof QUESTION_IDS)[number]);
    if (idx < TOTAL - 1) {
      // feedback claro antes de avançar (não avança "no escuro")
      window.setTimeout(() => showCard(idx + 1), REDUCED ? 0 : 240);
    } else {
      window.setTimeout(finish, REDUCED ? 0 : 280);
    }
  }

  function finish(): void {
    resultSection.hidden = false;
    resultBody.hidden = false;
    resultError.hidden = true;
    try {
      const r = computeResult(answers);
      resultSection.querySelector<HTMLElement>('[data-result-path]')!.textContent = r.pathLabel;
      resultSection.querySelector<HTMLElement>('[data-result-why]')!.textContent = r.pathWhy;

      const known = resultSection.querySelector<HTMLElement>('[data-result-known]')!;
      known.replaceChildren(...r.known.map((t) => Object.assign(document.createElement('li'), { textContent: t })));
      const pending = resultSection.querySelector<HTMLElement>('[data-result-pending]')!;
      pending.replaceChildren(...r.pending.map((t) => Object.assign(document.createElement('li'), { textContent: t })));

      const answersList = resultSection.querySelector<HTMLElement>('[data-result-answers]')!;
      answersList.replaceChildren(
        ...DIAG_QUESTIONS.map((q) =>
          Object.assign(document.createElement('li'), {
            textContent: `${q.title} ${answers[q.id] ? optionLabel(q.id, answers[q.id]!) : '—'}`,
          })
        )
      );

      // aria-live anuncia apenas título + resumo
      live.textContent = `Seu próximo passo pode começar por aqui. Caminho possível: ${r.pathLabel}. Direcionamento inicial — documentos, regras e disponibilidade serão confirmados antes da matrícula.`;

      completed = true;
      const elapsed = startedAt === null ? 0 : Math.round(performance.now() - startedAt);
      track('path_completed', {
        ...base,
        result_key: answers.etapa ?? 'nao-sei',
        elapsed_ms: elapsed,
      });
      lineBoost(1);
      resultSection.setAttribute('data-entering', '');
      // #resultado saiu de `hidden`: recalcular marcos da linha
      window.dispatchEvent(new Event('lc:relayout'));
      resultSection.scrollIntoView(REDUCED ? {} : { behavior: 'smooth', block: 'start' });
    } catch {
      resultBody.hidden = true;
      resultError.hidden = false;
      resultSection.scrollIntoView(REDUCED ? {} : { behavior: 'smooth' });
    }
  }

  // opções em botão: seleciona com feedback e avança
  diagApp.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach((btn) => {
    btn.addEventListener('click', () => answer(btn.dataset.q!, btn.dataset.key!));
  });

  // estado (select): avanço explícito com validação
  ufNext.addEventListener('click', () => {
    if (!ufSelect.value) {
      ufError.hidden = false;
      ufSelect.setAttribute('aria-invalid', 'true');
      ufSelect.focus();
      return;
    }
    ufError.hidden = true;
    ufSelect.removeAttribute('aria-invalid');
    answer('estado', ufSelect.value);
  });

  ufSelect.addEventListener('change', () => {
    if (ufSelect.value) ufError.hidden = true;
  });

  backBtn.addEventListener('click', () => showCard(Math.max(0, current - 1), 'back'));

  // refazer / tentar de novo
  resultSection.querySelector('[data-result-redo]')?.addEventListener('click', () => {
    answers = {};
    saveAnswers(answers);
    completed = false;
    paintAnswers();
    resultSection.hidden = true;
    showCard(0);
    document.getElementById('diagnostico')?.scrollIntoView(REDUCED ? {} : { behavior: 'smooth' });
  });
  resultSection.querySelector('[data-result-retry]')?.addEventListener('click', finish);

  // retomada: respostas persistidas — volta de onde parou
  paintAnswers();
  if (answeredCount() === TOTAL && !completed) {
    // já respondeu tudo em visita anterior: oferece o resultado direto
    finish();
  } else {
    showCard(firstUnanswered());
  }

  /* result_viewed: resultado visível em pelo menos 50% */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && completed) {
            track('result_viewed', {
              ...base,
              result_key: answers.etapa ?? 'nao-sei',
              pending_checks_count: 3,
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    io.observe(resultSection.querySelector('.lc-result-card') ?? resultSection);
  }
}

/* ================================================================== */
/* A Linha — progresso de scroll + boost das respostas                 */
/* ================================================================== */
const lineProgress = document.querySelector<HTMLElement>('[data-lc-line-progress]');
const dotsWrap = document.querySelector<HTMLElement>('[data-lc-line-dots]');
const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-lc-section]'));

let boost = 0;
let milestoneFractions: { el: HTMLElement; frac: number; dot?: HTMLSpanElement }[] = [];

function layoutLine(): void {
  const doc = document.documentElement;
  const docH = Math.max(doc.scrollHeight, 1);
  milestoneFractions = sections.map((el) => ({
    el,
    frac: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / docH)),
  }));
  if (dotsWrap && dotsWrap.childElementCount === 0) {
    for (const m of milestoneFractions) {
      const dot = document.createElement('span');
      dot.className = 'lc-line-dot';
      dot.style.top = `${(m.frac * 100).toFixed(2)}%`;
      dotsWrap.appendChild(dot);
      m.dot = dot;
    }
  } else if (dotsWrap) {
    milestoneFractions.forEach((m, i) => {
      const dot = dotsWrap.children[i] as HTMLSpanElement | undefined;
      if (dot) dot.style.top = `${(m.frac * 100).toFixed(2)}%`;
      m.dot = dot;
    });
  }
}

/** respostas do diagnóstico empurram a linha (seção 5 do handoff) */
function lineBoost(stepFrac: number): void {
  if (!milestoneFractions.length) layoutLine();
  const diagFrac = milestoneFractions.find((m) => m.el.dataset.lcSection === 'diagnostico')?.frac ?? 0;
  const resultFrac = milestoneFractions.find((m) => m.el.dataset.lcSection === 'resultado')?.frac ?? 0.3;
  boost = Math.max(boost, diagFrac + stepFrac * Math.max(resultFrac - diagFrac, 0.02));
  paintLine();
}

function paintLine(): void {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const scrollFrac = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
  const p = Math.max(scrollFrac, boost);

  if (lineProgress) lineProgress.style.transform = `scaleY(${p})`;
  for (const m of milestoneFractions) {
    if (!m.dot) continue;
    if (p >= m.frac) m.dot.setAttribute('data-lit', '');
    else m.dot.removeAttribute('data-lit');
  }
}

if (!REDUCED && lineProgress) {
  layoutLine();
  let ticking = false;
  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      paintLine();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    layoutLine();
    paintLine();
  });
  // seções reveladas em runtime (#resultado sai de `hidden`): recalcular
  window.addEventListener('lc:relayout', () => {
    layoutLine();
    paintLine();
  });
  paintLine();
}

/* ================================================================== */
/* trust_opened / offer_viewed / FAQ deep-link                         */
/* ================================================================== */
document.querySelectorAll<HTMLDetailsElement>('[data-trust]').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) track('trust_opened', { ...base, item_id: d.dataset.trust });
  });
});

const offerSection = document.getElementById('oferta');
if (offerSection && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          track('offer_viewed', {
            ...base,
            offer_id: OFFER_ID,
            price: 999,
            availability_state: 'nao_instrumentada', // sem fonte de servidor nesta versão
          });
          io.disconnect();
        }
      }
    },
    { threshold: 0.5 }
  );
  io.observe(offerSection);
}

/* deep-link de FAQ: #faq-<id> abre o item correspondente */
function openFaqFromHash(): void {
  if (!location.hash.startsWith('#faq-')) return;
  const el = document.getElementById(location.hash.slice(1));
  if (el instanceof HTMLDetailsElement) el.open = true;
}
openFaqFromHash();
window.addEventListener('hashchange', openFaqFromHash);
