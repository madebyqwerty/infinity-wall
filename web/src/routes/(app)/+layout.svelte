<script lang="ts">
	import Hero from './Hero.svelte';
	import DrawerToggle from '@components/DrawerToggle.svelte';
	import Navbar from './Navbar.svelte';
	import Records from './Records.svelte';
	import Filter from './Filter.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main>
	<div class="drawer">
		<DrawerToggle routes={['record', 'backup', 'export', 'import', 'create', 'edit']} />

		<div class="drawer-content scroll-smooth">
			<Navbar />
			<div class="bg -my-56 py-56">
				<div class="xl:px-60 xl:py-8 px-4">
					<Hero />
				</div>
			</div>
			<div class="xl:px-60 xl:py-8 2xl:flex-row flex-col flex px-4 gap-8 mt-10">
				<Filter {data} />
				<Records {data} />
			</div>
		</div>
		<slot />
	</div>
</main>

<style>
	.bg {
		background: url('/bg.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
