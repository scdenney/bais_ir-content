# BAIS IR Course Content Site

Course content showcase site for **BAIS: International Relations**, Leiden University.
Deployed at `https://scdenney.github.io/bais_ir-content/`.

This is **not a syllabus** — it documents what is taught and why, for students, prospective employers, and the instructor. All survey data shown is simulated; no real student responses appear anywhere on this site.

## Repository structure

```
bais_ir-content/
├── _config.yml                  # Jekyll config (theme: jekyll-theme-cayman)
├── _layouts/
│   ├── default.html             # Site shell (header, nav, footer, disclaimer)
│   └── module.html              # Module pages (hero banner, sidebar TOC, prev/next)
├── assets/
│   ├── css/style.scss           # Cayman base + Wes Anderson palette overrides
│   ├── js/
│   │   ├── scroll-effects.js    # IntersectionObserver fade-in (~15 lines)
│   │   └── survey-viz.js        # Chart.js bar + strip charts for experiments
│   └── data/
│       └── simulated-experiments.json  # Pre-generated fake data for 3 experiments
├── index.md                     # Landing page (disclaimer, pillar cards, module grid)
├── approach.md                  # Teaching philosophy
├── experiments.md               # Framing experiment methodology + Chart.js charts
├── modules/
│   ├── index.md                 # Module overview grid
│   ├── 01-ir-theories.md        # Module 1: Traditional IR Theories (Week 2)
│   ├── 02-security-proliferation.md  # Module 2: Security & Nukes (Week 3)
│   ├── 03-nonwestern-ir.md      # Module 3: Non-Western IR Theory (Week 4)
│   ├── 04-nation-race-gender.md # Module 4: Nation, Race, Gender (Week 10)
│   ├── 05-society-global-age.md # Module 5: Society in a Global Age (Week 11)
│   └── 06-anthropocene.md       # Module 6: The Anthropocene (Week 12, placeholder)
├── Gemfile
└── .gitignore
```

## Color palette (Wes Anderson / Beamer)

```
--accent-blue:   #3B4C6B   (header, links, headings)
--warm-cream:    #FAF8F5   (page background)
--dusty-rose:    #C9A2A0   (borders, accents, Module 4 color)
--terracotta:    #B8593E   (alerts, experiment labels, Module 2 color)
--sage-green:    #8B9F82   (Module 5 color)
--soft-teal:     #6B8F8A   (blockquote borders, Module 3 color)
--slate-blue:    #6B7FA0   (Module 6 color)
```

Each module has its own accent color used in the hero accent bar and theme tags.

## Key design decisions

- **Module layout** uses a two-column grid: sticky sidebar TOC (auto-generated from H2 headers via JS) + main content
- **Experiments page** loads Chart.js from CDN; data lives in `assets/data/simulated-experiments.json`
- **Simulated data only** — never use real student responses. The `simulated-experiments.json` file contains fake data with deterministic jitter for strip charts
- **Module experiment sections** are kept brief (2 sentences + link to Experiments page) — the full methodology lives on `experiments.md`
- **`<details>` tags** are used for reading lists, intellectual tradition breakdowns, and comparative case studies
- **Citation style**: author (year) on first mention in body text; full bibliographic details in Further Reading `<details>` sections only

## Adding or editing modules

Module pages use the `module` layout. Front matter:

```yaml
---
layout: module
title: "Module Title"
module: 4
subtitle: "Subtitle"
accent: "#C9A2A0"
themes: ["Tag1", "Tag2", "Tag3"]
syllabus_weeks: "Week 10"
prev_module: "/modules/03-nonwestern-ir"
prev_title: "Module 3: Non-Western IR"
next_module: "/modules/05-society-global-age"
next_title: "Module 5: Society in a Global Age"
---
```

The TOC is auto-generated from `h2` elements. Use `h3` for subsections within. Add `---` between major content blocks for visual separation.

## Source material locations

Content for this site is drawn from two locations (not in this repo):

- **2025-26 materials**: `/Users/scdenney/Documents/GitHub/courses/bais_ir26/` (Modules 1-3: tex, speaker notes, reading guides, survey designs)
- **2024-25 materials**: Google Drive at `work/teaching/2024-2025/IR-BAIS` (Modules 4-5: lecture notes, presentations, definitions documents)

## Building locally

```bash
bundle install
bundle exec jekyll serve
```

Opens at `http://localhost:4000/bais_ir-content/`.

## Conventions

- US spelling (behavior, defense, maximize, globalization)
- No emojis
- Bold for key terms on first introduction (`**anarchy**`)
- Italics for book titles (`*The Twenty Years' Crisis*`)
- `<details><summary>` for anything that can be collapsed (reading lists, case studies, thinker profiles)
- Footer disclaimer appears on every page via the layout files

## Linked from

The main personal site (`scdenney.github.io`) links to this site from `teaching.md` via a "Course Content" resource badge on the International Relations course card.
