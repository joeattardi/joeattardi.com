# CLAUDE.md

Personal developer portfolio site for Joe, a senior frontend engineer and published author. The site must feel professional, fast, and polished on mobile, tablet, and desktop.

## Stack

- **Framework:** Astro (static output, `output: 'static'`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`, with design tokens in `@theme`
- **Language:** TypeScript (strict)
- **Content:** Astro content collections with Zod schemas
- **Hosting:** Cloudflare Pages (static). SSR is NOT set up yet. If a route ever needs server code, add the `@astrojs/cloudflare` adapter and opt that single route out with `export const prerender = false`. Ask before doing this.
- **Package manager:** npm only. Never use yarn, pnpm, or bun. Commit `package-lock.json`.
- **Fonts:** Fontsource, self-hosted via npm. Plus Jakarta Sans Variable (`@fontsource-variable/plus-jakarta-sans`) for UI and body, Fraunces Variable (`@fontsource-variable/fraunces`) for headings, JetBrains Mono Variable (`@fontsource-variable/jetbrains-mono`) for code. No Google Fonts CDN links.
- **Icons:** `astro-icon` with Iconify sets. `@iconify-json/ph` (Phosphor) for general icons, `@iconify-json/fa6-brands` (Font Awesome brands) for GitHub, LinkedIn, etc. Icons render as inline SVG, so no icon fonts and no client JS.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:4321
npm run build        # production build to ./dist
npm run preview      # serve the production build locally
npm run check        # astro check (type + template diagnostics)
npm run lint         # eslint .
npm run format       # prettier --write .
npm run format:check # prettier --check .
npm run lighthouse   # build, serve, run Lighthouse CI against key pages
```

### Definition of done

Before declaring any task complete, run and pass:

1. `npm run check`
2. `npm run lint`
3. `npm run format:check`
4. `npm run build`

Run `npm run lighthouse` only before pushing, when the commits being pushed change layout, fonts, images, or scripts. Do not run it after incremental changes or before each commit. Target scores of 95+ for Performance, Accessibility, Best Practices, and SEO. Report any regression.

## Git

- **Always ask before committing.** Never commit, push, or open a PR without explicit approval in the current conversation.
- When asked to commit, use short imperative messages (e.g. `Add books collection schema`).

## Project structure

```
src/
  components/      # reusable .astro components
  content/         # content collection entries
    books/
    articles/
    projects/
  content.config.ts  # collection schemas (Zod)
  layouts/         # BaseLayout.astro (head, SEO, theme script, header, footer)
  pages/           # file-based routes
  styles/
    global.css     # Tailwind import, @theme tokens, dark variant
public/            # static assets (favicon, og images, resume PDF)
```

## Pages and content

- **Landing page:** intro, short bio, featured projects/books/articles, contact and social links.
- **Books:** index plus detail pages. Published with Apress and O'Reilly.
- **Articles:** index of freelance writing (LogRocket, freeCodeCamp, Smashing Magazine, etc.). Each entry **links out to the original publication**. Do not host local copies.
- **Projects:** showcase of software projects with description, tech tags, and links to repo/demo.
- **Contact/social:** GitHub, LinkedIn, email, and others. Use FA brands icons for these.
- **Blog (later, not now):** Markdown-based, will be a new `blog` collection. Do not build it or scaffold routes for it until asked, but keep the collection architecture compatible.

### Collections

Define all schemas in `src/content.config.ts` with Zod. Starting shape (adjust when implementing):

- `books`: title, publisher, publishedDate, cover (image), summary, purchaseUrl, featured (bool)
- `articles`: title, publication, publishedDate, url (the external link, required), summary, tags, featured (bool)
- `projects`: title, summary, tech (string[]), repoUrl?, demoUrl?, image?, featured (bool), order (number)

Never hard-code content in page templates when it belongs in a collection.

## Design rules

### Aesthetic

Clean, modern, professional. Generous whitespace, strong typographic hierarchy, restrained use of color. Predominantly blue palette with a dark navy feel.

**Avoid AI-generated design tropes:** no purple or pink gradients, no gradient text, no glowing orbs or blurred blobs, no glassmorphism everywhere, no emoji as icons, no generic "Welcome to my portfolio" copy.

### Color tokens

Define the palette once as Tailwind theme tokens in `src/styles/global.css`. Use **semantic tokens only** in components (e.g. `bg-surface`, `text-fg-muted`, `border-border`, `bg-primary`). **Never use raw hex values, arbitrary color values (`bg-[#123456]`), or default Tailwind palette colors like `bg-blue-500` in components.**

Starting palette (a starting point; refine visually, keeping token names stable):

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Light mode defaults */
  --color-bg: #f7f9fc;
  --color-surface: #ffffff;
  --color-surface-raised: #eef2f8;
  --color-border: #d9e1ee;
  --color-fg: #0b1220;
  --color-fg-muted: #4a5a75;
  --color-primary: #1d4ed8;
  --color-primary-hover: #1e40af;
  --color-primary-fg: #ffffff;
  --color-accent: #0ea5e9;
}

.dark {
  --color-bg: #0a1020;
  --color-surface: #101a30;
  --color-surface-raised: #16233f;
  --color-border: #22314f;
  --color-fg: #e8eef9;
  --color-fg-muted: #9db0d0;
  --color-primary: #4f8dfd;
  --color-primary-hover: #7aa7ff;
  --color-primary-fg: #0a1020;
  --color-accent: #38bdf8;
}
```

All text/background pairings must meet **WCAG AA** contrast (4.5:1 body, 3:1 large text and UI). Check both themes.

### Dark mode

- Class-based (`.dark` on `<html>`).
- Default to the system preference (`prefers-color-scheme`).
- Manual toggle in the header; the choice is saved in `localStorage` (key: `theme`) and overrides the system preference.
- An inline script in `<head>` of `BaseLayout.astro` must set the class **before first paint** to prevent a flash of the wrong theme. Wrap `localStorage` access in try/catch.
- The toggle must be keyboard accessible with an accessible label and reflect current state.

### Typography

- Plus Jakarta Sans Variable for UI and body, Fraunces Variable for headings, JetBrains Mono Variable for code.
- Define a type scale in `@theme`; use fluid sizes (`clamp()`) for large headings.
- Body text 16px minimum, line length capped around 65-75 characters for prose.

### Layout and responsiveness

- **Mobile-first.** Write base styles for small screens, then layer on `sm:`, `md:`, `lg:`, `xl:`.
- Must look excellent at ~375px, ~768px, and ~1280px+. Check all three before finishing UI work.
- No horizontal scroll at any width. Touch targets at least 44x44px.
- Use a consistent max content width and spacing scale; no one-off magic numbers.

### Components

- Use `.astro` components by default. **No React/Vue/Svelte islands** unless there is a clear need; explain why and ask first.
- Keep client-side JS minimal. Ship zero JS where possible.
- Prefer small, single-purpose components with typed `Props` interfaces.
- Use Astro's `<Image />` / `astro:assets` for all local images (responsive sizes, modern formats, explicit dimensions to avoid layout shift).
- Respect `prefers-reduced-motion`. Animation is subtle and purposeful (CSS transitions preferred). **No animation libraries.**
- Do not add any new dependency (including UI, icon, or animation libraries) without asking.

### Icons

- General UI icons: Phosphor via `astro-icon` (`ph:` prefix).
- Brand icons (GitHub, LinkedIn, etc.): Font Awesome brands via `astro-icon` (`fa6-brands:` prefix).
- Decorative icons get `aria-hidden="true"`. Icon-only links/buttons need an accessible name.

## Quality bars

- **Accessibility:** semantic HTML, one `<h1>` per page, logical heading order, visible focus states, alt text on meaningful images, skip-to-content link, WCAG AA.
- **SEO:** unique `<title>` and meta description per page, canonical URL, Open Graph and Twitter card tags, sitemap (`@astrojs/sitemap`), `robots.txt`.
- **Performance:** target Lighthouse 95+ across the board; no unoptimized images; fonts self-hosted with `font-display: swap` and only the weights/subsets needed.

## Never do

- Never run the dev server automatically. I will start and stop it on my own.
- Never commit or push without asking.
- Never introduce SSR, an adapter, or server routes without asking.
- Never use raw hex or default Tailwind palette colors in components.
- Never add dependencies, UI frameworks, or animation libraries without asking.
- Never use purple/pink gradients or other generic AI-style visual tropes.
- Never host local copies of external articles; link to the original.
- Never skip the definition-of-done checks.
- Never build the blog until asked.
