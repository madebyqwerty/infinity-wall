import { createObjectCsvWriter } from 'csv-writer';

export async function export_backup() {
	const csvWriter = createObjectCsvWriter({
		path: 'backup.csv',
		header: [
			{ id: 'name', title: 'NAME' },
			{ id: 'lang', title: 'LANGUAGE' }
		]
	});

	const records = [
		{ name: 'Bob', lang: 'French, English' },
		{ name: 'Mary', lang: 'English' }
	];

	await csvWriter.writeRecords(records);

	console.log('...Done');
}
