<script lang="ts">
    import { import_backup } from "@pocketbase/backup/import_backup"
    import Sidebar from "@components/Sidebar.svelte";

    let files: FileList;
    function do_import_backup(){
        import_backup(files)
    }
</script>

<Sidebar
    route="/"
    title="Importujte soubor"
    description="Pokud ještě nemáte .csv zálohu, vygenerujte si ji zde (doplnit odkaz pls)">
    <input multiple={false} type="file" accept=".csv" bind:files class="file-input file-input-bordered file-input-info w-full max-w-xs" />
    <br>
    <button on:click={do_import_backup} class="btn btn-info">Importovat zálohu</button>
</Sidebar>