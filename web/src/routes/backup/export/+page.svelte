<script lang="ts">
    import { export_backup } from "../../../lib/pocketbase/backup/export_backup"
</script>

<button on:click={export_backup}>Exportovat zálohu</button>