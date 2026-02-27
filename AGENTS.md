# AGENTS.md — Ozella Swim (ozellaswim.com)

This repo powers Ozella Swim, a women's swimwear brand prioritizing thong-style cuts, boutique feel, and tight product lineup.
Your job: ship changes that feel premium, confident, minimal, and intentional — never loud, never gimmicky.

---

## 0) Non-Negotiables (Read First)

- **Boutique > hype.** No loud “SALE!!!” energy, no cheesy slogans, no generic dropship vibes.
- **Minimal but sexy.** Clean whitespace + confident language + subtle sensuality.
- **Clarity beats cleverness.** If a line is cute but unclear, rewrite it.
- **One strong idea per section.** Don’t stack 4 messages in one block.
- **Avoid template-y ecommerce clichés.** If it sounds like a Shopify demo store, delete it.

If you're unsure, default to: **simpler copy, fewer elements, more whitespace, and stronger hierarchy.**

---

## 1) Brand Voice Rules (Copy)

### Voice attributes
- **Confident, feminine, sun-soaked, understated.**
- Short sentences. Minimal adjectives. Concrete benefits.
- Light luxury tone (not “streetwear,” not “girlboss,” not “corporate”).

### What to avoid (hard bans)
- “Hope this finds you well”
- “Adorned”
- Overused ecommerce lines: “Step into summer,” “Elevate your wardrobe,” “Must-have,” “Game changer,” “Unleash,” “Turn heads,” “Obsessed”
- Excessive emojis or exclamation points (max 1 per section, usually 0)

### Preferred words / phrases
- “flattering”
- “high-cut”
- “double-lined”
- “minimal tan lines”
- “tiny details”
- “made to be worn”
- “island energy”
- “boutique fit”
- “limited run” (use sparingly, only if true)

### Copy structure templates
Use these patterns:

**Hero**
- Headline: 2–6 words max, concrete.
- Subhead: 1 sentence, benefit-driven.
- CTA: 1–3 words.

Example pattern:
- Headline: `The high-cut thong set`
- Subhead: `Minimal seams. Flattering fit. Made for long days in the sun.`
- CTA: `Shop Stargirl`

**Product highlights**
- 3 bullets max.
- Each bullet: 2–6 words.
- Start with a benefit or feature (not marketing fluff).

Example:
- `Double-lined comfort`
- `High-cut thong back`
- `Shimmer finish`

**Size / fit language**
- Be precise and honest.
- If “one size” applies, explain in one line and provide guidance.

Example:
- `One size fits XS–M (best for smaller frames).`

### Accessibility & clarity
- Always include descriptive labels for CTAs (avoid vague “Learn more”).
- Avoid overly sexual language that reduces trust. Keep it tasteful.

---

## 2) Information Hierarchy (Design + Content)

### Above-the-fold priorities (in order)
1. Product identity (what it is)
2. Fit/benefit (why it’s different)
3. Social proof (optional, subtle)
4. CTA

### Per-section rule
Each section must have:
- 1 headline
- optional subhead
- 1 primary CTA OR none (not multiple equal CTAs)

If a section needs more than this, it’s probably two sections.

---

## 3) Visual Design Rules

### Layout
- **Whitespace is a feature.** Avoid cramped stacking.
- Use consistent vertical rhythm (section padding should be consistent across pages).
- Keep pages scannable: short blocks, clear headings, strong spacing.

### Typography
- Preserve existing typographic system.
- Don’t introduce new fonts unless explicitly requested.
- Avoid ALL CAPS paragraphs. ALL CAPS can be used for small labels only.

### Buttons / CTAs
- Primary CTA should be visually dominant.
- Keep CTA copy short and specific:
  - Good: `Shop Stargirl`, `View Sets`, `See Fit`
  - Bad: `Submit`, `Click Here`, `Shop All` (unless it truly goes to all products)

### Iconography
- Icons should be **simple, thin-stroke, consistent style**, and used sparingly.
- Icons must communicate a real promise (fabric, lining, shipping, returns), not empty vibes.

### Imagery
- Prioritize clean, high-end product photos.
- Avoid cluttered collage layouts.
- If adding UGC/social proof, it must feel **organic** (handle visible, minimal framing, no heavy borders).

---

## 4) UX Rules (Shopify / Theme Work)

### Navigation
- Keep nav minimal. No excessive collections.
- Don’t add pages to nav unless they earn their place (policy pages can be footer-only).

### Product pages
Must be easy to scan:
- Title
- Price
- Variant selection
- Fit & Fabric (short)
- Shipping/Returns (clear)
- Reviews / UGC (if available)

### Avoid
- Surprise modals
- Autoplay audio
- Aggressive sticky popups
- Overuse of badges

---

## 5) Coding Session Rules (How to Work in This Repo)

### Before changing anything
- Identify the user-facing goal in 1 sentence.
- Confirm which page/section is impacted.
- Respect existing theme conventions (naming, spacing variables, component structure).

### Implementation expectations
- Keep diffs small and reversible.
- Don’t introduce new dependencies for simple UI tweaks.
- Use existing components/utilities first.
- Test on mobile first, then desktop.

### Definition of done
- Copy matches voice rules (section 1).
- Layout respects whitespace + hierarchy (section 2 & 3).
- No regressions to header/footer, cart, product page, or checkout flow.
- Changes look correct on:
  - iPhone size (small)
  - Standard mobile (medium)
  - Desktop

---

## 6) Guardrails for “Boutique, Not Cheesy” Bundles/Promos

If implementing bundles, discounts, or promos:
- Prefer “Sets”, “Pairing”, “Complete the look” language.
- Avoid “BUY MORE SAVE MORE” banners.
- Discount presentation should be subtle and optional (not screaming).

---

## 7) Quick Copy Checklist (Run Before Committing)

- Could this copy appear on any generic swim site? If yes → rewrite.
- Is it fewer words than before? If no → trim.
- Does it say something real (fit, fabric, function)? If no → fix.
- Does it feel premium without trying too hard? If no → simplify.
- Does it match Ozella (sun, island, boutique, minimal tan lines)? If no → align.

---

## 8) When You’re Unsure

Default to:
- fewer words
- fewer UI elements
- more whitespace
- clearer benefit statements
- specific CTAs
- minimal, consistent styling

---

## 9) CSS System Match Rules (Required)

All new CSS must match the existing theme language and implementation. Do not introduce a disconnected visual style.

### 9.1 Theme CSS Architecture (How It Works)
- Base stylesheet: `assets/theme.css` (theme defaults).
- Token/override layer: `snippets/css-variables.liquid` (primary custom variable system).
- Root design tokens + layout primitives: `layout/theme.liquid` (`:root` variables and global layout behavior).
- Section-specific overrides: section files like `sections/footer.liquid` (scoped with `[data-section-id="{{ section.id }}"]` selectors).

Use this order when debugging cascade issues:
1. Check `assets/theme.css` for baseline.
2. Check `snippets/css-variables.liquid` for token overrides.
3. Check `layout/theme.liquid` for root tokens and global layout styles.
4. Check section-scoped styles for local overrides.

### 9.2 Variable-First Rule
- Always use CSS variables when a matching token exists.
- Avoid hardcoded hex/rgb unless there is no suitable token.
- Prefer:
  - `var(--colorBody)`, `var(--colorTextBody)`, `var(--colorFooter)`, `var(--colorFooterText)`, `var(--colorBtnPrimary)`, `var(--colorBtnPrimaryText)`.
  - `var(--typeHeaderPrimary)`, `var(--typeBasePrimary)`, `var(--typeAccentPrimary)`.
  - `var(--typeBaseSize)`, `var(--typeBaseLineHeight)`, `var(--grid-gutter)`.
- If alpha/overlay is needed, derive from existing tokens where possible instead of introducing unrelated colors.

### 9.3 Current Brand Tokens (Source of Truth)
Current values are driven by `config/settings_data.json` and surfaced via CSS variables.

Color system currently in use:
- Body background: `#f8f8f5` (`--colorBody`)
- Primary text: `#0b0a0b` (`--colorTextBody`)
- Footer background: `#b5d8d8` (`--colorFooter`)
- Footer text: `#0b0a0b` (`--colorFooterText`)
- Button background: `#b5d8d8` (`--colorBtnPrimary`)
- Button text: `#0b0a0b` (`--colorBtnPrimaryText`)
- Header background: `#f8f8f5` (`--colorNav`)
- Header text: `#0b0a0b` (`--colorNavText`)
- Accent/savings color: `#FE5D9F` (`--colorTextSavings`)

Typography system currently in use:
- Heading/display family: `"Contempora Sans"` (`--typeHeaderPrimary`)
- Body/copy family: `"Freight Text Pro"` (`--typeBasePrimary`)
- Accent/UI mono family: `"GeneralGrotesqueMono-Regular"` (`--typeAccentPrimary`)
- Base body size: `18px` (`--typeBaseSize`)
- Base body line height: `1.6` (`--typeBaseLineHeight`)

Spacing/rhythm currently in use:
- Global page horizontal padding: `17px` mobile, `40px` desktop (`.page-width`/`.page-full` in theme CSS)
- Section block padding variable: `--layout-section-padding-block: 3rem`
- Grid gutter token: `--grid-gutter: 17px`
- Custom micro-spacing tokens: `--oz-space-1: 8px`, `--oz-space-2: 12px`, `--oz-space-3: 16px`, `--oz-space-4: 24px`
- Radius system: `button_style: round-slight` -> `--buttonRadius: 3px`
- Icon stroke system: `--iconWeight: 2px`, `--iconLinecaps: round`

### 9.4 Practical Implementation Rules
- Match existing typography roles:
  - Display headlines -> heading tokens.
  - Product/body copy -> base tokens.
  - Utility labels/nav/footer links/buttons -> accent tokens.
- Match existing spacing rhythm:
  - Use `clamp(...)` for responsive spacing only when needed.
  - Avoid arbitrary one-off spacing values that break rhythm.
- Keep section styles scoped:
  - Prefer `[data-section-id="{{ section.id }}"] ...` for section changes.
- For footer work:
  - Keep desktop and mobile rules separated.
  - Maintain logo crop/animation and hand layering contracts unless explicitly changed.

### 9.5 If You Need a New Token
- Add token in `snippets/css-variables.liquid` or `layout/theme.liquid` `:root` block (do not sprinkle hardcoded values across components).
- Name tokens semantically (purpose-based), not by raw color value.
