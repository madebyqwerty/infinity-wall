<script lang="ts">
	import Dashboard from './Dashboard.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	onMount(() => {
		// @ts-ignore
		document.body.dataset.theme = 'admin';
	});

	export let data: LayoutData;
	$: sidebar_open = $page.route.id?.includes('create');
</script>

<main class="min-h-screen">
	<div class="drawer">
		<input id="admin-drawer" type="checkbox" class="drawer-toggle" bind:checked={sidebar_open} />
		<div class="drawer-content">
			<Dashboard {data} />
		</div>
		<slot />
	</div>
</main>

<style>
	/* Tohle je tady aby tam nebyl divný flashing před tím než se loadne daisyui theme */
	main {
		min-width: 100vv;
		min-height: 100vh;
	}
</style>
