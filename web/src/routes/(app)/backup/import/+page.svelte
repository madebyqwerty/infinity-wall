<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { enhance } from '$app/forms';
	import FormControl from '@components/FormControl.svelte';
	import type { ActionData } from './$types';
	import { page } from '$app/stores';

	export let form: ActionData;
</script>

<Sidebar
	route="/home{$page.url.search}"
	title="Importujte soubor"
	description="Chcete obnovit své záznamy z uložené zálohy?
   S naší funkcí pro import dat to není žádný problém.
   Stačí vybrat soubor s vašimi záznamy a kliknout na importovat zálohu.
   Během chvíle budou vaše data zpět v aplikaci."
>
	<form use:enhance method="POST" class="flex flex-col gap-4">
		{#if form?.success}
			<div class="alert alert-success shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-success-content">Záloha byla úspěšně importována.</span>
				</div>
			</div>
			<a class="btn btn-primary" href="/home">Vrátit se na domovskou stránku</a>
		{:else}
			<FormControl label="Soubor se zálohou. (formát CSV)" error={[form?.file ?? '']}>
				<input
					multiple={false}
					type="file"
					name="file"
					accept=".csv"
					class="file-input w-full max-w-xs"
					placeholder="Vyberte soubor"
					on:change={() => {
						if (form) {
							form.file = undefined;
						}
					}}
				/>
			</FormControl>
			<button class="btn">Importovat zálohu</button>

			{#if form?.errors}
				<div class="alert alert-error shadow-lg flex-none block">
					<div class="flex items-center">
						<iconify-icon icon="material-symbols:error-circle-rounded-outline" class="text-xl" />
						<div class="font-bold">
							Nepodařilo se nám importovat záznam{form.errors.length > 1 ? 'y' : ''}
						</div>
					</div>
					<ul class="pl-1 pt-2">
						{#each form.errors as error}
							<li class="text-error-content">
								<span class="font-bold">Řádek:</span>
								{error.row}
								<span class="font-bold">ID:</span>
								{error.id}
							</li>
						{/each}
					</ul>
				</div>

				<a class="btn btn-primary" href="/home">Vrátit se na domovskou stránku</a>
			{/if}
		{/if}
	</form>
</Sidebar>
