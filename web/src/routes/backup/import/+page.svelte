<script lang="ts">
    import { import_backup } from "@pocketbase/backup/import_backup"

    let files: FileList;
    function do_import_backup(){
        import_backup(files)
    }
</script>

<input type="file" bind:files style="width: 100%;">

<button on:click={do_import_backup}>Importovat zálohu</button>