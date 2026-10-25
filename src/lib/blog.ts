import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Number of most recent posts given the prominent treatment on /blog */
export const FEATURED_COUNT = 3;
/** Number of older posts per page of the archive list */
export const PAGE_SIZE = 8;

/** All published posts, newest first. Drafts are only visible in dev. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  );
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function tagHref(tag: string): string {
  return `/blog/tag/${tagSlug(tag)}`;
}

/** Every tag in use, with its post count, most used first */
export function getTags(posts: Post[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

const WORDS_PER_MINUTE = 230;

export function readingTime(post: Post): number {
  const words = post.body?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatDate(
  date: Date,
  month: 'long' | 'short' = 'long',
): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Cover images share the Open Graph ratio so title-card covers aren't cropped */
export const coverClass = 'aspect-[1200/630] w-full object-cover';

/** A title split on Markdown backticks, so `code` spans can be styled */
export function titleSegments(
  title: string,
): { text: string; code: boolean }[] {
  return title
    .split('`')
    .map((text, i) => ({ text, code: i % 2 === 1 }))
    .filter(({ text }) => text.length > 0);
}

/** A title with Markdown backticks removed, for <title>, meta tags and share text */
export function plainTitle(title: string): string {
  return title.replaceAll('`', '');
}
