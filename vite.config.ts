import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';

const lifecycle = process.env.npm_lifecycle_event;

const plugins: PluginOption[] = [sveltekit()];

if (lifecycle === 'report') {
	plugins.push(visualizer({ open: true, gzipSize: true, filename: 'report.html' }));
}

export default defineConfig({
	plugins: plugins
});
