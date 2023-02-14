<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-4">
	<h2 class="text-4xl mb-4">Úprava uživatele</h2>
	<form use:enhance method="POST" class="flex flex-col gap-4">
		<div class="form-control">
			<label class="label" for="avatar">
				<span class="label-text">Vyberte nový avatar</span>
			</label>
			<input type="file" name="avatar" id="avatar" class="file-input file-input-primary w-full" />
		</div>
		<div class="form-control">
			<label for="name">
				<span class="label-text">Jméno</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Nové jméno"
				value={data.user.name}
				class="input input-bordered w-full"
			/>
		</div>
		<div class="form-control">
			<label for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Nový email"
				value={data.user.email}
				class="input input-bordered w-full"
			/>
		</div>
		<div class="form-control">
			<label for="password">
				<span class="label-text">Heslo</span>
			</label>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Nové heslo"
				class="input input-bordered w-full"
			/>
		</div>
		<button type="submit" class="btn btn-primary"> Upravit </button>
	</form>
</div>
