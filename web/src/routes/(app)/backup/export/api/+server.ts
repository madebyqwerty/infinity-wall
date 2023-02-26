import type { RecordsResponse } from '@pocketbase/types';
import { get_date_in_ddmmyyyy } from '@utils/dates';
import type { RequestHandler } from './$types';
import Papa from 'papaparse';

export const GET: RequestHandler = async ({ locals }) => {
	const data = await locals.pb.collection('records').getFullList<RecordsResponse>(1000);

	const json_to_be_converted = data.map((record) => {
		return {
			id: record.id,
			date: get_date_in_ddmmyyyy(new Date(record.date)),
			'time-spent': record.time,
			language: record.language,
			rating: record.rating,
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
