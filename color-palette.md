# 🎨 Dark Mode Color Palette — Portfolio
---

## 🖼️ Color Tokens

| Role | Token | Hex | OKLCH |
|------|-------|-----|-------|
| **BG — Deepest** | `--bg-void` | `#080202` | `oklch(0.07 0.012 17)` |
| **BG — Base** | `--bg-base` | `#0F0404` | `oklch(0.095 0.018 17)` |
| **BG — Surface** | `--bg-surface` | `#180808` | `oklch(0.135 0.025 17)` |
| **BG — Card** | `--bg-card` | `#200D0D` | `oklch(0.175 0.032 17)` |
| **BG — Elevated** | `--bg-elevated` | `#2C1212` | `oklch(0.22 0.042 17)` |
| **BG — Overlay** | `--bg-overlay` | `#3A1818` | `oklch(0.27 0.052 17)` |
| **Red 900** | `--red-900` | `#4A0F0F` | `oklch(0.27 0.092 25)` |
| **Red 800** | `--red-800` | `#6E1515` | `oklch(0.35 0.13 25)` |
| **Red 700** | `--red-700` | `#9C1A1A` | `oklch(0.43 0.165 25)` |
| **Red 600** | `--red-600` | `#C41E1E` | `oklch(0.50 0.195 25)` |
| **Red 500 ★** | `--red-500` | `#E02020` | `oklch(0.56 0.215 25)` |
| **Red 400** | `--red-400` | `#F03C3C` | `oklch(0.63 0.195 25)` |
| **Red 300** | `--red-300` | `#F57070` | `oklch(0.72 0.158 25)` |
| **Red 200** | `--red-200` | `#FAA8A8` | `oklch(0.82 0.10 25)` |
| **Amber 500** | `--amber-500` | `#D45A20` | `oklch(0.62 0.17 45)` |
| **Amber 400** | `--amber-400` | `#E07540` | `oklch(0.70 0.148 48)` |
| **Text Primary** | `--text-primary` | `#F2E6DC` | `oklch(0.92 0.018 55)` |
| **Text Secondary** | `--text-secondary` | `#B8968A` | `oklch(0.67 0.038 35)` |
| **Text Muted** | `--text-muted` | `#7A5550` | `oklch(0.46 0.044 25)` |
| **Text Disabled** | `--text-disabled` | `#4A3030` | `oklch(0.30 0.030 20)` |
| **Border Subtle** | `--border-subtle` | `#1E0F0F` | `oklch(0.15 0.025 17)` |
| **Border Default** | `--border-default` | `#3A1C1C` | `oklch(0.26 0.048 17)` |
| **Border Strong** | `--border-strong` | `#5C2A2A` | `oklch(0.34 0.072 20)` |

---

## 🗺️ Token Map — Custom vs shadcn

| What you're styling | Use this class | Backed by |
|---|---|---|
| Page background | `bg-background` | `--background` (shadcn) |
| Card background | `bg-card` | `--card` (shadcn) |
| Deep shell / outermost | `bg-bg-void` | `--color-bg-void` (custom) |
| Sidebar / nav panel | `bg-bg-surface` | `--color-bg-surface` (custom) |
| Primary button bg | `bg-primary` | `--primary` (shadcn) |
| Red accent text | `text-brand-500` | `--color-brand-500` (custom) |
| Body text | `text-foreground` | `--foreground` (shadcn) |
| Subtle text | `text-muted-foreground` | `--muted-foreground` (shadcn) |
| Default border | `border-border` | `--border` (shadcn) |
| Subtle border | `border-edge-subtle` | `--color-edge-subtle` (custom) |
| Focus ring | `ring-ring` | `--ring` (shadcn) |
| Amber highlight | `text-warm-500` | `--color-warm-500` (custom) |

> **Rule of thumb:** Use shadcn tokens (`bg-background`, `text-foreground`, etc.)
> for component-level styling. Use custom tokens (`bg-bg-void`, `text-brand-500`)
> for layout and decorative elements.

---

## 🎨 Design Tokens Summary

```
BACKGROUNDS ─────────────────────────────────────────────────────
  bg-void      #080202   ← outermost shell, deep space
  bg-base      #0F0404   ← page / app background      → --background
  bg-surface   #180808   ← nav, sidebar, panels        → --muted / --sidebar
  bg-card      #200D0D   ← cards, sections             → --card
  bg-elevated  #2C1212   ← hover states, popovers      → --popover / --secondary
  bg-overlay   #3A1818   ← modals, dropdowns

BRAND RED ───────────────────────────────────────────────────────
  brand-500    #E02020   ← CTAs, active states         → --primary / --ring
  brand-600    #C41E1E   ← hover on primary            → --destructive
  brand-700    #9C1A1A   ← glow backgrounds
  brand-800    #6E1515   ← subtle red fills
  brand-900    #4A0F0F   ← badge backgrounds

WARM AMBER ──────────────────────────────────────────────────────
  warm-500     #D45A20   ← secondary CTA, highlights   → --accent
  warm-400     #E07540   ← hover on accent

TEXT ────────────────────────────────────────────────────────────
  foreground   #F2E6DC   ← headings, important content → --foreground
  secondary    #B8968A   ← body text                   (--secondary-fg)
  muted        #7A5550   ← placeholders, captions      → --muted-foreground
  disabled     #4A3030   ← inactive elements

BORDERS ─────────────────────────────────────────────────────────
  edge-subtle  #1E0F0F   ← barely visible              (--sidebar-border)
  edge-default #3A1C1C   ← standard dividers           → --border / --input
  edge-strong  #5C2A2A   ← emphasized, active rings
─────────────────────────────────────────────────────────────────
```