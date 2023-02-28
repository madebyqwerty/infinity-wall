<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { language_colors, language_names } from '@utils/languages';

	console.log($page.data);

	const data = $page.data;

	let search = '';

	$: used_languages = Object.keys(data.usage_data.usedLanguages).sort(
		(a, b) => data.usage_data.usedLanguages[b] - data.usage_data.usedLanguages[a]
	);

	$: filtered_languages =
		(JSON.parse($page.url.searchParams.get('languages') as string) as string[]) ?? [];

	$: languages = [
		used_languages,
		filtered_languages.filter((lang) => !used_languages.includes(lang))
	].flat(1);

	$: searched_languages = languages.filter((el) => el.toLowerCase().includes(search.toLowerCase()));

	async function update_languages(language: string) {
		if (filtered_languages.includes(language)) {
			filtered_languages = filtered_languages.filter((lang: string) => lang !== language);
		} else {
			filtered_languages = [...filtered_languages, language];
		}

		const url = $page.url;

		url.searchParams.set('languages', JSON.stringify(filtered_languages));

		await goto(url.toString(), { noScroll: true });
		await invalidate('home');
	}
</script>

<section id="rating">
	<label for="rating">
		<span class="label-text">Jazyky</span>
	</label>

	<input
		type="text"
		class="input input-sm border-b input-bordered block w-full my-4"
		placeholder="Hledat mezi jazyky"
		bind:value={search}
	/>

	<ul class="menu">
		{#each searched_languages as language (language)}
			<li class="form-control">
				<label class="label cursor-pointer justify-start">
					<input
						type="checkbox"
						checked={filtered_languages.includes(language)}
						on:change={() => update_languages(language)}
						class="checkbox checkbox-xs"
					/>
					<span class="label-text flex">
						{language}
					</span>
				</label>
			</li>
		{/each}
	</ul>
</section>
