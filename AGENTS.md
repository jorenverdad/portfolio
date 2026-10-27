# Agent Guidelines & Engineering Standards

System guidelines, architectural boundaries, and engineering workflows for AI agents operating on the **Personal Portfolio** codebase.

---

## 1. Project Overview & Tech Stack

- **Project**: Joren's Personal Portfolio
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript 5 (strict typing, no implicit `any`)
- **Styling**: Tailwind CSS v4 + Base UI primitives (`@base-ui/react`), Lucide React icons, devicon
- **Animation & Interactivity**: Motion (`motion`), tw-animate-css
- **Testing**: Vitest (unit/component), Playwright (E2E)
- **Package Manager**: `pnpm`

---

## 2. Essential Commands

Always use `pnpm` for executing commands within the project root:

- **Dev Server**: `pnpm dev`
- **Lint**: `pnpm lint`
- **Unit & Integration Tests**: `pnpm test:run` (`vitest run`)
- **E2E Tests**: `pnpm test:e2e` (`playwright test`)
- **Build**: `pnpm build`

---

## 3. Code Graph & Architecture Discovery (Graphify)

This repository uses **Graphify** as its primary architectural intelligence layer. Agents must prioritize graph-based structural discovery over blind, token-heavy file scans:

- **Graph-First Navigation**: When exploring system architecture, tracing execution flow, or locating function definitions, use Graphify (local CLI per [`graphify.md`](./graphify.md) or graphify rules in [`.agents/rules/graphify.md`](./.agents/rules/graphify.md)).
- **Blast-Radius & Impact Analysis**: Before modifying or refactoring shared utilities, UI primitives, or components, check downstream dependents using:
  ```powershell
  graphify affected "<symbol-or-component>"
  ```
- **Trace Execution Paths**: When tracing how a UI action connects to components or utilities:
  ```powershell
  graphify path <source-file> <target-file>
  ```
- **Inspect God Nodes**: Run `graphify god-nodes` to identify central architectural hubs when analyzing system bottlenecks or coupling.
- **AST Graph Synchronization**: After completing significant code changes or refactors, update the local AST graph:
  ```powershell
  graphify extract . --code-only
  graphify cluster-only .
  ```

---

## 4. UI & Design System Rules

All user interface development MUST adhere strictly to the established design system:

- **Design System**: Use modern Tailwind CSS v4 utility classes and tokens from `src/app/globals.css`.
- **Primitives**: Leverage `@base-ui/react` and shared components in `src/components/ui/`.
- **Icons**: Use `lucide-react`, `react-icons`, and `tech-stack-icons`.
- **Responsive & Accessible**: Support dynamic viewport scaling, keyboard navigation, and theme variables (dark/light mode).

---

## 5. Architectural Boundaries & Conventions

- **Server vs. Client Components**:
  - Default to Server Components for performance, SEO, and static markup.
  - Add `'use client'` only at leaf components requiring browser interactivity, state, event listeners, or animation hooks.
- **Components Organization**:
  - `src/components/layout/`: Nav bar, footer, and structural layout elements.
  - `src/components/sections/`: Main landing page sections (Hero, About, Tech Stack, Projects, Testimonials, Contact).
  - `src/components/ui/`: Reusable primitive components (Button, ThemeToggle, LazyMount, ScrollReveal).
  - `src/lib/`: Shared utilities and helpers.

---

## 6. Verification & Quality Checklist

Before concluding any implementation or refactoring task:

1. **Lint**: Run `pnpm lint` to ensure ESLint rules pass.
2. **Tests**: Run `pnpm test:run` to ensure existing and new unit tests pass.
3. **Build**: Run `pnpm build` to verify clean production build.
4. **Impact Check**: Verify no unintended breaking changes occurred via Graphify (`graphify affected "<symbol>"`).
