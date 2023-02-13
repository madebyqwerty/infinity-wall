<script lang="ts">
	import auth_store from '@stores/auth_store';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="/auth/login">kit.svelte.dev</a> to read the documentation</p>

<pre>
  {JSON.stringify($auth_store)}
</pre>
