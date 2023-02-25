import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { login_schema } from '@utils/login_schema';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const { email, password, type } = Object.fromEntries(data);

		const result = login_schema.safeParse(data);

		if (!result.success) {
			const response = {
				errors: { ...result.error.flatten().fieldErrors, auth: [''] }
			};

			return fail(400, response);
		}

		try {
			await locals.pb
				.collection(type as string)
				.authWithPassword(email as string, password as string);
		} catch (e) {
			const response = {
				errors: {
					auth: ['Špatný email, nebo heslo'],
					email: [''],
					password: ['']
				}
			};
			console.log(e, type, email, password)
			return fail(403, response);
		}
		if (type == 'users') {
			throw redirect(303, '/');
		} else {
			throw redirect(303, '/admin');
		}
	}
};
