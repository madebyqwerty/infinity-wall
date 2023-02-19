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
							time: backup[7],
							language: backup[5],
							rating: backup[6],
							description: backup[3],
							user: backup[9]
						};

						const record = await pb
							.collection('records')
							.update(backup[4], data, { $autoCancel: false });
					} catch (e) {
						if (e!.toString() == "ClientResponseError 404: The requested resource wasn't found.") {
							const data = {
								id: backup[4],
								time: backup[7],
								language: backup[5],
								rating: backup[6],
								description: backup[3],
								user: backup[9]
							};

							const record = await pb.collection('records').create(data, { $autoCancel: false });
						}
					}
				});
		};
		fileReader.readAsText(file);
	}
}
