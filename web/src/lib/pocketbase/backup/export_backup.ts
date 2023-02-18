import { pb } from '../index';

export async function export_backup() {
	const records = await pb.collection('records').getFullList(200 /* batch size */, {
		sort: '-created'
	});

	const out: any[][] = [];
	records.forEach((element) => {
		out.push(Object.values(element));
	});

	let csvContent = 'data:text/csv;charset=utf-8,' + out.map((e) => e.join(',')).join('\n');
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement('a');
	link.setAttribute('href', encodedUri);
	link.setAttribute('download', 'backup.csv');
	document.body.appendChild(link);
	link.click();
}
