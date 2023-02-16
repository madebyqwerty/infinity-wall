<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let open = false;

	// Aby fungovala animace
	onMount(() => {
		setTimeout(() => {
			open = true;
		}, 50);
	});
</script>

<div class="modal {open ? 'modal-open' : ''}">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Jste si jistý že chcete odstranit uživatele {data.user.name}</h3>
		<p class="py-4">Tato akce je nevratná. Pokud nemá tento uživatel zálohu.</p>
		<div class="modal-action">
			<a href="/admin" class="btn btn-outline btn-primary">Zrušit</a>
			<form
				method="POST"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success') {
							console.log('NICE');
							await update();
							await goto('/admin');
							// AddToas
						}
					};
				}}
			>
				<input type="hidden" value={data.user.id} name="id" />
				<button class="btn btn-error">Ano odstranit uživatele</button>
			</form>
		</div>
	</div>
</div>
