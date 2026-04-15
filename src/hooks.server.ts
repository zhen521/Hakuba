import type { Handle } from '@sveltejs/kit';
import { LANGUAGE } from '$lib/constants';
import { fetchPage } from '$lib/helper/fetchPage';
import { fetchPost } from '$lib/helper/fetchPosts';

const getLang = async ({
	route,
	params
}: {
	route: { id: string | null };
	params: Record<string, string>;
}) => {
	const id = route.id;
	if (id === 'post/[post]@withoutHeader') {
		return (await fetchPost(params.post))?.metadata.lang ?? LANGUAGE;
	}
	if (id === '[page]') {
		return (await fetchPage(params.page))?.metadata.lang ?? LANGUAGE;
	}

	return LANGUAGE;
};

export const handle: Handle = async ({ event, resolve }) => {
	let lang: string | undefined;

	const response = await resolve(event, {
		transformPageChunk: async ({ html }) => {
			if (!lang) lang = await getLang(event);
			return html.replace('%lang%', lang ?? LANGUAGE);
		}
	});
	return response;
};
