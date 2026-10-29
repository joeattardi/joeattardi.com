import type { APIRoute } from 'astro';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumePdf } from '../lib/ResumePdf';
import { loadResume } from '../lib/resume';
import { site } from '../data/site';

// Rendered once at build time from the same collections as /resume
export const GET: APIRoute = async () => {
  const { resume, jobs, contacts } = await loadResume();
  const buffer = await renderToBuffer(
    ResumePdf({ name: site.name, resume, jobs, contacts }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'application/pdf' },
  });
};
