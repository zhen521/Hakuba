import type { Component } from 'svelte';
import type Page from '../types/page';

interface PageModule {
	metadata: Page;
	default: Component;
}

export const fetchPages = async () =>
	(
		await Promise.all(
			Object.entries(import.meta.glob<PageModule>('../../routes/_page/*.md')).map(
				async ([, page]) => {
					const { metadata, default: component } = await page();
					return {
						metadata,
						component
					};
				}
			)
		)
	)
		.filter(({ metadata: { title } }) => title && title !== '__error')
		.sort((a, b) => (b.metadata?.priority ?? 0) - (a.metadata?.priority ?? 0));

export const fetchPage = async (path: string) =>
	(await fetchPages()).find(
		({ metadata: { path: identifyPath, title } }) =>
			path === identifyPath || path === title.toLowerCase()
	);
