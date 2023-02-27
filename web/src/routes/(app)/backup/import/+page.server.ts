import type { Actions } from './$types';
import Papa from 'papaparse';

interface RecordData {
	id: string;
	date: string;
	'time-spent': string;
	language: string;
	description: string;
	rating: string;
}

const is_valid_id = (id: string) => id.length === 15;

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const file = data.file as Blob;
		const csv = await file.text();

		const records = Papa.parse<RecordData>(csv, {
			header: true
		});

		for (let i in records.data) {
			const record = records.data[i];
			if (records.errors.find((e) => e.row === parseInt(i))) continue;

			const { id, date, language, description, rating, ...time } = record;

			const [day, month, year] = date?.split('-');

			// Months in js are 0-indexed, this is why we subtract 1
			const submit_date = new Date(+year, +month - 1, +day + 1);
			submit_date.setHours(0, 0, 0, 0);
			const final_date = submit_date.toISOString();

			try {
				await locals.pb.collection('records').update(id, {
					date: final_date,
					language,
					description,
					time: time['time-spent'],
					rating
				});
			} catch (e) {
				try {
					await locals.pb.collection('records').create({
						id: is_valid_id(id) ? id : undefined,
						date: final_date,
						language,
						description,
						time: time['time-spent'],
						rating,
						user: locals?.user?.id
					});
				} catch (e) {
					console.log(e);
				}
			}
		}
	}
};
