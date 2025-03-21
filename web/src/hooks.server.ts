import type { Handle } from '@sveltejs/kit';
import PocketBase, { type Admin, type Record } from 'pocketbase';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

const is_admin = (user: Record | Admin | null) => user?.collectionName === 'admins';

export const handle: Handle = async ({ event, resolve }) => {
	const pocketbase_URL = dev ? 'http://127.0.0.1:8080' : `http://pocketbase:8090`;

	console.log({
		PUBLIC_POCKETBASE_URL: env.PUBLIC_POCKETBASE_URL,
		pocketbase_URL: pocketbase_URL,
		process: process.env,
		dev: dev
	});
	event.locals.pb = new PocketBase('http://pocketbase:8090');

	const response = await resolve(event);

	return response;
};
