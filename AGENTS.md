# Wiki instructions

This project keeps a persistent knowledge base in `.wiki` (an Obsidian-compatible vault, plain markdown). Read this file at the start of every session before touching the wiki. It exists so context survives between sessions instead of evaporating when the window closes.

**Mode:** both <!-- project-memory | research | both -->

## Before writing anything

1. Read `.wiki/index.md` — it's the catalog of every page that already exists. Check it before creating a new page; extending an existing page is almost always better than creating a near-duplicate.
2. Skim the last few entries in `.wiki/log.md` to see what's been touched recently.

## Folder schema

- `index.md` — catalog of every page in the vault. Every write must add or update an entry here.
- `log.md` — append-only timeline, one line per operation: `## [YYYY-MM-DD] <op> | <title>`
- `entities/` — one page per person, org, tool, or library
- `concepts/` — ideas, frameworks, mental models
- `decisions/` — architecture/technical decisions: what was chosen, what was rejected, and why
- `synthesis/` — cross-cutting write-ups that tie multiple pages together
- `raw/` — **immutable.** Original source material (articles, transcripts, PDFs). Never edit files here. If a source needs correcting, the human edits it directly in `raw/`, then the agent re-ingests it.
- `sources/` — one summary page per file in `raw/`, written by the agent

## Rules

- **Never edit `raw/`.** It's the record of what was actually said or written. Everything the agent writes goes in the other folders.
- **Every write updates `index.md` and `log.md`.** A page that exists but isn't cataloged or logged is effectively lost — the next session won't know to look for it.
- **Check before creating.** Search `index.md` and the relevant folder for an existing page on the same topic before writing a new one.
- **Cross-link with `[[wikilinks]]`.** Connections between pages are most of the value here — an unlinked page is much less useful than a linked one.
- **One entity/concept/decision per page.** Keep pages atomic so they can be linked to cleanly.

## Typical requests this vault should handle

- "Log this decision" / "remember why we did X" → new or updated page in `decisions/` or `concepts/`, then update `index.md` + `log.md`.
- "Add this article/transcript to the wiki" → file goes in `raw/`, agent writes a summary page in `sources/`, updates `entities/`/`concepts/` as needed, then `index.md` + `log.md`.
- "What do we know about X" / "why did we choose Y" → check `index.md`, read the relevant page(s), answer citing the page(s).
- "How's the wiki looking" → report page counts, recent log entries, and any orphaned pages (not linked, not in the index).
