import type { Actions } from './$types';
import Papa from 'papaparse';
import { date_to_pocketbase, get_date_from_ddmmyyyy } from '@utils/dates';
import { fail } from '@sveltejs/kit';

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

		if (file.size === 0)
			return fail(400, { file: 'Nebyl vybrán žádný soubor, nebo je soubor prázdný' });

		if (locals.user?.username !== file.name.split('-')[0])
			return fail(403, { file: 'Tato záloha patří jinému uživateli' });

		const records = Papa.parse<RecordData>(csv, {
			header: true
		});

		console.log(records);

		interface LineError {
			row: number;
			id: string;
		}

		const errors: LineError[] = [];

		for (let i in records.data) {
			const record = records.data[i];
			if (records.errors.find((e) => e.row === parseInt(i))) continue;

			const { id, date, language, description, rating, ...time } = record;

			const final_date = date_to_pocketbase(get_date_from_ddmmyyyy(date));

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
					errors.push({ row: parseInt(i) + 2, id });
					console.log(e);
				}
			}
		}

		if (errors.length > 0) {
			return fail(400, { errors });
		} else {
			return {
				success: true
			};
		}
	}
};
