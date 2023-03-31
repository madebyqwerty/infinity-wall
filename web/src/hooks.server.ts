import type { Handle } from '@sveltejs/kit';
import PocketBase, { type Admin, type Record } from 'pocketbase';
import { dev } from '$app/environment';

const is_admin = (user: Record | Admin | null) => user?.collectionName === 'admins';

export const handle: Handle = async ({ event, resolve }) => {
	const pocketbase_URL = dev
		? 'http://127.0.0.1:8090'
		: `http://${new URL(event.request.url).host}`;

	event.locals.pb = new PocketBase(pocketbase_URL);

	const response = await resolve(event);

	return response;
};
