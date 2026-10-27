# StudyVault

My study vault for the **Master in Digital Marketing and Social Media** at La Salle Barcelona (2026–27).

**Live site:** https://debruynbrycedbb.github.io/StudyVault-Website/

- **Courses** in the sidebar, each with numbered weeks, notes, downloadable files and an additional-content section
- **Calendar** with every deadline from the La Salle schedule; add your own, tick them off, export to Apple/Google Calendar (.ics)
- **Research library** for case studies, tools and resources/documentation
- **Search** everything with ⌘K (or `/`)
- **Recently viewed** notes and files in the sidebar
- **Study tools**: practice quiz, flashcards, focus timer, metrics calculator (CTR, CPA, ROAS…), debate prep
- **Settings**: theme, accent colour, calendar options, backup export/import

## Adding notes

- **On the site:** open a course → week → *Add notes or import PDF*. The PDF's text becomes a note and the PDF stays downloadable. Saved in that browser.
- **Via Claude (shows on every device):** send the PDF to Claude with the course and week. See `CLAUDE.md` for the exact steps.

## Running locally

```
python3 -m http.server 8000
```
then open http://localhost:8000. (Opening `index.html` directly won't load content because browsers block `fetch` from `file://`.)
