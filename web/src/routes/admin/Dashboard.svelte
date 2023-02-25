<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="xl:px-96">
	<h1 class="text-6xl text-primary my-16">Management uživatelů</h1>
	<table class="table max-w-screen-xl w-full">
		<thead>
			<tr>
				<th>Jméno</th>
				<th>Uživatelské jméno</th>
				<th>Email</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each data.users as user, i (user.id)}
				<tr>
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
			<tr
				><td
					><a href="/admin/create" class="btn btn-outline btn-primary">Přidat nového uživatele</a
					></td
				></tr
			>
		</tbody>
	</table>
</div>
