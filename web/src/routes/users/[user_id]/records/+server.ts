import { convert_date, convert_pocketbase_to_json, start } from '$lib/server/pocketbase';
import type { RecordsResponse } from '@pocketbase/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, params }) => {
	const pb = await start(request.url);

	try {
		const { user_id } = params;

		const records = await pb.collection('records').getFullList<RecordsResponse>(200, {
			sort: '-created',
			filter: `user.id = "${user_id}"`
		});

		const out = records.map((record) => convert_pocketbase_to_json(record, false));

		return new Response(JSON.stringify(out), { status: 200 });
	} catch {
		return new Response(JSON.stringify({}), { status: 404 });
	}
};

export const POST: RequestHandler = async ({ request, params }) => {
	const pb = await start(request.url);

	try {
		const { user_id } = params;
		const body = await request.json();

		const created = await pb.collection('records').create({
			time: parseInt(body['time_spent']),
			rating: parseInt(body['rating']),
			description: body['description'],
			user: user_id,
			date: convert_date(body['date']),
			language: body['programming_language']
		});

		const record = await pb.collection('records').getOne<RecordsResponse>(created.id, {});

		return new Response(JSON.stringify(convert_pocketbase_to_json(record)), { status: 200 });
	} catch {
		return new Response(JSON.stringify(''), { status: 404 });
	}
};
