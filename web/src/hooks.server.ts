import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase, { type Admin, type Record } from 'pocketbase';
import { dev } from '$app/environment';

const is_admin = (user: Record | Admin | null) => user?.collectionName === 'admins';

export const handle: Handle = async ({ event, resolve }) => {
	const pocketbase_URL = dev
		? 'http://127.0.0.1:8090'
		: `http://${new URL(event.request.url).host}`;

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

	// Dont redirect in auth route
	if (!event.url.toString().includes('auth') && !event.url.toString().includes('users')) {
		let is_valid = event.locals.pb.authStore.isValid;
		const isnt_admin = !is_admin(event.locals.user);
		const is_admin_page = event.url.toString().includes('admin');

		if (!is_valid) {
			if (is_admin_page) {
				throw redirect(303, '/auth/login/admin');
			}
			throw redirect(303, '/auth/login');
		}

		// Redirect user to admin dashboard if admin trying to access home page
		if (!isnt_admin && !is_admin_page) throw redirect(303, '/admin');
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
