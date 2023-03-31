<script lang="ts">
	import FormControl from '@components/FormControl.svelte';
	import Modal from '@components/Modal.svelte';
	import Input from '@components/Input.svelte';
	import { pb } from '@pocketbase';
	import { invalidateAll } from '$app/navigation';

	export let isOpen = false;

	let name;
	let error = '';

	async function handleCreate() {
		console.log(name);
		if (name.length < 3) {
			error = 'Jméno musí mít alespoň 3 znaky';
			return;
		}

		if (name.length > 50) {
			error = 'Jméno může mít maximálně 50 znaků';
			return;
		}

		await pb.collection('notes').create({
			author: name,
			y: 100,
			x: 100
		});

		await invalidateAll();

		error = '';
		isOpen = false;
	}

	$: console.log(name);
</script>

<Modal bind:open={isOpen}>
	<h1 class="text-5xl">Vytvořit nový lístek</h1>
	<Input label="Jméno" {error} name="name" type="text" bind:value={name} placeholder="Martin" />
	<button class="btn btn-primary" on:click={handleCreate}>Vytvořit</button>
</Modal>
