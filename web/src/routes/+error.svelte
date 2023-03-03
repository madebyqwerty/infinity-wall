<script lnag="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen w-screen flex items-center">
	<div class="alert alert-error shadow-lg max-w-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			Jejda něco se pokazilo. Zde je ID chyby:
			<span>{$page.error?.errorId ?? 'nepodařilo se získat ID'}</span>
		</div>
	</div>
</div>
