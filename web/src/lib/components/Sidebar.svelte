<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let title: string;
	export let description: string = '';
	export let route: string;

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
		class="p-8 max-w-3xl w-full bg-base-100 text-base-content drawer-side-content fixed h-screen z-40"
	
	>
		<h2 class="text-4xl mb-4">{title}</h2>
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
