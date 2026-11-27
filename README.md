# NusaStat — Indonesia in Numbers

[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ELVINO1806/best-national-statistics-site-20261126-0539-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ELVINO1806/best-national-statistics-site-20261126-0539-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A static national statistics site for Indonesia: six pages, twenty charts and more than 350 sourced figures — every number labelled with its source and year. No build step, no network at run time, no external fonts, images or scripts. Everything the pages load is a file under `app/`.

## Pages

- **Overview** (`index.html`) — nine headline figures, a switchable GDP / population chart, internet and urbanisation charts, the full headline table and the latest BPS releases.
- **Economy** (`economy.html`) — GDP, PPP and per-person GDP, trade, inflation and growth, with year-by-year tables.
- **People** (`people.html`) — population, fertility, urban share, labour force, unemployment and poverty.
- **Provinces** (`provinces.html`) — the ten largest provinces, population by island group, and density for all 38 provinces, with a province filter.
- **Health & Education** (`health-education.html`) — life expectancy, child mortality, health spending, stunting, PISA 2022 scores and enrolment.
- **Digital** (`digital.html`) — internet use (22% → 73% in a decade) and mobile subscriptions, with year-by-year tables.

## Charts

20 charts in total, all drawn in-page as inline SVG by `app/charts.js` from `app/data.js` — no chart library. Chart toggles switch the overview chart between GDP growth, GDP, GDP per person and population; the economy chart between GDP, PPP, per-person GDP and GNI per person; the people chart between population, growth rate and urban share; and the digital chart between internet users and mobile subscriptions. The overview has a figure search box; the provinces page has a province filter.

## Figures

More than 350 figures in total: 23 series (2015–2024, 228 values; health spending and tertiary enrolment end in 2023) from the World Bank's World Development Indicators, 19 latest BPS and ministry releases (poverty, unemployment, wages, PISA, stunting), the ten largest provinces, density for all 38 provinces, population by island group, and trade values for 2024.

## Sources

- BPS (Statistics Indonesia) — national releases 2024–2026
- World Bank, World Development Indicators — accessed 27 November 2026
- Ministry of Finance (APBN 2025)
- Ministry of Health, SSGI (stunting)
- OECD, PISA 2022
- Dukcapil, Ministry of Home Affairs, Semester I 2024

## Layout

- `app/` — the site: six HTML pages, `style.css`, `data.js` (figures), `charts.js` (SVG chart drawing), `app.js` (page logic: charts, tables, toggles, search, filters).
- `screenshots/` — four screenshots of the site, the first the cover.
- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## Running it

Serve `app/` with any static server and open `index.html`. Or run the hand-in program:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Licence

MIT — see `LICENSE`.
