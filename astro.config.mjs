import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://joeattardi.com',
  output: 'static',
  integrations: [sitemap(), icon()],
  markdown: {
    shikiConfig: {
      // Both themes are emitted as CSS variables; prose.css picks one per color scheme
      themes: { light: 'light-plus', dark: 'github-dark-default' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
