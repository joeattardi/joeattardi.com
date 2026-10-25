import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { formatDate, getPosts, readingTime } from '../src/lib/blog';
import { site } from '../src/data/site';
import { renderOgImage } from './og';

const publicDir = join(process.cwd(), 'public');

async function write(path: string, png: Uint8Array) {
  const file = join(publicDir, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, png);
  console.log(`  ${path}`);
}

export async function generate() {
  // The fallback share card that BaseLayout uses for every page without its own
  await write(
    'og-default.png',
    await renderOgImage({
      kicker: 'Software engineer // Author',
      title: 'I build software and share what I learn.',
      footer: 'Books  ·  Articles  ·  Projects  ·  Blog',
    }),
  );

  const posts = (await getPosts()).filter((post) => !post.data.draft);
  for (const post of posts) {
    const { title, subtitle, publishedDate, tags } = post.data;
    await write(
      `og/blog/${post.id}.png`,
      await renderOgImage({
        kicker: tags.slice(0, 3).join('  ·  ') || 'Blog',
        title,
        subtitle,
        footer: `By ${site.name}  ·  ${formatDate(publishedDate)}  ·  ${readingTime(post)} min read`,
      }),
    );
  }
}
