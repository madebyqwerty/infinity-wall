import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { pocketbase_URL } from '@pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(pocketbase_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	const auth_refresh = async (type: 'admins' | 'users') =>
		await event.locals.pb.collection(type).authRefresh();

	if (event.locals.pb.authStore.isValid) {
		try {
			// Checkujeme usery a pak adminy, možná by to šlo zjistit podle URL ale takhle je to víc robustní
			await auth_refresh('users').catch(async () => await auth_refresh('admins'));
		} catch (_) {
			console.log('its not valid');
			event.locals.pb.authStore.clear();
		}
	}

	event.locals.user = structuredClone(event.locals.pb.authStore.model);
	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: false,
			httpOnly: false,
			sameSite: false
		})
	);

	return response;
};
