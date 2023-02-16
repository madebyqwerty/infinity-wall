<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="lg:px-96">
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
			{#each data.users as user (user.id)}
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
						<a href="/admin/edit/{user.id}" class="btn btn-primary btn-sm">
							<iconify-icon icon="material-symbols:edit" />
						</a>
						<a href="/admin/delete/{user.id}" class="btn btn-error btn-sm">
							<iconify-icon icon="material-symbols:delete-outline" />
						</a>
					</td>
				</tr>
			{:else}
				<h2>Ještě nemáte žádné přidané uživatele</h2>
			{/each}
		</tbody>
	</table>
</div>
