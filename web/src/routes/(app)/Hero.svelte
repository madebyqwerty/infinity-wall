<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	$: data = $page.data as LayoutData;
</script>

<div class="text-primary-content">
	<h1 class="text-6xl font-bold text-opacity-90 mb-4 text-white">Vítejte v UpShop Track</h1>
	{#if data.records.length > 0}
		<div class="stats shadow 2xl:stats-horizontal stats-vertical">
			<div class="stat">
				<div class="stat-figure text-accent">
					<iconify-icon icon="mdi:file-document-outline" width={48} />
				</div>
				<div class="stat-title">Celkově záznamů</div>
				<div class="stat-value text-accent">{data.records.length}</div>
				<div class="stat-desc">
					záznam{[2, 3, 4].includes($page.data.records.length)
						? 'y'
						: [0, 1].includes($page.data.records.length)
						? ''
						: 'ů'}
				</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-accent">
					<iconify-icon icon="mdi:clock-time-four-outline" width={48} />
				</div>
				<div class="stat-title">Průměrná délka</div>
				<div class="stat-value text-accent">
					{Math.round(data.usage_data.totalTime / data.records.length)}
				</div>
				<div class="stat-desc">minut</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-accent">
					<iconify-icon icon="carbon:cics-program" width={48} />
				</div>
				<div class="stat-title">Nejpoužívanejší jazyk</div>
				<div class="stat-value text-accent">{data.usage_data.mostUsed.name}</div>
				<div class="stat-desc">{data.usage_data.mostUsed.time} minut</div>
			</div>
		</div>
	{/if}
</div>
