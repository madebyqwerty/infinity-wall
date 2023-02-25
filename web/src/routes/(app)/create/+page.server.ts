import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { language_names } from '@utils/languages';
import { RecordsLanguageOptions } from '@pocketbase/types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = Object.fromEntries(await request.formData())
		data["time"] = parseInt(data["time"])
		data["rating"] = parseInt(data["rating"])

		

		const schema = zfd.formData({
			date: z.string({ required_error: 'Neplatné datum' }),
			time: z
				.number({ required_error: 'Neplatná délka' })
				.min(0, 'Délka musí být delší než 0')
				.max(1440, 'Délka nesmí být více než  jeden den'),
			rating: z
				.number({ required_error: 'Neplatné hodnocení' })
				.min(1, 'Hodnocení musí být alespoň jedna hvězda')
				.max(5, 'Hodnocení nesmí být více jak 5 hvězd'),
			language: z.nativeEnum(RecordsLanguageOptions),
			description: z.string().max(500, 'Popis nesmí být delší než 500 znaků')
		});

		let parsed = schema.safeParse(data)
		if(!parsed.success){
			const response = {
				errors: { ...parsed.error.flatten().fieldErrors, auth: [''] }
			};

			return fail(400, response);
		}
		try {
			data["user"] = locals.pb.authStore.model?.id
			await locals.pb
				.collection("records")
				.create(data, { $autoCancel: false });
		} catch (e) {
			console.log("idk",e, data, locals.pb.authStore.model?.id)
		}
		
		

	}
};
