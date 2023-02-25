import type { RecordsResponse } from '@pocketbase/types';
import { get_date_in_mmddyyyy } from '@utils/dates';
import type { RequestHandler } from './$types';
import Papa from 'papaparse';

export const GET: RequestHandler = async ({ locals }) => {
	const data = await locals.pb.collection('records').getFullList<RecordsResponse>(1000);

	const json_to_be_converted = data.map((record) => {
		return {
			id: record.id,
			date: get_date_in_mmddyyyy(new Date(record.date)),
			'time-spent': record.time,
			language: JSON.stringify(record.language),
			description: record.description
		};
	});

	const csv = Papa.unparse(json_to_be_converted);

	return new Response(csv, {
		status: 200,
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': 'attachment; filename=backup.csv'
		}
	});
};
