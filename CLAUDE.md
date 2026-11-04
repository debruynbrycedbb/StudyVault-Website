# StudyVault — instructions for Claude

Static site (no build step) for Bryce de Bruyn's Master in Digital Marketing and Social Media at La Salle Barcelona, 2026–27. Hosted on GitHub Pages from `main`.

## Where content lives

| What | Where |
|---|---|
| Courses, weeks, note index, file index, deadlines, research library, formulas, debate questions | `content/vault.json` |
| Note text (Markdown, one file per note) | `content/notes/<course-short>-w<N>-<slug>.md` |
| Downloadable files (PDFs etc.) | `files/<course-id>/week-<NN>-<slug>.pdf` |
| Practice quiz / flashcard questions | `content/quiz.json` |

Thesis brand: Jackob Buczynski (Polish upcycling fashion, Gràcia boutique) — Group 4. Files in `files/masters-thesis/` are named `rd<N>-…`, `research-…`, `resources-…`.

Course ids: `web-analytics`, `digital-marketing-advertising`, `digital-marketing-tools`, `ai-digital-marketing`, `marketing-ecommerce`, `masters-thesis`, `digital-creativity-social`, `marketing-intelligence`, `ai-social-networks`, `marketing-social-networks`, `social-commerce`.

## Adding notes from a PDF Bryce sends

1. Ask which course and week if he didn't say. Never guess a session date — leave `date` as `""` if the PDF doesn't state it.
2. Extract the text (`pdftotext -layout`) and write a faithful Markdown note in `content/notes/`. Start with `# Title`, then a bold metadata line (session date, lecturer), then `##` sections. Keep his wording, tables as GFM tables. Don't invent content.
3. Copy the PDF to `files/<course-id>/week-<NN>-<slug>.pdf`.
4. In `content/vault.json`:
   - add a `files` entry `{ id, course, week, kind: "Notes"|"Slides"|"Reading", title, path, size }` (size in bytes);
   - add a `notes` entry `{ id, course, week, title, date, path, source: <file id>, tags: [...] }`;
   - in the course's `weeks`, add or update `{ n, title, date, notes: [...], files: [...] }`.
   - Courses not organised by week (the Master's Thesis) use labelled sections: add `label` (e.g. `"RD1"`, `"Research"`, `"Resources"`) and the site shows the label instead of "Week N", in order. Add new deliverables as new sections (e.g. `{ n: 4, label: "RD2", ... }`).
5. Optionally add 5–10 questions to `content/quiz.json` (`course`, `note`, `q`, `options`, `answer` index, `explain`) and case studies / tools / resources to `library` that come from the note.
6. Bump `SV.VERSION` in `js/app.js` so browsers fetch fresh content, validate JSON (`python3 -c "import json;json.load(open('content/vault.json'))"`), commit and push to `main`.

## Deadlines

Add to `deadlines` in `content/vault.json`: `{ id, date: "YYYY-MM-DD", time: "19:00" or "19:00–19:20", course, type: "RD#"|"Exam"|"FMT"|..., title, notes }`. Use `course: "all"` for items that apply to every module course.

## Local vs repo data

Anything Bryce adds through the site itself (notes, PDFs, deadlines, links, library items) is stored in that browser only (localStorage + IndexedDB). Content in this repo shows everywhere.

## Design

Matches Bryce's project hub: navy `#070B14`, hub blue `#5B8CFF`, Archivo at 112–125% width for display and labels, Manrope for body text. Fonts and libraries (marked, DOMPurify, pdf.js) are self-hosted in `assets/fonts` and `js/vendor` — don't switch to CDNs.
