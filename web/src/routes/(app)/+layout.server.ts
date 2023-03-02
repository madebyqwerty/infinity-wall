import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {
	date_to_pocketbase,
	get_date_from_ddmmyyyy,
	get_date_from_string,
	subtract_day,
	subtract_month,
	subtract_week
} from '@utils/dates';
import type { RecordsResponse } from '@pocketbase/types';

function create_filter(
	arr: Array<string | number> | null,
	type: string,
	mode: '&&' | '||' = '&&',
	operator: '=' | '~' = '='
) {
	let result = '';

	if (arr && arr.length > 0) {
		result += ' && (';
		arr.forEach((str, i) => {
			result += `${type} ${operator} "${str}" ${i + 1 !== arr.length ? mode : ''}`;
		});
		result += ')';
	}

	return result;
}

export const load = (async ({ locals, url, depends }) => {
	console.log('Running layout server load');
	depends('home');

	// Get all the records in the given timeframe
	const from = url.searchParams.get('from');
	const to = url.searchParams.get('to');

	const date_past = from
		? date_to_pocketbase(subtract_day(get_date_from_ddmmyyyy(from)))
		: date_to_pocketbase(subtract_week(new Date(), 1));
	const date_end = date_to_pocketbase(to ? get_date_from_ddmmyyyy(to) : new Date());

	console.log(date_past, date_end);

	let filter = `(date >= "${date_past}" && date <= "${date_end}")`;

	const langs: string[] | null = JSON.parse(url.searchParams.get('languages') as string);
	const stars: number[] | null = JSON.parse(url.searchParams.get('stars') as string);

	console.log(stars);

	filter += create_filter(stars, 'rating', '||', '~');
	filter += create_filter(langs, 'language', '||');

	console.log(filter);

	const records = await locals.pb.collection('records').getList<RecordsResponse>(1, 200, {
		filter: filter
	});

	let usage_data = {
		usedLanguages: {},
		mostUsed: {
			name: '',
			time: 0
		},
		totalTime: 0
	};
	records.items.map((k) => {
		if (!usage_data.usedLanguages[k.language]) {
			usage_data.usedLanguages[k.language] = k.time;
		} else {
			usage_data.usedLanguages[k.language] += k.time;
		}
		usage_data.totalTime += k.time;
	});
	usage_data.mostUsed = {
		name: Object.keys(usage_data.usedLanguages).sort((a, b) => {
			return usage_data.usedLanguages[b] - usage_data.usedLanguages[a];
		})[0],
		time: usage_data.usedLanguages[
			Object.keys(usage_data.usedLanguages).sort((a, b) => {
				return usage_data.usedLanguages[b] - usage_data.usedLanguages[a];
			})[0]
		]
	};

	console.log(usage_data);
	return {
		user: locals.user,
		records: structuredClone(records.items),
		date_past,
		date_end,
		usage_data
	};
}) satisfies LayoutServerLoad;
