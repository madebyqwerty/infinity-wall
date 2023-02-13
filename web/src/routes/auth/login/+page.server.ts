import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { email, password } = Object.fromEntries(await request.formData());

		console.log(email, password);

		await locals.pb.collection('users').authWithPassword(email as string, password as string);

		throw redirect(303, '/');
	}
};
