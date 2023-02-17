import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { pocketbase_URL } from '@pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(pocketbase_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		try {
			await event.locals.pb.collection('users').authRefresh();
		} catch (_) {
			event.locals.pb.authStore.clear();
		}
	}

	event.locals.user = structuredClone(event.locals.pb.authStore.model);
	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: false, httpOnly: false })
	);

	return response;
};
