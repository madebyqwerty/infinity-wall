<script lang="ts">
	import { page } from '$app/stores';

	export let routes: string[];

	let sidebar_open = false;

	$: {
		const pathname = $page.url.pathname;

		for (const route of routes) {
			if (pathname.includes(route)) {
				sidebar_open = true;
				break;
			}

			sidebar_open = false;
		}
	}
</script>

<input id="admin-drawer" type="checkbox" class="drawer-toggle" bind:checked={sidebar_open} />
