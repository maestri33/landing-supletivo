import { describe, expect, it } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PRICE, brl, savings, cardLine, pixBRL, fetchPrice, FALLBACK } from '../../src/data/price';
import { faq } from '../../src/data/faq';

describe('Pricing module', () => {
  it('exporta estrutura de preço válida (valores positivos e finitos)', () => {
    expect(PRICE.installments).toBeGreaterThan(0);
    expect(PRICE.perMonth).toBeGreaterThan(0);
    expect(PRICE.cardTotal).toBeGreaterThan(0);
    expect(PRICE.pixTotal).toBeGreaterThan(0);
    expect(PRICE.full).toBeGreaterThan(PRICE.pixTotal);
  });

  it('calcula a economia do Pix corretamente', () => {
    expect(savings).toBe(PRICE.full - PRICE.pixTotal);
  });

  it('formata moeda BRL corretamente', () => {
    expect(brl(1000)).toMatch(/R\$\s*1\.000/);
    expect(brl(99)).toMatch(/R\$\s*99/);
    expect(brl(99.5)).toMatch(/R\$\s*99,50/);
  });

  it('gera strings derivadas de preço', () => {
    expect(cardLine).toContain(`${PRICE.installments}x`);
    expect(pixBRL).toMatch(/R\$/);
  });
});

describe('fetchPrice resilience', () => {
  it('retorna dados corretos quando o backend responde com sucesso', async () => {
    const mockFetcher = async () =>
      new Response(
        JSON.stringify({
          pix: '850.00',
          card: { installments: 10, installment: '95.00', total: '950.00' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const price = await fetchPrice(mockFetcher as any, 'http://test-endpoint', 500);
    expect(price.pixTotal).toBe(850);
    expect(price.installments).toBe(10);
    expect(price.perMonth).toBe(95);
    expect(price.cardTotal).toBe(950);
    expect(price.full).toBe(FALLBACK.full);
  });

  it('cai no FALLBACK quando o backend retorna erro HTTP (ex: 500)', async () => {
    const mockFetcher = async () => new Response('Internal Server Error', { status: 500 });
    const price = await fetchPrice(mockFetcher as any, 'http://test-endpoint', 500);
    expect(price).toEqual(FALLBACK);
  });

  it('cai no FALLBACK quando o backend retorna valores implausíveis ou corrompidos', async () => {
    const mockFetcher = async () =>
      new Response(
        JSON.stringify({
          pix: '5.00', // abaixo do piso de 100
          card: { installments: 12, installment: '0.50', total: '6.00' },
        }),
        { status: 200 }
      );
    const price = await fetchPrice(mockFetcher as any, 'http://test-endpoint', 500);
    expect(price).toEqual(FALLBACK);
  });

  it('cai no FALLBACK quando a requisição falha ou estoura timeout', async () => {
    const mockFetcher = async () => {
      throw new Error('Network timeout');
    };
    const price = await fetchPrice(mockFetcher as any, 'http://test-endpoint', 500);
    expect(price).toEqual(FALLBACK);
  });
});

describe('FAQ & 7-day guarantee', () => {
  it('contém item específico da garantia de 7 dias com menção ao Art. 49 do CDC', () => {
    const guaranteeItem = faq.find((item) =>
      item.q.toLowerCase().includes('garantia') || item.a.toLowerCase().includes('garantia')
    );

    expect(guaranteeItem).toBeDefined();
    expect(guaranteeItem?.q).toContain('7 dias');
    expect(guaranteeItem?.a).toContain('art. 49');
    expect(guaranteeItem?.a).toContain('CDC');
  });
});

describe('Strategic SEO pages and schema consistency', () => {
  it('páginas estratégicas de SEO existem e possuem schemas estruturados completos', async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');

    const pagesDir = path.resolve(process.cwd(), 'src/pages');
    const fundamentalSrc = await fs.readFile(
      path.join(pagesDir, 'supletivo-ensino-fundamental.astro'),
      'utf-8'
    );
    const mecSrc = await fs.readFile(
      path.join(pagesDir, 'supletivo-reconhecido-mec.astro'),
      'utf-8'
    );

    for (const src of [fundamentalSrc, mecSrc]) {
      expect(src).toContain('ContentPage');
      expect(src).toContain('CtaButton');
      expect(src).toContain('@type\': \'BreadcrumbList');
      expect(src).toContain('@type\': \'Article');
      expect(src).toContain('@type\': \'Course');
      expect(src).toContain('educationalCredentialAwarded');
      expect(src).toContain('hasCourseInstance');
      expect(src).toContain('recognizedBy');
    }
  });

  it('tokens.css define as propriedades de raio de borda incluindo --radius-md', async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const tokensSrc = await fs.readFile(
      path.resolve(process.cwd(), 'src/styles/tokens.css'),
      'utf-8'
    );
    expect(tokensSrc).toContain('--radius-md: 14px;');
    expect(tokensSrc).toContain('--radius-sm: 10px;');
  });

  it('seção de histórias de sucesso / depoimentos possui dados estruturados e autoridade', async () => {
    const { STORIES } = await import('../../src/data/stories');
    expect(STORIES).toBeDefined();
    expect(STORIES.length).toBe(3);

    for (const story of STORIES) {
      expect(story.name).toBeTruthy();
      expect(story.quote).toBeTruthy();
      expect(story.conquest).toBeTruthy();
      expect(story.tag).toBeTruthy();
    }
  });
});

describe('Ported landing features: SalaryCalculator, OfficialValidation, CurriculumSyllabus, WhatsAppFloating', () => {
  const componentsDir = path.resolve(process.cwd(), 'src/components');
  const pagesDir = path.resolve(process.cwd(), 'src/pages');

  it('todos os 4 componentes Astro foram criados no diretório src/components', async () => {
    const files = await fs.readdir(componentsDir);
    expect(files).toContain('SalaryCalculator.astro');
    expect(files).toContain('OfficialValidation.astro');
    expect(files).toContain('CurriculumSyllabus.astro');
    expect(files).toContain('WhatsAppFloating.astro');
  });

  it('index.astro integra os 4 novos componentes em ordem narrativa lógica', async () => {
    const indexSrc = await fs.readFile(path.join(pagesDir, 'index.astro'), 'utf-8');

    expect(indexSrc).toContain('import CurriculumSyllabus from \'../components/CurriculumSyllabus.astro\'');
    expect(indexSrc).toContain('import OfficialValidation from \'../components/OfficialValidation.astro\'');
    expect(indexSrc).toContain('import SalaryCalculator from \'../components/SalaryCalculator.astro\'');
    expect(indexSrc).toContain('import WhatsAppFloating from \'../components/WhatsAppFloating.astro\'');

    // Ordem narrativa
    const stepsPos = indexSrc.indexOf('<Steps />');
    const syllabusPos = indexSrc.indexOf('<CurriculumSyllabus />');
    const validityPos = indexSrc.indexOf('<Validity />');
    const officialValPos = indexSrc.indexOf('<OfficialValidation />');
    const storiesPos = indexSrc.indexOf('<Stories />');
    const salaryPos = indexSrc.indexOf('<SalaryCalculator />');
    const pricingPos = indexSrc.indexOf('<Pricing />');
    const waPos = indexSrc.indexOf('<WhatsAppFloating />');

    expect(stepsPos).toBeGreaterThan(-1);
    expect(syllabusPos).toBeGreaterThan(stepsPos);
    expect(validityPos).toBeGreaterThan(syllabusPos);
    expect(officialValPos).toBeGreaterThan(validityPos);
    expect(storiesPos).toBeGreaterThan(officialValPos);
    expect(salaryPos).toBeGreaterThan(storiesPos);
    expect(pricingPos).toBeGreaterThan(salaryPos);
    expect(waPos).toBeGreaterThan(pricingPos);
  });

  it('SalaryCalculator possui slider, toggle Fundamental/Médio e script de cálculo em tempo real', async () => {
    const src = await fs.readFile(path.join(componentsDir, 'SalaryCalculator.astro'), 'utf-8');

    expect(src).toContain('type="range"');
    expect(src).toContain('min="1000"');
    expect(src).toContain('max="6000"');
    expect(src).toContain('data-level="medio"');
    expect(src).toContain('data-level="fundamental"');
    expect(src).toContain('Impacto Financeiro Comprovado (IBGE)');
    expect(src).toContain('data-cta="calculadora-salario"');
    expect(src).toContain('1.45');
    expect(src).toContain('1.25');
    expect(src).toContain('addEventListener');
  });

  it('OfficialValidation possui seletor de estados, amparo na LDB e links oficiais', async () => {
    const src = await fs.readFile(path.join(componentsDir, 'OfficialValidation.astro'), 'utf-8');

    expect(src).toContain('id="uf-select"');
    expect(src).toContain('CEE-SP');
    expect(src).toContain('Artigo 38 da Lei Federal nº 9.394/96 (LDB)');
    expect(src).toContain('Publicação Nominal');
    expect(src).toContain('Código de Autenticidade Digital');
    expect(src).toContain('Histórico Escolar Completo');
    expect(src).toContain('data-cta="validacao-matricula"');
    expect(src).toContain('/validar');
  });

  it('CurriculumSyllabus possui abas de navegação acessíveis para as 4 áreas da BNCC', async () => {
    const src = await fs.readFile(path.join(componentsDir, 'CurriculumSyllabus.astro'), 'utf-8');

    expect(src).toContain('role="tablist"');
    expect(src).toContain('role="tab"');
    expect(src).toContain('role="tabpanel"');
    expect(src).toContain('Linguagens & Códigos');
    expect(src).toContain('Matemática & Tecnologias');
    expect(src).toContain('Ciências Humanas');
    expect(src).toContain('Ciências da Natureza');
    expect(src).toContain('BNCC');
    expect(src).toContain('aria-selected');
    expect(src).toContain('ArrowRight');
  });

  it('WhatsAppFloating possui suporte a popover, ref de afiliado e número configurável', async () => {
    const src = await fs.readFile(path.join(componentsDir, 'WhatsAppFloating.astro'), 'utf-8');
    const { WHATSAPP_NUMBER } = await import('../../src/config');

    expect(WHATSAPP_NUMBER).toBeTruthy();
    expect(src).toContain('wa-trigger-btn');
    expect(src).toContain('wa-popover');
    expect(src).toContain('wa.me');
    expect(src).toContain('sb_attribution');
    expect(src).toContain('sb_ref');
    expect(src).toContain('data-cta="whatsapp-popup"');
    expect(src).toContain('Escape');
  });
});

