import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import login from '../login';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();

		const response = await login('admins', data, locals.pb);

		if (response) {
			return fail(400, response);
		}
		throw redirect(303, '/admin');
	}
};
