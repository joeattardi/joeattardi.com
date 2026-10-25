/**
 * Renders the Open Graph cards into public/. Satori and resvg need Node (resvg
 * is a native addon), so this runs locally and the PNGs are committed instead
 * of being generated during the Cloudflare build. Re-run after adding or
 * editing a blog post: `npm run og`.
 *
 * A Vite server is used only so the script can import `astro:content`.
 */
import { createServer } from 'vite';
import { getViteConfig } from 'astro/config';

const config = await getViteConfig({})({
  command: 'serve',
  mode: 'development',
});
const server = await createServer({
  ...config,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
});

console.log('Writing OG cards to public/');
const { generate } = await server.ssrLoadModule('/scripts/og-entry.ts');
await generate();
// server.close() trips over Astro's Vite logger, and nothing needs cleanup
process.exit(0);
