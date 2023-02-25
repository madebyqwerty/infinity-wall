import { redirect } from '@sveltejs/kit';
import { get_user_by_id } from '@utils/get_user_by_id';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const user = get_user_by_id((await parent()).users);

	if (user === undefined) {
		throw redirect(303, '/admin');
	}

	return { user };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { id } = Object.fromEntries(await request.formData());

		await locals.pb.collection('users').delete(id as string);
	}
};
