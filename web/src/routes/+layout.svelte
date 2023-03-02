<script>
	import '../app.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	$: {
		if (browser) {
			document.body.dataset.theme = $page.route.id?.includes('admin') ? 'admin' : 'upshop';
		}
	}
</script>

<slot />
