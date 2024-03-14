import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {"/"|"/space-tourism-site"|undefined} */
// @ts-expect-error string can not be `/${string}`
const base = process.env.BASE_PATH ?? '/space-tourism-site';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		paths: {
			base: process.argv.includes('dev') ? '' : base
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: '../../dist/space-tourism-site',
			assets: '../../dist/space-tourism-site',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
