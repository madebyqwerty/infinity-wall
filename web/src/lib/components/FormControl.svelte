<script lang="ts">
	export let label: string;
	export let error: string[] | undefined = [''];
</script>

<div class="form-control w-full">
	<label for="label">
		<div class="label-text">{label}</div>
	</label>
	<slot />
	<div class="label-alt">
		<span class="label-text-alt text-error">
			{error?.at(0) ?? ''}
		</span>
	</div>
</div>
