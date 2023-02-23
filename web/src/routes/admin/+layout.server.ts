import type { UsersResponse } from '@pocketbase/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
	depends('admin');

	const users = structuredClone(
		await locals.pb.collection('users').getFullList<UsersResponse>(200)
	);

	return {
		users
	};
}) satisfies LayoutServerLoad;
