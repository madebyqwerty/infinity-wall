import { convert_date, convert_pocketbase_to_json, start } from '$lib/server/pocketbase';
import type { RecordsResponse } from '@pocketbase/types';
import { get_date_from_yyyymmdd } from '@utils/dates';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, params }) => {
	const pb = await start(request.url);

	try {
		const { record_id } = params;

		const record = await pb.collection('records').getOne<RecordsResponse>(record_id, {});

		return new Response(JSON.stringify(convert_pocketbase_to_json(record)), { status: 200 });
	} catch {
		return new Response(JSON.stringify(''), { status: 404 });
	}
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	const pb = await start(request.url);
	try {
		const { record_id } = params;

		await pb.collection('records').delete(record_id);

		return new Response(JSON.stringify(''), { status: 200 });
	} catch {
		return new Response(JSON.stringify(''), { status: 404 });
	}
};

export const PUT: RequestHandler = async ({ request, params }) => {
	const pb = await start(request.url);

	try {
		const { user_id, record_id } = params;
		const body = await request.json();

		var today = new Date();
		var input_date = get_date_from_yyyymmdd(body['date']);

		if (input_date > today) {
			return new Response(JSON.stringify(''), { status: 404 });
		}

		const record = await pb.collection('records').update<RecordsResponse>(record_id, {
			time: parseInt(body['time_spent']),
			rating: parseInt(body['rating']),
			description: body['description'],
			user: user_id,
			date: convert_date(body['date']),
			language: body['programming_language']
		});

		return new Response(JSON.stringify(convert_pocketbase_to_json(record)), { status: 200 });
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify(''), { status: 404 });
	}
};
