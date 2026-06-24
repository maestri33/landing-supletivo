---
name: run-landing-supletivo
description: Build, run, and drive the Supletivo Brasil landing page (Astro static). Use when asked to start the landing, run its tests, build it, take a screenshot of any section, exercise the eligibility widget, check ref attribution, or verify the dataLayer events.
---

Astro 6 static landing. The "app" is `dist/` after `npm run build`; the
agent drives it in headless Chromium via `.claude/skills/run-landing-supletivo/driver.mjs`.
No GUI, no dev server, no test framework needed — `npm run preview` serves
the build on `:4321` (or any port) and the driver clicks through the page.

Paths below are relative to `<unit>/` (repo root).

## Prerequisites

Tested on Ubuntu with Node 22. The driver needs a Chromium binary; the
project already pulls Playwright, so its bundled chromium is preferred.

```bash
sudo apt-get update
sudo apt-get install -y chromium           # only if not using Playwright's
node --version                             # 20+ required (project pins 22)
```

If `~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome` exists (the
project's devDeps pull it via `npm install` + `npx playwright install`),
the driver uses it. Otherwise it falls back to system `/usr/bin/chromium`.

## Setup

```bash
npm ci                                      # or `npm install` for first time
npm run build                               # → dist/
```

## Build

```bash
npm run build                               # outputs static dist/
```

## Run (agent path)

The driver walks the page, asserts the dataLayer, exercises the eligibility
widget, the FAQ, and the CTAs, then writes 7 section screenshots and a
`summary.json` to `.claude/skills/run-landing-supletivo/screenshots/`.

```bash
# 1. Serve the built site. Pick a free port — 4321 is the project default
#    but is often taken in this container by other Astro projects.
npx astro preview --port 4399 --host 127.0.0.1 &

# 2. Wait for it to answer, then drive.
timeout 15 bash -c 'until curl -sf http://127.0.0.1:4399/ >/dev/null; do sleep 0.3; done'
node .claude/skills/run-landing-supletivo/driver.mjs --url http://127.0.0.1:4399/
```

Output:

```
01-hero.png                     # full hero with diploma flag
02-eligibilidade-18mais.png     # eligibility widget after 18+ click
03-faq.png                      # FAQ section with first details open
04-footer.png                   # final CTA section
05-espelho.png                  # espelho (mirror) — SVG animations frozen
06-confianca.png                # trust section
07-preco.png                    # pricing card
summary.json                    # dataLayer events, CTA hrefs, axe result, console errors
```

The driver prints a JSON summary on stdout and exits non-zero on a hard
failure (preview down, no CTAs, missing `page_view`, missing
"scroll_depth 25/50/75/100", eligibility result not visible). It also writes
the same JSON to `screenshots/summary.json` for later inspection. Axe
violations are recorded in the summary but do **not** fail the run — pass
`--strict true` to additionally fail on any console error (exit 2).

Useful flags:

| flag                | what it does                                             |
|---------------------|----------------------------------------------------------|
| `--url <URL>`       | base URL (default `http://localhost:4321/`)              |
| `--ref <value>`     | override the auto-generated `?ref=…` (default random)    |
| `--shots-dir <dir>` | where screenshots and `summary.json` land                |
| `--viewport WxH`    | default `1280x800`                                       |
| `--strict true`     | treat console errors as fatal (exit 2)                   |

## Run (human path)

```bash
npm run dev          # astro dev on :4321 with HMR — useless headless
# …or
npm run preview      # serve the built dist/ on :4321
```

Both open a browser window when run interactively. Use them only when you
want to look at the page yourself; the agent path above is what future
agents will use.

## Test

```bash
npm test                                # unit — attribution/first-touch rules
npm run test:e2e                        # Playwright — needs `npm run build` first
```

## Gotchas

- **`html { scroll-behavior: smooth }`**. The page has this CSS for in-page
  nav anchors. Don't try to call `page.screenshot()` after
  `window.scrollTo()` and expect the scrolled viewport — Playwright
  occasionally captures the un-scrolled frame. The driver sidesteps this
  by using `locator('section#…').screenshot()` per section, which is
  driven off the element's computed bounding box and ignores the
  composited viewport.
- **The driver hard-fails on missing `page_view` or `scroll_depth`**. That
  is intentional — these are the project's acceptance signals for
  attribution and analytics. If you see "No page_view event in dataLayer",
  the `src/scripts/main.ts` entry wasn't loaded (likely a build
  cache problem); rebuild with `rm -rf dist && npm run build`.
- **Port 4321 is already taken on this machine** by `landing-promotor` and
  `app-supletivo`. Use `--port 4325` (or any free port) and pass it to
  the driver via `--url`. The driver's preflight TCP probe prints the
  exact `npm run preview` line if the port is closed — no need to guess.
- **Playwright 1.60 wants chromium-1223 but this image has 1228**. The
  driver resolves the binary directly from
  `~/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome` and
  passes it as `executablePath`. If you `npx playwright install`, the
  driver will keep working (newer 12xx versions sort to the front of the
  resolver).
- **No real "app" is running on `https://app.supletivo.net.br`**. The
  CTAs link there, but the driver asserts on the href, not the network
  round-trip — that's correct for a static landing, but it does mean the
  driver can't catch a backend regression.
- **`window.dataLayer` accumulates across `page.goto`s**. The driver
  re-navigates with a fresh URL whenever it needs a clean dataLayer (CTA
  click test, FAQ open test, scroll sweep). Don't combine assertions
  across navigations.

## Troubleshooting

- **`Preview server is not reachable at http://localhost:4321`** — start
  it first (`npx astro preview --port 4321 --host 127.0.0.1 &`), or pass
  `--url` with a different port.
- **`No Chromium binary found`** — run `npx playwright install chromium`
  or `sudo apt-get install -y chromium`.
- **`Ref attribution broken: N/M CTAs missing ref=…`** — the
  `src/scripts/attribution.ts` first-touch rule was bypassed, or the
  build is stale. `rm -rf dist && npm run build` and re-run.
- **`cta_click event missing after hero click`** — the click handler in
  `main.ts` (line 21) bubbles on `document`, so the click target must be
  inside an `a[data-cta]`. If the hero CTA lost its `data-cta` attribute
  in a refactor, the driver will catch it here.
- **`scroll_depth=25 not fired (got …)`** — the page is short
  (`document.scrollHeight < 4 × viewport`). Run on the production
  viewport, or scroll programmatically to the bottom before measuring.
- **Screenshots look like the hero even after scrolling** — the CSS
  `scroll-behavior: smooth` on `html` is fighting Playwright. The driver
  already works around this; if you copy-paste a snippet that uses
  `page.screenshot()` directly, switch to
  `page.locator('section#ID').screenshot()`.
