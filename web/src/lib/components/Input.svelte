<script lang="ts">
	export let value: string = '';
	export let name: string;
	export let placeholder: string;
	export let error: string;
	export let label: string;
	export let type: string;

	$: console.log(value);
</script>

<div class="form-control">
	<label for="name">
		<span class="label-text">{label}</span>
	</label>
	<input {name} id={name} {placeholder} bind:value class="input input-bordered w-full" />
	<label for="name" class="label">
		<span class="label-text-alt text-error">
			{error}
		</span>
	</label>
</div>
