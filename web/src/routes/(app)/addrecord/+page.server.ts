import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { languageNames } from '@utils/languages';
import { RecordsLanguageOptions } from '@pocketbase/types';

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const data = await request.formData();

		const my_enum = Object.keys(languageNames);

		const schema = zfd.formData({
			date: z.string({ required_error: 'Neplatné datum' }),
			length: z
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
	}
};
