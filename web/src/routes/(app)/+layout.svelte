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
		<DrawerToggle routes={['record']} />
		<div
			class="drawer-content scroll-p-32 scroll-smooth"
			on:scroll={update_scroll}
			bind:this={drawer_content}
		>
			<div class="bg">
				<Navbar {scroll_y} />
				<Hero />
			</div>
			<div class="lg:px-96">
				<div class="-translate-y-48">
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
		height: 800px;
	}
</style>
