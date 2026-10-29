import type { APIContext } from 'astro';
import { getPosts, plainTitle } from '../../lib/blog';
import { site } from '../../data/site';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET(context: APIContext) {
  const origin = context.site ?? new URL(site.url);
  const posts = await getPosts();
  const feedUrl = new URL('/blog/rss.xml', origin).href;

  const items = posts
    .map(({ id, data }) => {
      const link = new URL(`/blog/${id}`, origin).href;
      const categories = data.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('');
      return `<item><title>${escapeXml(plainTitle(data.title))}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${data.publishedDate.toUTCString()}</pubDate><description>${escapeXml(data.summary)}</description>${categories}</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(`${site.name}'s Blog`)}</title>
<link>${new URL('/blog', origin).href}</link>
<description>JavaScript, CSS, web platform APIs, accessibility, and lessons from two decades of building for the web.</description>
<language>en-us</language>
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
