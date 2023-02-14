<script lang="ts">
	import { enhance } from '$app/forms';
	import { site_name } from '@utils';
	import type { FormData } from './$types';

	export let form: FormData;
	$: email_error = form?.errors?.email?.at(0);
	$: password_error = form?.errors?.password?.at(0);
	$: unauthorized = form?.error;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse gap-16">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">
				Přihlašte se do <br /> <span class="text-primary">UpShop {site_name}</span>
			</h1>
			<p class="py-6 lg:max-w-md">
				Vítejte v aplikaci pro zaznamenávání vašeho osobního růstu a profesionálního rozvoje v rámci
				naší společnosti UpShop. Prosím, přihlaste se a začněte využívat všech možností, které vám
				naše aplikace nabízí. Jsme tu pro vás, abychom vám pomohli s vaším růstem a abychom vás
				podpořili na cestě k dosažení vašich cílů.
			</p>
		</div>
		<form
			class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
			method="POST"
			use:enhance
		>
			<div class="card-body">
				<div class="form-control">
					{#if unauthorized}
						<div class="text-error">
							{unauthorized}
						</div>
					{/if}
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						type="text"
						placeholder="martin.novak@upshop.cz"
						id="email"
						name="email"
						class="input input-bordered {email_error || unauthorized ? 'input-error' : ''}"
					/>
					{#if email_error}
						<span class="text-error">{email_error}</span>
					{/if}
				</div>
				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Heslo</span>
					</label>
					<input
						type="password"
						placeholder="*******"
						name="password"
						class="input input-bordered {password_error || unauthorized ? 'input-error' : ''}"
						id="password"
					/>
					{#if password_error}
						<span class="text-error">{password_error}</span>
					{/if}
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary" type="submit">Přihlásit se</button>
				</div>
				<div
					class="link link-secondary tooltip tooltip-bottom"
					data-tip="Požádejte svého administrátora aby vám vytvořil účet"
				>
					Ještě nemáte účet?
				</div>
			</div>
		</form>
	</div>
</div>
