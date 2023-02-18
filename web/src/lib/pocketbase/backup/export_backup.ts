export function export_backup() {
	const rows = [
		['name1', 'city1', 'some other info'],
		['name2', 'city2', 'more info']
	];

	let csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement('a');
	link.setAttribute('href', encodedUri);
	link.setAttribute('download', 'backup.csv');
	document.body.appendChild(link); // Required for FF

	link.click(); // This will download the data file named "my_data.csv".
}
