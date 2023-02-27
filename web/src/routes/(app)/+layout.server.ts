import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {
	convert_date_to_pocketbase_format,
	get_date_from_string,
	subtract_month
} from '@utils/dates';
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

export const load = (async ({ locals, url, depends }) => {
	depends('home');

	// Get all the records in the given timeframe
	const date_past =
		convert_date_to_pocketbase_format(get_date_from_string(url.searchParams.get('from'))) ??
		convert_date_to_pocketbase_format(subtract_month(new Date(), 1));
	const date_end =
		convert_date_to_pocketbase_format(get_date_from_string(url.searchParams.get('to'))) ??
		convert_date_to_pocketbase_format(new Date('2024-01-01'));

	let filter = `(date >= "${date_past}" && date <= "${date_end}")`;

	const langs: string[] | null = JSON.parse(url.searchParams.get('langs') as string);
	const stars: number[] | null = JSON.parse(url.searchParams.get('stars') as string)?.map(
		(el: number) => el + 1
	);

	const records = await locals.pb.collection('records').getList<RecordsResponse>(1, 200, {
		filter: filter
	});

	let usage_data = {
		usedLanguages:{},
		mostUsed:{
			name:"",
			time:0
		},
		totalTime:0
	};
	records.items.map((k)=>{
		if(!usage_data.usedLanguages[k.language]){usage_data.usedLanguages[k.language] = k.time}
		else {usage_data.usedLanguages[k.language] += k.time}
		usage_data.totalTime+=k.time;
	})
	usage_data.mostUsed={
		name:Object.keys(usage_data.usedLanguages).sort((a,b)=>{return usage_data.usedLanguages[b] - usage_data.usedLanguages[a]})[0],
		time:usage_data.usedLanguages[Object.keys(usage_data.usedLanguages).sort((a,b)=>{return usage_data.usedLanguages[b] - usage_data.usedLanguages[a]})[0]]
	}
console.log(usage_data)
	return {
		user: locals.user,
		records: structuredClone(records.items),
		date_past,
		date_end,
		usage_data
	};
}) satisfies LayoutServerLoad;
