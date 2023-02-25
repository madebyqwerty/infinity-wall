<script lang="ts">
	import Hero from './Hero.svelte';
	import DrawerToggle from '@components/DrawerToggle.svelte';
	import Navbar from './Navbar.svelte';
	import Records from './Records.svelte';
	import Filter from './Filter.svelte';

	let scroll_y = 0;
	let drawer_content: HTMLElement;

	function update_scroll() {
		scroll_y = drawer_content.scrollTop;
	}
</script>

<main>
	<div class="drawer">
		<DrawerToggle routes={['record', 'backup', 'export', 'import', "create"]} />

		<div
			class="drawer-content scroll-p-32 scroll-smooth"
			on:scroll={update_scroll}
			bind:this={drawer_content}
		>
			<div class="bg xl:h-[800px] ">
				<Navbar {scroll_y} />
				<div class="2xl:px-96 xl:px-72 px-4 xl:py-16 py-8">
					<Hero />
				</div>
			</div>
			<div class="xl:px-96 xl:py-0 px-8 py-16">
				<div class="xl:-translate-y-48">
					<Filter />
					<Records />
				</div>
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
