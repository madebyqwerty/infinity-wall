<script>
	import { onMount } from 'svelte';

	onMount(() => {
		// @ts-ignore
		document.body.dataset.theme = 'admin';
	});
</script>

<main>
	<slot />
</main>

<style>
	/* Tohle je tady aby tam nebyl divný flashing před tím než se loadne daisyui theme */
	main {
		min-width: 100vv;
		min-height: 100vh;
	}
</style>
