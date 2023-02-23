import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { get_date_from_string, subtract_month } from '@utils/dates';
import type { RecordsResponse } from '@pocketbase/types';

function create_filter(arr: Array<string | number> | null, type: string, mode: '&&' | '||' = '&&') {
	let result = '';

	if (arr && arr.length > 0) {
		result += ' && (';
		arr.forEach((str, i) => {
			result += `${type} ~ "${str}" ${i + 1 !== arr.length ? mode : ''}`;
		});
		result += ')';
	}

	return result;
}

function convert_date_to_pocketbase_format(date: Date | null) {
	if (date) {
		return date.toISOString().replace('T', ' ').replace('Z', '');
	}
	return null;
}

export const load = (async ({ locals, url, depends }) => {
	depends('home');

	if (locals.user == null) {
		throw redirect(303, '/auth/login');
	}

	// Get all the records in the given timeframe
	const datePast =
		convert_date_to_pocketbase_format(get_date_from_string(url.searchParams.get('from'))) ??
		convert_date_to_pocketbase_format(subtract_month(new Date(), 1));
	const dateEnd =
		convert_date_to_pocketbase_format(get_date_from_string(url.searchParams.get('to'))) ??
		convert_date_to_pocketbase_format(new Date());

	let filter = `(date >= "${datePast}" && date <= "${dateEnd}")`;

	const langs: string[] | null = JSON.parse(url.searchParams.get('langs') as string);
	const tags: string[] | null = JSON.parse(url.searchParams.get('tags') as string);
	const stars: number[] | null = JSON.parse(url.searchParams.get('stars') as string)?.map(
		(el: number) => el + 1
	);

	const records = await locals.pb.collection('records').getList<RecordsResponse>(1, 200, {
		filter: filter,
		$autoCancel: false
	});

	return {
		user: locals.user,
		records: structuredClone(records.items)
	};
}) satisfies LayoutServerLoad;
