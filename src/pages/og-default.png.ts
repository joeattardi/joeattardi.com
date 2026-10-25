import type { APIRoute } from 'astro';
import { renderOgImage } from '../lib/og';

// The fallback share card that BaseLayout uses for every page without its own
export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    kicker: 'Software engineer // Author',
    title: 'I build software and share what I learn.',
    footer: 'Books  ·  Articles  ·  Projects  ·  Blog',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
