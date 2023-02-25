import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase, { type Admin, type Record } from 'pocketbase';
import { pocketbase_URL } from '@pocketbase';

const is_admin = (user: Record | Admin | null) => user?.collectionName === 'admins';

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

	let is_valid = event.locals.pb.authStore.isValid;

	if (!event.url.toString().includes('auth') && !is_valid) {
		if (event.url.toString().includes('admin') && !is_admin(event.locals.user)) {
			throw redirect(303, '/');
		}

		const url = event.url.toString();
		const redirect_url = url.includes('admin') ? '/auth/login' : '/auth/login/admin';
		throw redirect(303, redirect_url);
	}

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
