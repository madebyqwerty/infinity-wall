import type { RecordsResponse } from '@pocketbase/types';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
export const load = (async ({ locals, params }) => {
	const { id } = params;

	const record = await locals.pb.collection('records').getOne<RecordsResponse>(id);

	return {
		record: structuredClone(record)
	};
}) satisfies PageServerLoad;
export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = Object.fromEntries(await request.formData());
		await locals.pb.collection("records").delete(data.id);
		throw redirect(303, '/');
	}
};