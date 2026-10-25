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
      order: z.number(),
    }),
});

export const collections = { books, articles, projects };
