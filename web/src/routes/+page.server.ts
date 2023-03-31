import type { NotesResponse } from '@pocketbase/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const notes = await locals.pb.collection('notes').getFullList<NotesResponse>();
	return {
		notes: structuredClone(notes)
	};
}) satisfies PageServerLoad;
