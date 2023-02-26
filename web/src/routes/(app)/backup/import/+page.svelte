<script lang="ts">
	import { import_backup } from '@pocketbase/backup/import_backup';
	import Sidebar from '@components/Sidebar.svelte';
	import { enhance } from '$app/forms';
</script>

<Sidebar
	route="/"
	title="Importujte soubor"
	description="Pokud ještě nemáte .csv zálohu, vygenerujte si ji zde (doplnit odkaz pls)"
>
	<form use:enhance method="POST">
		<input
			multiple={false}
			type="file"
			name="file"
			accept=".csv"
			class="file-input file-input-bordered file-input-info w-full max-w-xs"
		/>
		<br />
		<button class="btn btn-info">Importovat zálohu</button>
	</form>
</Sidebar>
