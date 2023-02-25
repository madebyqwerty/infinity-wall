<script lang="ts">
	import { page } from '$app/stores';

	export let routes: string[];

	let sidebar_open = false;

	$: {
		routes.forEach((route) => {
			if ($page.route.id?.includes(route)) {
				sidebar_open = true;
			} else {
				sidebar_open = false;
			}
		});
	}
</script>

<input id="admin-drawer" type="checkbox" class="drawer-toggle" bind:checked={sidebar_open} />
