import type { APIRoute } from 'astro';
import { renderOgImage } from '../lib/og';

// The fallback share card that BaseLayout uses for every page without its own
export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    kicker: 'Senior frontend engineer  ·  Author',
    title: 'I build fast, accessible web interfaces and write about how.',
    footer: 'Books  ·  Articles  ·  Projects  ·  Blog',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
