import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params, url }) => {
	const data = await parent();
	const edit = url.searchParams.get('edit');

	const user = data.users.find((user) => user.id == params.id);

	if (user === undefined) {
		throw redirect(303, '/admin');
	}

	return { user };
}) satisfies PageLoad;
