import type { arrayOutputType } from 'zod';
import { pb } from '../index';

function is_row_valid(row: Array<string>) {
	if (!/^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}\.\d{3}\Z/.test(row[3])) {
		return false;
	}

	if (row[5].length != 15) {
		return false;
	}

	if (1 > Number(row[7]) || Number(row[7]) > 5) {
		return false;
	}

	if (1 > Number(row[8]) || Number(row[8]) > 1440) {
		return false;
	}

	if (row[10].length != 15) {
		return false;
	}

	if (row[10] != pb.authStore.model?.id) {
		return false;
	}

	return true;
}

async function do_backup(backup: Array<string>) {
	if (!is_row_valid(backup)) {
		return 0;
	}

	try {
		const data = {
			time: backup[8],
			language: backup[6],
			rating: backup[7],
			description: backup[4],
			user: backup[10],
			date: backup[3]
		};
		const record = await pb.collection('records').update(backup[5], data, { $autoCancel: false });
		console.log('Imported');
	} 

	catch (e) {
		if (e!.toString() !== "ClientResponseError 404: The requested resource wasn't found.") {
			return 0;
		}

		const data = {
			id: backup[5],
			time: backup[8],
			language: backup[6],
			rating: backup[7],
			description: backup[4],
			user: backup[10],
			date: backup[3]
		};

		const record = await pb.collection('records').create(data, { $autoCancel: false });
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
