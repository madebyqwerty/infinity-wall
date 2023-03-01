<script lang="ts">
	import { get_text_color } from '@utils';
	import { get_color } from '@utils/languages';

	export let language: string;
</script>

<div
	class="badge"
	style="background-color: {get_color(language)}; border-color:{get_color(
		language
	)}; color: {get_text_color(get_color(language))};"
>
	{language}
</div>
