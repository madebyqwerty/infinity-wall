<script lang="ts">
	import { language_names } from '@utils/languages';
</script>

<section id="rating">
	<label for="rating">
		<span class="label-text">Jazyky</span>
	</label>

	<ul class="menu">
		{#each Object.values(language_names) as language}
			<li class="form-control">
				<label class="label cursor-pointer justify-start">
					<input type="checkbox" checked={true} class="checkbox checkbox-xs" />
					<span class="label-text flex">
						{language}
					</span>
				</label>
			</li>
		{/each}
	</ul>
</section>
