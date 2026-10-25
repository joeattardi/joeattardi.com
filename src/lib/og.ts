/**
 * Renders 1200×630 Open Graph cards at build time. Satori lays out a tree of
 * plain objects (no JSX needed) into SVG, and resvg rasterizes it to PNG.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { titleSegments } from './blog';
import { site } from '../data/site';

const WIDTH = 1200;
const HEIGHT = 630;

const root = process.cwd();

/**
 * The cards always use the dark palette. Reading it from global.css keeps them
 * in step with the site's tokens instead of duplicating hex values here.
 */
async function loadColors() {
  const css = await readFile(join(root, 'src/styles/global.css'), 'utf8');
  const block = css.match(/^\.dark\s*\{([^}]*)\}/m)?.[1];
  if (!block) throw new Error('OG cards: no .dark block in global.css');
  const token = (name: string) => {
    const value = block.match(new RegExp(`--color-${name}:\\s*([^;]+);`))?.[1];
    if (!value) throw new Error(`OG cards: missing --color-${name}`);
    return value.trim();
  };
  return {
    bg: token('bg'),
    surface: token('surface'),
    border: token('border'),
    fg: token('fg'),
    fgMuted: token('fg-muted'),
    primary: token('primary'),
    accent: token('accent'),
  };
}

// Satori can't read WOFF2 or variable fonts, so these are Fontsource's static WOFF cuts
async function loadFonts() {
  const font = (pkg: string, file: string) =>
    readFile(join(root, 'node_modules/@fontsource', pkg, 'files', file));
  const [serifBold, serifItalic, sans, sansSemibold] = await Promise.all([
    font('fraunces', 'fraunces-latin-700-normal.woff'),
    font('fraunces', 'fraunces-latin-400-italic.woff'),
    font('plus-jakarta-sans', 'plus-jakarta-sans-latin-500-normal.woff'),
    font('plus-jakarta-sans', 'plus-jakarta-sans-latin-700-normal.woff'),
  ]);
  return [
    { name: 'Fraunces', data: serifBold, weight: 700, style: 'normal' },
    { name: 'Fraunces', data: serifItalic, weight: 400, style: 'italic' },
    { name: 'Jakarta', data: sans, weight: 500, style: 'normal' },
    { name: 'Jakarta', data: sansSemibold, weight: 700, style: 'normal' },
  ] as const;
}

// Loaded once per build and shared by every card
const assets = Promise.all([loadColors(), loadFonts()]);

type Style = Record<string, string | number>;
type Child = Node | string;
interface Node {
  type: string;
  props: { style?: Style; children?: Child | Child[]; [key: string]: unknown };
}

const h = (type: string, style: Style, children?: Child | Child[]): Node => ({
  type,
  props: { style, children },
});

// Same paths as public/favicon.svg and Logo.astro
function logo(colors: Awaited<typeof assets>[0]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 4 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path stroke="${colors.primary}" d="M19.3 6.3 25.8 23.3M15.9 17.3h7.6"/><path stroke="${colors.fg}" d="M12.8 6.3h6.5l-6 15.5q-1.8 4.6-5.4 3.3-2-.8-1.8-3.5"/></svg>`;
  return {
    type: 'img',
    props: {
      src: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
      width: 52,
      height: 52,
    },
  };
}

function titleSize(title: string, hasSubtitle: boolean) {
  const length = title.length + (hasSubtitle ? 15 : 0);
  if (length <= 32) return 84;
  if (length <= 56) return 72;
  if (length <= 80) return 60;
  return 52;
}

export interface OgCard {
  /** Small uppercase line above the title, e.g. the post's tags */
  kicker: string;
  /** May contain Markdown backticks for inline code */
  title: string;
  subtitle?: string;
  /** Bottom line, e.g. byline, date and reading time */
  footer: string;
}

export async function renderOgImage(
  card: OgCard,
): Promise<Uint8Array<ArrayBuffer>> {
  const [colors, fonts] = await assets;
  const size = titleSize(card.title, !!card.subtitle);

  const tree = h(
    'div',
    {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: colors.bg,
      // Faint blueprint grid, echoing the site background
      backgroundImage: `linear-gradient(to right, ${colors.surface} 1px, transparent 1px), linear-gradient(to bottom, ${colors.surface} 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
      color: colors.fg,
      fontFamily: 'Jakarta',
    },
    [
      // Accent rule down the left edge
      h('div', { width: 12, height: '100%', backgroundColor: colors.primary }),
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '64px 72px 56px',
        },
        [
          h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
            logo(colors),
            h(
              'div',
              { fontFamily: 'Fraunces', fontSize: 34, fontWeight: 700 },
              site.name,
            ),
            h(
              'div',
              { marginLeft: 'auto', fontSize: 24, color: colors.fgMuted },
              new URL(site.url).host,
            ),
          ]),
          h(
            'div',
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            },
            [
              h(
                'div',
                {
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: colors.accent,
                },
                card.kicker,
              ),
              h(
                'div',
                {
                  display: 'block',
                  marginTop: 20,
                  fontFamily: 'Fraunces',
                  fontSize: size,
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: -1.5,
                  lineClamp: 3,
                },
                titleSegments(card.title).map(({ text, code }) =>
                  code ? h('span', { color: colors.primary }, text) : text,
                ),
              ),
              ...(card.subtitle
                ? [
                    h(
                      'div',
                      {
                        display: 'block',
                        marginTop: 24,
                        fontFamily: 'Fraunces',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 32,
                        lineHeight: 1.35,
                        color: colors.fgMuted,
                        lineClamp: 2,
                      },
                      card.subtitle,
                    ),
                  ]
                : []),
            ],
          ),
          h(
            'div',
            {
              display: 'flex',
              paddingTop: 28,
              borderTop: `2px solid ${colors.border}`,
              fontSize: 24,
              color: colors.fgMuted,
            },
            card.footer,
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: fonts.map((font) => ({ ...font })),
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
    .render()
    .asPng();
  // Copy out of Node's Buffer pool so the bytes are a valid Response body
  return new Uint8Array(png);
}
