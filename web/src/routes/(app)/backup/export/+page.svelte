<script lang="ts">
    import { export_backup } from "@pocketbase/backup/export_backup"
</script>

<h2 class="text-4xl">Exportujte zálohu</h2>
<p>Zde si můžete exportovat .csv zálohu, kterou můžete importovat <a href="/backup/import/" class="link link-info">zde</a></p>
<br>
<button on:click={export_backup} class="btn btn-info">Exportovat zálohu</button>