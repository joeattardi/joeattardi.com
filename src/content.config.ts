import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publisher: z.string(),
      publishedDate: z.coerce.date(),
      cover: image(),
      coverAlt: z.string(),
      summary: z.string(),
      amazonUrl: z.url(),
      purchaseUrl: z.url().optional(),
      featured: z.boolean().default(false),
      toc: z
        .array(z.object({ title: z.string(), description: z.string() }))
        .default([]),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    publication: z.string(),
    publishedDate: z.coerce.date(),
    url: z.url(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tech: z.array(z.string()),
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      featured: z.boolean().default(false),
      // When true, the markdown body is rendered at /projects/<id> and the
      // project card links there instead of out to the demo or repo
      page: z.boolean().default(false),
      order: z.number(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Optional deck shown under the title on the post page
      subtitle: z.string().optional(),
      summary: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      // Covers are decorative by default; set this when one carries meaning
      coverAlt: z.string().default(''),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { books, articles, projects, blog };
