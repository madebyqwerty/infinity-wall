import { dev } from '$app/environment';
import type { RecordsResponse } from '@pocketbase/types';
import {
	date_to_pocketbase,
	get_date_from_ddmmyyyy,
	get_date_from_yyyymmdd,
	get_date_in_yyyymmdd
} from '@utils/dates';
import PocketBase from 'pocketbase';

export const start = async (url: string) => {
	const pocketbase_URL = dev ? 'http://127.0.0.1:8090' : `http://${new URL(url).host}`;
	const pb = new PocketBase(pocketbase_URL);

	pb.collection('admins').authWithPassword('admin', '123456');

	return pb;
};

export function convert_pocketbase_to_json(record: RecordsResponse, stringify = false) {
	return {
		id: record.id,
		date: get_date_in_yyyymmdd(new Date(record.date)),
		time_spent: `${record.time}`,
		programming_language: record.language,
		rating: record.rating,
		description: record.description
	};
}

export function convert_date(date: string) {
	return date_to_pocketbase(get_date_from_yyyymmdd(date));
}
