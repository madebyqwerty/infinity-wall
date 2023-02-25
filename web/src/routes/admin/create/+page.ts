import type { PageLoad } from './$types';

export const load = (async ({ parent, url }) => {
	const edit_user_id = url.searchParams.get('edit');

	if (edit_user_id !== null) {
		const user = (await parent()).users[parseInt(edit_user_id)];
		return { user };
	}

	return;
}) satisfies PageLoad;
