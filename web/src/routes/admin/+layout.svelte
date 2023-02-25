<script lang="ts">
	import Dashboard from './Dashboard.svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import DrawerToggle from '@components/DrawerToggle.svelte';

	export let data: LayoutData;
</script>

<main class="min-h-screen">
	<div class="drawer">
		<DrawerToggle routes={['create']} />
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
