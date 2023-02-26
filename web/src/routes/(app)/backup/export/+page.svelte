<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';

	async function get_file() {
		await fetch(`/backup/export/api`, {
			method: 'GET'
		});
	}
</script>

<Sidebar
	route="/"
	title="Exportujte zálohu"
	description="Zde si můžete exportovat .csv zálohu, kterou můžete importovat zde (doplnit odkaz pls)"
>
	<button type="button" on:click={get_file} class="btn btn-primary">Exportovat zálohu</button>
</Sidebar>
