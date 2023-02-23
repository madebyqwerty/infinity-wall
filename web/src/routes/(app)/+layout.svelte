<script lang="ts">
	import Dashboard from './Dashboard.svelte';
	import DrawerToggle from '@components/DrawerToggle.svelte';
	import Navbar from './Navbar.svelte';
</script>

<main>
	<Navbar />
	<div class="drawer">
		<DrawerToggle routes={['record']} />
		<div class="drawer-content">
			<Dashboard />
		</div>
		<slot />
	</div>
</main>
