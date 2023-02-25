import type { Actions } from './$types';
import Papa from 'papaparse';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const file = data.file as Blob;
		const csv = await file.text();

		console.log(
			Papa.parse(csv, {
				header: true,
				dynamicTyping: true
			})
		);
	}
};
