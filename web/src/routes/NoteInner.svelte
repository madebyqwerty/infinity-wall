<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { pb } from '@pocketbase';
	import { editing } from '@utils/editingstore';
	import { invalidateAll } from '$app/navigation';

	export let id;
	export let body: string;
	export let author: string;

	let element;
	let editor;

	let isEdit = false;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: body ? JSON.parse(body) : '',
			editable: true,
			editorProps: {
				attributes: {
					class: 'focus:outline-none focus:ring-0 p-2'
				}
			},
			onTransaction: ({ editor }) => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				pb.collection('notes').update(
					id,
					{ body: JSON.stringify(editor.getJSON()) },
					{ $autoCancel: false }
				);
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	async function handleDelete() {
		await pb.collection('notes').delete(id);
		await invalidateAll();
	}
</script>

<div class="card-body p-4">
	<div class="focus:outline-none focus:ring-0" bind:this={element} />

	<em>-{author}</em>

	<div class="card-actions z-50">
		<button class="btn btn-circle btn-ghost btn-sm" on:click={handleDelete}>
			<iconify-icon icon="material-symbols:delete-outline" />
		</button>
	</div>
</div>

<style>
	:global(h1) {
		@apply text-2xl;
	}
</style>
