import { sveltekit } from '@sveltejs/kit/vite';
import { optimizeCss } from 'carbon-preprocess-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), process.env.NODE_ENV === 'production' && optimizeCss()]
});
