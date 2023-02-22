<script>
	import Graph from './Graph.svelte';
	import Records from './Records.svelte';
</script>

<div class="lg:px-96 py-16">
	<h1 class="text-8xl font-bold">Vítejte v <span class="text-primary">UpShop Track</span></h1>
	<p class="text-secondary-content my-4 text-justify">
		Vítejte v naší aplikaci pro osobní rozvoj a růst v rámci společnosti UpShop! Jsme nadšeni, že
		jste se k nám připojili a rádi vám pomůžeme posunout vaše schopnosti a dosáhnout vašich cílů. S
		naší aplikací můžete jednoduše zaznamenávat svůj pokrok a sledovat svůj osobní rozvoj, abyste se
		stali úspěšnějšími v práci i v životě. Nebojte se - jsme tu pro vás kdykoliv budete potřebovat a
		rádi vám pomůžeme na vaší cestě k úspěchu.
	</p>
	<Graph />
	<Records />
</div>
