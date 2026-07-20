# BAIS IR course companion

Public companion for six International Relations lectures in Leiden University's BA International Studies program, AY 2025–2026. The live site is `https://scdenney.github.io/bais_ir-content/`.

## Purpose and scope

- Documents the six lectures designed and delivered by Steven Denney in the co-taught twelve-week course.
- Gives concise lecture overviews, required-reading notes, classroom-study designs, and takeaways.
- Is not a syllabus or course-administration site.
- Uses the authoritative course repository at `../bais_ir26/` as its content source.

## Information architecture

```
index.md             Overview and six-lecture course arc
modules/index.md     Lecture index
modules/01–06.md     Individual lecture records
readings.md          Required-reading guide
experiments.md       Survey experiments, descriptive surveys, and exercise record
approach.md          Teaching and data-practice principles
_includes/           Shared header and footer
_layouts/            Default and lecture layouts
assets/css/          Standalone, restrained site styles
```

The public navigation is: Overview, Lectures, Readings, Classroom studies, Approach.

## Accuracy and data rules

- Treat the syllabus, fielded survey instruments, final slide sources, and executable analysis workflows as authoritative. Flag conflicts instead of silently guessing.
- Distinguish required readings from recommended or lecture-specific supplements.
- Distinguish randomized experiments, descriptive surveys, and unrecorded discussion exercises.
- Do not put raw survey exports, Qualtrics files, identifying fields, student-level rows, open-text feedback, or real response tables in this repository.
- Do not describe hypotheses, treatment text, simulations, or expected patterns as observed findings.
- Do not redistribute copyrighted assigned-reading PDFs.
- Instructor-authored slides or notes require a separate release and rights decision before they are copied or linked publicly.

## Design rules

- Use one unique page `<h1>` and semantic section headings.
- Preserve the shared skip link, labelled navigation, focus states, contrast, and visible-by-default content.
- Keep the palette restrained: dark ink, neutral surfaces, and one blue-gray accent; the warm tone is reserved for study notes.
- Avoid scroll-triggered visibility, decorative animation, external chart libraries, and canvas-only information.
- Keep lecture pages in the common order: Overview, Lecture map, Readings, Classroom study where applicable, Takeaways.
- Use US spelling and en dashes for parenthetical breaks.

## Building locally

```bash
bundle install
bundle exec jekyll build
bundle exec jekyll serve
```

The local site is served under `/bais_ir-content/` because `_config.yml` defines that base path.
