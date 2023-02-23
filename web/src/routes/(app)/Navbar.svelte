<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	const { user } = $page.data as PageData;
</script>

<div
	class="sticky top-0 z-30 bg-opacity-90 backdrop-blur bg-primary text-primary-content shadow-md"
>
	<nav class="navbar">
		<div class="navbar-start">
			<div class="dropdown">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label tabindex="0" class="btn btn-ghost btn-circle" for="">
					<iconify-icon icon="material-symbols:menu" height={20} />
				</label>
				<ul
					class="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 text-base-content rounded-box w-52"
				>
					<li><a href="#graf">Graf</a></li>
					<li><a href="#filter">Filtrování</a></li>
					<li><a href="#data">Záznamy</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<span class="normal-case text-xl font-bold">UpShop Track</span>
		</div>
		<div class="navbar-end">
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label tabindex="0" class="btn btn-ghost" for="">
					{user.name}
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52"
				>
					<li><a href="/auth/logout">Odhlásit se</a></li>
				</ul>
			</div>
		</div>
	</nav>
</div>
