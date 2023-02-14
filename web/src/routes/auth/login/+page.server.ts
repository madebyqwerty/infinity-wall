import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const { email, password } = Object.fromEntries(data);

		const loginSchema = zfd.formData({
			email: z.string({ required_error: 'Email nesmí být prázdný' }),
			password: z
				.string({ required_error: 'Heslo nesmí být prázdné' })
				.min(8, 'Heslo musí být mít minimálně 8 znaků')
		});

		const result = loginSchema.safeParse(data);

		if (!result.success) {
			const response = {
				errors: result.error.flatten().fieldErrors
			};

			return fail(400, response);
		}

		try {
			await locals.pb.collection('users').authWithPassword(email as string, password as string);
		} catch (e) {
			return fail(403, { error: 'Špatné heslo nebo email' });
		}

		throw redirect(303, '/');
	}
};
