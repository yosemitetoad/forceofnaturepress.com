// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://forceofnaturepress.com',
	output: 'static',
	adapter: cloudflare({
		platformProxy: { enabled: true },
	}),
	integrations: [
		mdx(),
		sitemap({ filter: (page) => !page.includes('/admin') }),
	],
});
