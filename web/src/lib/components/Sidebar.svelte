<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let title: string;
	export let description: string = '';
	export let route: string;

	onMount(() => {
		document.body.classList.add('overflow-hidden');
		document.body.classList.add('mr-4');
		return () => {
			document.body.classList.remove('overflow-hidden');
			document.body.classList.remove('mr-4');
		};
	});
</script>

<div class="drawer-side ">
	<!-- svelte-ignore a11y-missing-content -->
	<a href={route} class="drawer-overlay" out:fade={{ duration: 300 }} data-sveltekit-noscroll />

	<div
		class="p-8 max-w-3xl w-full bg-base-100 text-base-content drawer-side-content fixed h-screen z-40"
		out:fly={{ duration: 300, x: -100 }}
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
