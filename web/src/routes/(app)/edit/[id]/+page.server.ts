import type { RecordsResponse } from '@pocketbase/types';
import { RecordsLanguageOptions } from '@pocketbase/types';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const load = (async ({ locals, params }) => {
	const { id } = params;

	const record = await locals.pb.collection('records').getOne<RecordsResponse>(id);

	return {
		record: structuredClone(record)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = await request.formData();

		const id = data.get('id');

		data.delete('id');

		const schema = zfd.formData({
			date: z.string({ required_error: 'Neplatné datum' }),
			time: zfd.numeric(
				z
					.number({ required_error: 'Neplatná délka' })
					.min(0, 'Délka musí být delší než 0')
					.max(1440, 'Délka nesmí být více než  jeden den')
			),
			rating: zfd.numeric(
				z
					.number({ required_error: 'Neplatné hodnocení' })
					.min(1, 'Hodnocení musí být alespoň jedna hvězda')
					.max(5, 'Hodnocení nesmí být více jak 5 hvězd')
			),
			language: z.nativeEnum(RecordsLanguageOptions),
			description: z.string().max(500, 'Popis nesmí být delší než 500 znaků')
		});

		let parsed = schema.safeParse(data);
		if (!parsed.success) {
			const response = {
				errors: { ...parsed.error.flatten().fieldErrors, auth: [''] }
			};

			return fail(400, response);
		}
		try {
			data.set('user', locals?.user?.id as string);
			await locals.pb.collection('records').update(id as string, data);
		} catch (e) {
			console.log('idk', e, data, locals.pb.authStore.model?.id);
		}
	}
};
