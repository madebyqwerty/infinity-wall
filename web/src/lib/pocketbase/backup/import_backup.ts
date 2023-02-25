import type { arrayOutputType } from 'zod';
import { pb } from '../index';

function is_row_valid(row: Array<string>) {
	const [id, time, rating, description, user, date, language] = row;
	if (!/^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}\.\d{3}\Z/.test(date)) {
		return false;
	}

	if (id.length != 15) {
		return false;
	}

	if (1 > Number(rating) || Number(rating) > 5) {
		return false;
	}

	if (1 > Number(time) || Number(time) > 1440) {
		return false;
	}

	if (user.length != 15) {
		return false;
	}

	if (user != pb.authStore.model?.id) {
		return false;
	}

	return true;
}

async function do_backup(backup: Array<string>) {
	if (!is_row_valid(backup)) {
		return;
	}

	const [id, time, rating, description, user, date, language] = backup;

	try {
		await pb.collection('records').update(id, {time, language, rating, description, user, date}, { $autoCancel: false });
		console.log('Imported');
	} 

	catch (e) {
		if (e!.toString() !== "ClientResponseError 404: The requested resource wasn't found.") {
			return;
		}

		await pb.collection('records').create({id, time, language, rating, description, user, date}, { $autoCancel: false });
		console.log('Imported');
	}
}

export async function import_backup(filelist: FileList) {
	const file = filelist[0];
	let fileReader = new FileReader();
	fileReader.onload = (e) => {fileReader.result!.toString().split('\n').forEach(async (element) => {
			const backup = element.split(',');
			do_backup(backup);
		});
	};
	fileReader.readAsText(file);
}
