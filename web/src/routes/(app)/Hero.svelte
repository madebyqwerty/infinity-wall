<script>
	import { page } from '$app/stores';
</script>

<div class="text-primary-content">
	<h1 class="text-6xl font-bold text-opacity-90 mb-4 text-white">Vítejte v UpShop Track</h1>
	<p>
		V období od
		<span class="highlighted">
			{new Date($page.data.date_past).toLocaleDateString('cs')}
		</span>

		do <span class="highlighted">{new Date($page.data.date_end).toLocaleDateString('cs')}</span>

		jste si {$page.data.records.length == 0 ? 'nepřidal/a žádný záznam.' : 'přidal/a'}

		{#if $page.data.records.length > 0}
			<span class="highlighted">
				{$page.data.records.length}
				záznam{[2, 3, 4].includes($page.data.records.length)
					? 'y'
					: [0, 1].includes($page.data.records.length)
					? ''
					: 'ů'}
			</span>.
		{/if}
		{#if $page.data.records.length > 0}
			Váše průměrna doba tréninku byla
			<span class="highlighted">
				{Math.round($page.data.usage_data.totalTime / $page.data.records.length)} minut.
			</span>
			Váš nejpoužívanejší jazyk je
			<span class="highlighted">
				{$page.data.usage_data.mostUsed.name} ({$page.data.usage_data.mostUsed.time} minut)
			</span>
		{/if}
	</p>
</div>

<style>
	.highlighted {
		@apply font-bold;
	}
</style>
