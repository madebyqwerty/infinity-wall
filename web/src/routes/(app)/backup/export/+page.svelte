<script lang="ts">
    import { export_backup } from "@pocketbase/backup/export_backup"
    import Sidebar from "@components/Sidebar.svelte";
</script>

<Sidebar
    route = "/"
    title="Exportujte zálohu"
	description="Zde si můžete exportovat .csv zálohu, kterou můžete importovat zde (doplnit odkaz pls)">
    <button on:click={export_backup} class="btn btn-info">Exportovat zálohu</button>
</Sidebar>
