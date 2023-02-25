import { login_schema } from '@utils/login_schema';
import type pocketbase from 'pocketbase';

export default async function login(type: 'admins' | 'users', data: FormData, pb: pocketbase) {
	const { email, password } = Object.fromEntries(data);

	const result = login_schema.safeParse(data);

	if (!result.success) {
		const response = {
			errors: { ...result.error.flatten().fieldErrors, auth: [''] }
		};

		return response;
	}

	try {
		await pb.collection(type).authWithPassword(email as string, password as string);
	} catch (e) {
		console.log('LOGIN ERROR:', e);
		const response = {
			errors: {
				auth: ['Špatný email, nebo heslo'],
				email: [''],
				password: ['']
			}
		};
		return response;
	}
}
