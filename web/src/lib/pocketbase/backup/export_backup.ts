import { pb } from '../index';

export async function export_backup() {
	const records = await pb.collection('records').getFullList(200 /* batch size */, {
		sort: '-created'
	});

	const out: any[][] = [];
	records.forEach((element) => {
		const [collection_id, collection_name, created, date, description, id, language, rating, time, updated, user] = Object.values(element)
		out.push([id, time, rating, description, user, date, language]);
	});

	let csvContent = 'data:text/csv;charset=utf-8,' + out.map((e) => e.join(',')).join('\n');
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement('a');
	link.setAttribute('href', encodedUri);
	link.setAttribute('download', 'backup.csv');
	document.body.appendChild(link);
	link.click();
}
