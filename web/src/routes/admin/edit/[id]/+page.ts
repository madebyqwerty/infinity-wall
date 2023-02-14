import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const data = await parent();

	const user = data.users.find((user) => user.id == params.id);

	if (user === undefined) {
		throw redirect(303, '/admin');
	}

	return { user };
}) satisfies PageLoad;
