<script lang="ts">
	import { import_backup } from '@pocketbase/backup/import_backup';
	import Sidebar from '@components/Sidebar.svelte';
	import { enhance } from '$app/forms';
</script>

<Sidebar
	route="/"
	title="Importujte soubor"
	description="Chcete obnovit své záznamy z uložené zálohy?
   S naší funkcí pro import dat to není žádný problém.
   Stačí vybrat soubor s vašimi záznamy a kliknout na importovat zálohu.
   Během chvíle budou vaše data zpět v aplikaci."
>
	<form use:enhance method="POST" class="flex flex-col gap-4">
		<input
			multiple={false}
			type="file"
			name="file"
			accept=".csv"
			class="file-input w-full max-w-xs"
			placeholder="Vyberte soubor"
		/>
		<button class="btn">Importovat zálohu</button>
	</form>
</Sidebar>
