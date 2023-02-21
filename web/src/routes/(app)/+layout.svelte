<script lang="ts">
	import Dashboard from './Dashboard.svelte';
	import DrawerToggle from '@components/DrawerToggle.svelte';
	import Navbar from './Navbar.svelte';
</script>

<main class="min-h-screen">
	<Navbar />
	<div class="drawer">
		<DrawerToggle routes={['create']} />
		<div class="drawer-content">
			<Dashboard />
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
