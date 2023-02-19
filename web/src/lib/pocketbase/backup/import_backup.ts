import { pb } from '../index';

export async function import_backup(filelist: FileList) {
	for (const file of filelist) {
		let fileReader = new FileReader();
		fileReader.onload = (e) => {
			fileReader
				.result!.toString()
				.split('\n')
				.forEach(async (element) => {
					const backup = element.split(',');
					try {
						const data = {
							time: backup[8],
							language: backup[6],
							rating: backup[7],
							description: backup[4],
							user: backup[10],
							date: backup[3]
						};

						const record = await pb
							.collection('records')
							.update(backup[5], data, { $autoCancel: false });
					} catch (e) {
						if (e!.toString() == "ClientResponseError 404: The requested resource wasn't found.") {
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
						}
					}
				});
		};
		fileReader.readAsText(file);
	}
}
