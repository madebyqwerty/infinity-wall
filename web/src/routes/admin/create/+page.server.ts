import { fail, redirect } from '@sveltejs/kit';
import { optional, z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = await request.formData();
		const { id, password, name, username, email } = Object.fromEntries(data);

		const user_id = url.searchParams.get('edit');
		const is_create = user_id === null;

		const user_schema = zfd.formData({
			name: z
				.string({ required_error: 'Jméno nesmí být prázdné' })
				.min(2, 'Jméno musí být delší jak 2 znaky'),
			email: z.string().optional(),
			username: z.string().optional(),
			password: is_create
				? z.string().min(8, 'Heslo musí mít minimálně 8 znaků')
				: optional(z.string())
		});

		const result = user_schema.safeParse(data);

		if (!result.success) {
			const response = result.error.flatten().fieldErrors;

			return fail(400, response);
		}

		if (is_create) {
			console.log(data);
			await locals.pb.collection('users').create({
				password,
				name,
				username,
				email,
				passwordConfirm: password
			});
		} else {
			if (!password) data.delete('password');

			await locals.pb.collection('users').update(id as string, data);
		}

		throw redirect(303, '/admin');
	}
};
