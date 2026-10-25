import type { APIRoute, GetStaticPaths } from 'astro';
import {
  formatDate,
  getPosts,
  readingTime,
  type Post,
} from '../../../lib/blog';
import { renderOgImage } from '../../../lib/og';
import { site } from '../../../data/site';

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: Post }> = async ({ props: { post } }) => {
  const { title, subtitle, publishedDate, tags } = post.data;
  const png = await renderOgImage({
    kicker: tags.slice(0, 3).join('  ·  ') || 'Blog',
    title,
    subtitle,
    footer: `By ${site.name}  ·  ${formatDate(publishedDate)}  ·  ${readingTime(post)} min read`,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
