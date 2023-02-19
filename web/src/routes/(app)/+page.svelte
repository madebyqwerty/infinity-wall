<script lang="ts">
	import auth_store from '@stores/auth_store';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="/auth/login">kit.svelte.dev</a> to read the documentation</p>

<a class="btn" href="/auth/login">Login</a>

<pre>
  {JSON.stringify($auth_store)}
</pre>
<a href="/addrecord/">Addrecord</a>