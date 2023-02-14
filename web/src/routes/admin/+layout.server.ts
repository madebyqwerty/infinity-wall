import type { UsersResponse } from '@pocketbase/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const users = structuredClone(
		await locals.pb.collection('users').getFullList<UsersResponse>(200)
	);

	return {
		users
	};
}) satisfies LayoutServerLoad;
