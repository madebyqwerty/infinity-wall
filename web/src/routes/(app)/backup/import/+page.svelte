<script lang="ts">
    import { import_backup } from "@pocketbase/backup/import_backup"

    let files: FileList;
    function do_import_backup(){
        import_backup(files)
    }
</script>

<h2 class="text-4xl">Importujte soubor</h2>
<p>Pokud ještě nemáte .csv zálohu, vygenerujte si ji <a href="/backup/export/" class="link link-info">zde</a></p>
<br>
<input type="file" accept=".csv" bind:files class="file-input file-input-bordered file-input-info w-full max-w-xs" />
<br>
<button on:click={do_import_backup} class="btn btn-info">Importovat zálohu</button>