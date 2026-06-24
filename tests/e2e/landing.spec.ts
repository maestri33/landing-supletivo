/**
 * E2E dos critérios de aceite: fluxos de ref, eventos do dataLayer,
 * elegibilidade e acessibilidade (axe).
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('atribuição de afiliados (ref)', () => {
  test('?ref=teste123 → todos os CTAs carregam ref + UTMs', async ({ page }) => {
    await page.goto('/?ref=teste123&utm_source=google&gclid=abc');
    const hrefs = await page.locator('a[data-cta]').evaluateAll((as) =>
      as.map((a) => (a as HTMLAnchorElement).href)
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const href of hrefs) {
      expect(href).toContain('ref=teste123');
      expect(href).toContain('utm_source=google');
      expect(href).toContain('gclid=abc');
    }
  });

  test('revisita sem ref mantém o primeiro ref (first-touch)', async ({ page }) => {
    await page.goto('/?ref=teste123');
    await page.goto('/');
    const href = await page.locator('a[data-cta="hero"]').getAttribute('href');
    expect(href).toContain('ref=teste123');
  });

  test('ref novo sobrescreve o anterior', async ({ page }) => {
    await page.goto('/?ref=teste123');
    await page.goto('/?ref=outro');
    const href = await page.locator('a[data-cta="hero"]').getAttribute('href');
    expect(href).toContain('ref=outro');
    expect(href).not.toContain('teste123');
  });
});

test.describe('eventos no dataLayer', () => {
  test('page_view com atribuição + cta_click + faq_open', async ({ page }) => {
    await page.goto('/?ref=ev1');

    // cta_click sem navegar
    await page.evaluate(() => {
      document.addEventListener('click', (e) => e.preventDefault());
      document.querySelector<HTMLAnchorElement>('a[data-cta="hero"]')!.click();
    });
    // faq_open
    await page.evaluate(() => {
      document.querySelector<HTMLDetailsElement>('details[data-faq]')!.open = true;
    });

    const events = await page.evaluate(() =>
      (window as unknown as { dataLayer: { event: string }[] }).dataLayer.map((d) => d.event)
    );
    expect(events).toContain('page_view');
    expect(events).toContain('cta_click');
    expect(events).toContain('faq_open');

    const pv = await page.evaluate(
      () =>
        (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer.find(
          (d) => d.event === 'page_view'
        )
    );
    expect(pv?.ref).toBe('ev1');
  });

  test('scroll até o fim dispara scroll_depth 25/50/75/100 e section_view', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(async () => {
      const doc = document.documentElement;
      for (let y = 0; y <= doc.scrollHeight; y += 400) {
        window.scrollTo({ top: y });
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo({ top: doc.scrollHeight });
    });
    await page.waitForTimeout(400);

    const dl = await page.evaluate(
      () => (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
    );
    const depths = dl.filter((d) => d.event === 'scroll_depth').map((d) => d.depth);
    expect(depths).toEqual(expect.arrayContaining([25, 50, 75, 100]));

    const sections = dl.filter((d) => d.event === 'section_view').map((d) => d.section);
    expect(sections).toEqual(expect.arrayContaining(['hero', 'preco', 'faq']));
  });
});

test('checador de elegibilidade: 18+ mostra CTA qualificado', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-elig="18mais"]').click();
  await expect(page.locator('[data-elig-result]')).toContainText('Caminho livre');
  await expect(page.locator('[data-elig-cta] a[data-cta="elegibilidade"]')).toBeVisible();

  const faixa = await page.evaluate(
    () =>
      (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer.find(
        (d) => d.event === 'eligibility_check'
      )?.faixa
  );
  expect(faixa).toBe('18mais');
});

test.describe('acessibilidade (axe)', () => {
  for (const path of ['/', '/supletivo-online/', '/termos/']) {
    test(`sem violações em ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
