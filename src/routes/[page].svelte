<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Component } from 'svelte';
	import { fetchPage } from '$lib/helper/fetchPage';
	import type Page from '$lib/types/page';
	import Giscus from '$lib/components/Giscus.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { error } from '@sveltejs/kit';

	export const load: Load = async ({ params: { page } }) => {
		const p = await fetchPage(page);
		if (!p) throw error(404, 'Page not found');

		return {
			metadata: p.metadata as Page,
			component: p.component
		};
	};
</script>

<script lang="ts">
	export let component: Component;
	export let metadata: Page;
</script>

<PageMeta {metadata} />

<svelte:component this={component} />

<Giscus config={metadata} />
