<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(() => {
		// @ts-ignore
		document.body.dataset.theme = 'admin';
	});

	export let data: LayoutData;
	$: sidebar_open = $page.route.id?.includes('edit');
</script>

<main class="min-h-screen">
	<div class="drawer">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={sidebar_open} />
		<div class="drawer-content">
			<div class="px-96">
				<h1 class="text-6xl text-primary my-16">Management uživatelů</h1>
				<table class="table max-w-screen-xl w-full">
					<!-- head -->
					<thead>
						<tr>
							<th>Jméno</th>
							<th>Pozice a team</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						{#each data.users as user}
							<tr>
								<td>
									<figure class="flex items-center space-x-3">
										<div class="avatar">
											<div class="mask mask-squircle w-12 h-12">
												<img
													src="https://api.dicebear.com/5.x/thumbs/svg?seed={user.name}"
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div class="font-bold">{user.name}</div>
										</div>
									</figure>
								</td>
								<td>
									Manager
									<br />
									<span class="badge badge-ghost badge-sm">Ecommerce marketing</span>
								</td>
								<th>
									<a
										href="/admin/edit/{user.id}"
										data-sveltekit-preload-data="hover"
										class="btn btn-ghost btn-sm drawer-button">Upravit uživatele</a
									>
								</th>
							</tr>
						{:else}
							<h2>Ještě nemáte žádné přidané uživatele</h2>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="drawer-side">
			<label
				for="my-drawer"
				class="drawer-overlay"
				on:click={() => goto('/admin')}
				on:keypress={() => goto('/admin')}
			/>
			<ul class="menu p-4 max-w-lg w-full bg-base-100 text-base-content">
				<slot />
			</ul>
		</div>
	</div>
</main>

<style>
	/* Tohle je tady aby tam nebyl divný flashing před tím než se loadne daisyui theme */
	main {
		min-width: 100vv;
		min-height: 100vh;
	}
</style>
