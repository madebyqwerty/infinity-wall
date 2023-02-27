<script>
	import Graph from './Graph.svelte';
	import { page } from '$app/stores';
	import { language_names } from '@utils/languages';
	import { dataset_dev } from 'svelte/internal';
</script>

<div>
	<h1 class="text-6xl font-bold text-white text-opacity-90 mb-4">Vítejte v UpShop Track</h1>
	<p class="text-stone-800">
		V období od <span class="highlighted"
			>{new Date($page.data.date_past).toLocaleDateString('cs')}</span
		>
		do <span class="highlighted">{new Date($page.data.date_end).toLocaleDateString('cs')}</span>
		jste si {$page.data.records.length==0?"nepřidal/a žádný":"přidal/a"} <span class="highlighted">{$page.data.records.length} záznam{[2,3,4].includes($page.data.records.length)?"y":[0,1].includes($page.data.records.length)?"":"ů"}</span>.
		{#if $page.data.records.length>0} Váše
		průměrna doba tréninku byla
		<span class="highlighted">
			{Math.round($page.data.usage_data.totalTime/$page.data.records.length)} minut.
		</span> Váš nejpoužívanejší jazyk je {language_names[$page.data.usage_data.mostUsed.name]} ({$page.data.usage_data.mostUsed.time} minut){/if}

	</p>

</div>

<style>
	.highlighted {
		@apply font-bold;
	}
</style>
