<script lang="ts">
	import { enhance } from '$app/forms';
	import { site_name } from '@utils';
	import type { ActionData } from './$types';
	import Input from '@components/Input.svelte';

	export let form: ActionData;

	$: auth_error = form?.errors?.auth?.at(0) || '';
	$: email_error = form?.errors.email?.at(0) || '';
	$: password_error = form?.errors?.password?.at(0) || '';
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col xl:flex-row-reverse gap-16">
		<div class="text-center xl:text-left">
			<h1 class="text-5xl font-bold">
				Přihlašte se do <br /> <span class="text-primary">UpShop {site_name}</span>
			</h1>
			<p class="py-6 xl:max-w-md">
				Vítejte v aplikaci pro zaznamenávání vašeho osobního růstu a profesionálního rozvoje v rámci
				naší společnosti UpShop. Prosím, přihlaste se a začněte využívat všech možností, které vám
				naše aplikace nabízí. Jsme tu pro vás, abychom vám pomohli s vaším růstem a abychom vás
				podpořili na cestě k dosažení vašich cílů. <br /> <br />
				Pokud ještě nemáte účet požádejte svého administrátora aby vám účet vytvořil.
			</p>
		</div>
		<form
			class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
			method="POST"
			use:enhance
		>
			<div class="card-body">
				<div class="text-error">
					{auth_error}
				</div>

				<Input
					error={email_error}
					label="E-mail"
					name="email"
					placeholder="martin.novak@upshop.cz"
					type="email"
				/>

				<Input
					error={password_error}
					label="Heslo"
					name="password"
					placeholder="********"
					type="error"
				/>

				<div class="form-control mt-6">
					<button class="btn btn-primary" type="submit">Přihlásit se</button>
				</div>

				<div class="flex w-full flex-col">
					<a href="/auth/login/admin" class="link link-secondary">Administrátorské přihlášení</a>
				</div>
			</div>
		</form>
	</div>
</div>
