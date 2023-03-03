<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="xl:px-96">
	<div class="flex xl:flex-row flex-col gap-4 items-center justify-between">
		<h1 class="text-6xl text-base-content my-16">Management uživatelů</h1>
		<a href="/admin/create" class="btn btn-primary">Přidat nového uživatele</a>
	</div>
	<table class="table max-w-screen-xl w-full">
		<thead>
			<tr>
				<th />
				<th>ID</th>
				<th>Jméno</th>
				<th>Uživatelské jméno</th>
				<th>Email</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each data.users as user, i (user.id)}
				<tr class="hover">
					<th>{i + 1}</th>
					<td>{user.id}</td>
					<td>
						<figure class="flex items-center space-x-3">
							<div>
								<div class="font-bold">{user.name}</div>
							</div>
						</figure>
					</td>

					<td>
						{user.username}
					</td>

					<td>{user.email}</td>

					<td>
						<a href="/admin/create?edit={i}" class="btn btn-primary btn-sm">
							<iconify-icon icon="material-symbols:edit" />
						</a>
						<a href="/admin/delete/{i}" class="btn btn-error btn-sm">
							<iconify-icon icon="material-symbols:delete-outline" />
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
