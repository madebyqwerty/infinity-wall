<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const is_create = $page.url.searchParams.get('edit') === null;

	const title = is_create ? 'Vytvořit nového uživatele' : 'Úprava uživatele';
	const button_title = is_create ? 'Vytvořit' : 'Upravit';

	$: name_error = form?.name?.at(0) || '';
	$: email_error = form?.email?.at(0) || '';
	$: username_error = form?.username?.at(0) || '';
	$: password_error = form?.password?.at(0) || '';
</script>

<div class="drawer-side">
	<!-- svelte-ignore a11y-missing-content -->
	<a href="/admin" class="drawer-overlay" />

	<div class="p-8 max-w-lg w-full bg-base-100 text-base-content drawer-content">
		<h2 class="text-4xl mb-4">{title}</h2>
		<form use:enhance method="POST" class="flex flex-col gap-4">
			<input type="hidden" value={data.user?.id} name="id" />
			<!-- <div class="form-control">
				<label class="label" for="avatar">
					<span class="label-text">Vyberte nový profilový obrázek</span>
				</label>
				<input type="file" name="avatar" id="avatar" class="file-input w-full" />
			</div> -->
			<div class="form-control">
				<label for="name">
					<span class="label-text">Jméno</span>
				</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Nové jméno"
					value={data.user?.name || ''}
					class="input input-bordered w-full"
				/>
				<label for="name" class="label">
					<span class="label-text-alt text-error">
						{name_error}
					</span>
				</label>
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
					value={data.user?.email || ''}
					class="input input-bordered w-full"
				/>
				<label for="name" class="label">
					<span class="label-text-alt text-error">
						{email_error}
					</span>
				</label>
			</div>
			<div class="form-control">
				<label for="username">
					<span class="label-text">Uživatelské jméno</span>
				</label>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Nové uživatelské jméno"
					value={data.user?.email || ''}
					class="input input-bordered w-full"
				/>
				<label for="name" class="label">
					<span class="label-text-alt text-error">
						{email_error}
					</span>
				</label>
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
				<label for="name" class="label">
					<span class="label-text-alt text-error">
						{password_error}
					</span>
				</label>
			</div>
			<button type="submit" class="btn btn-primary"> {button_title} </button>
		</form>
	</div>
</div>

<style>
	@keyframes slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.drawer-content {
		animation: slide 300ms;
		animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
	}
</style>
