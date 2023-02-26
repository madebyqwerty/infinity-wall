<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let title: string;
	export let description: string = '';
	export let route: string;
	export let size: string = "max-w-sm";

	onMount(() => {
		const navbar = document.querySelector('#navbar');

		document.body.classList.add('overflow-y-hidden');
		return () => {
			document.body.classList.remove('overflow-y-hidden');
		};
	});
</script>

<div class="drawer-side ">
	<!-- svelte-ignore a11y-missing-content -->
	<a href={route} class="drawer-overlay" data-sveltekit-noscroll />

	<div
		class="p-8 {size} bg-base-100 text-base-content drawer-side-content fixed h-screen z-40"
	
	>
		<div class="flex xl:items-center">
			<h2 class="text-4xl mb-4">{@html title}</h2>
			<div class="flex-grow" />
			<a class="btn btn-outline btn-error" href={route}>Zavřít</a>
		</div>
		<p class="mb-4">{description}</p>
		<slot />
	</div>
</div>

<style>
	@keyframes slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.drawer-side-content {
		animation: slide 300ms;
		animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
	}
</style>
