import type { RecordsResponse } from '@pocketbase/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const { id } = params;

	const record = await locals.pb.collection('records').getOne<RecordsResponse>(id);

	return {
		record: structuredClone(record)
	};
}) satisfies PageServerLoad;
