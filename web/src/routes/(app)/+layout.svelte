<script lang="ts">
	import Dashboard from './Dashboard.svelte';
	import DrawerToggle from '@components/DrawerToggle.svelte';
	import Navbar from './Navbar.svelte';
</script>

<main>
	<div class="drawer">
		<DrawerToggle routes={['record', 'backup', 'export', 'import', "create"]} />
		<div class="drawer-content">
			<Navbar />
			<Dashboard />
		</div>
		<slot />
	</div>
</main>
