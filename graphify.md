# Graphify Cheatsheet (Zero API / 100% Local)

## 1. Update / Re-scan Codebase

Run this command whenever you update your code to update your local AST graph without requiring any LLM API key:

```powershell
graphify extract . --code-only
```

> **Note:** Always place `.` right after `extract` and `--code-only` at the end.

---

## 2. View Visual Code Map & Summary Report

To regenerate or inspect your visual files after updating:

- **Generate/Update cluster report:**
  ```powershell
  graphify cluster-only .
  ```
- **Interactive Visual Network Diagram:** Open `graphify-out/graph.html` in your browser.
- **Summary Report:** Open `graphify-out/GRAPH_REPORT.md`.

---

## 3. Query & Inspect Code Structure via Terminal

- **List the main architectural hub files (God Nodes):**

  ```powershell
  graphify god-nodes
  ```

- **Trace dependency path between 2 files/functions:**

  ```powershell
  graphify path src/lib/utils.ts src/components/sections/hero.tsx
  ```

- **See dependency impact / callers of a symbol or component:**

  ```powershell
  graphify affected "cn"
  ```

- **Explain a node and its connections:**

  ```powershell
  graphify explain "ThemeToggle"
  ```

- **Query the code graph for a concept or keyword:**

  ```powershell
  graphify query "theme"
  ```
