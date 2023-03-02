<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	const { user } = $page.data as LayoutData;
</script>

<div
	id="navbar"
	class="bg-opacity-0 shadow-none text-primary-content backdrop-blur bg-base-100 transition duration-300 ease-in-out"
>
	<nav class="navbar">
		<div class="navbar-start" />
		<div class="navbar-center hidden lg:block">
			<span class="normal-case text-xl font-bold">UpShop Track</span>
		</div>
		<div class="navbar-end">
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label tabindex="0" class="btn btn-ghost" for="">
					{user?.name} <iconify-icon icon="mdi:chevron-down" />
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
