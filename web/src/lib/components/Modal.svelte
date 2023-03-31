<script lang="ts">
	export let open = false;
</script>

<input type="checkbox" id="my-modal-4" class="modal-toggle" bind:checked={open} />
<label for="my-modal-4" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<slot />
	</label>
</label>
