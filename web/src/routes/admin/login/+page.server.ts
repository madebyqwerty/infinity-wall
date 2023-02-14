import { login_schema } from '@utils/login_schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const { email, password } = Object.fromEntries(data);

		const result = login_schema.safeParse(data);

		if (!result.success) {
			const response = {
				errors: { ...result.error.flatten().fieldErrors, auth: [''] }
			};

			return fail(400, response);
		}

		try {
			await locals.pb.collection('admins').authWithPassword(email as string, password as string);
		} catch (e) {
			console.log(e);

			const response = {
				errors: {
					auth: ['Špatný email, nebo heslo'],
					email: [''],
					password: ['']
				}
			};

			return fail(400, response);
		}

		throw redirect(303, '/admin');
	}
};
