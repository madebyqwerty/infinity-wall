import { redirect } from '@sveltejs/kit';
import { get_user_by_id } from '@utils/get_user_by_id';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params, url }) => {
	const user = get_user_by_id((await parent()).users);

	if (user === undefined) {
		throw redirect(303, '/admin');
	}

	return { user };
}) satisfies PageLoad;
