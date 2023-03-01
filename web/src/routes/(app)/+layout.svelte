<script lang="ts">
	import Hero from './Hero.svelte';
	import DrawerToggle from '@components/DrawerToggle.svelte';
	import Navbar from './Navbar.svelte';
	import Records from './Records.svelte';
	import Filter from './Filter.svelte';
	import type { PageData, LayoutData } from './$types';

	let scroll_y = 0;
	let drawer_content: HTMLElement;

	export let data: LayoutData;

	function update_scroll() {
		scroll_y = drawer_content.scrollTop;
	}
</script>

<main>
	<div class="drawer">
		<DrawerToggle routes={['record', 'backup', 'export', 'import', 'create', 'edit']} />

		<div class="drawer-content scroll-smooth" on:scroll={update_scroll} bind:this={drawer_content}>
			<Navbar {scroll_y} />
			<div class="bg -my-56 py-56">
				<div class="xl:px-60 xl:py-8 px-4">
					<Hero />
				</div>
			</div>
			<div class="xl:px-60 xl:py-8 2xl:grid px-4 grid-cols-12 gap-8 w-full mt-10">
				<Filter {data} />
				{#key data}
					<Records {data} />
				{/key}
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
