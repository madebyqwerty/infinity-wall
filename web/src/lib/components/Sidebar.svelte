<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let title: string;
	export let description: string = '';
	export let route: string;
</script>

<div class="drawer-side">
	<!-- svelte-ignore a11y-missing-content -->
	<a href={route} class="drawer-overlay" out:fade={{ duration: 300 }} />

	<div
		class="p-8 max-w-lg w-full bg-base-100 text-base-content drawer-side-content"
		out:fly={{ duration: 300, x: -100 }}
	>
		<h2 class="text-4xl mb-4">{title}</h2>
		<p>{description}</p>
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
