import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.user == null) {
		throw redirect(303, '/auth/login');
	}
	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
