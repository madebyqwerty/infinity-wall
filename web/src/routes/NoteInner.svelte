<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { pb } from '@pocketbase';
	import { editing } from '@utils/editingstore';
	import { invalidateAll } from '$app/navigation';
	import CharacterCount from '@tiptap/extension-character-count';

	export let id;
	export let body: string;
	export let author: string;
	export let date;

	let element;
	let editor: Editor;

	let onlyText = '';

	const limit = 120;

	$: length = onlyText.length;

	let isEdit = false;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				CharacterCount.configure({
					limit
				})
			],
			content: body ? JSON.parse(body) : '',
			editable: length <= 120,
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

				onlyText = editor.getText();
			},
			onFocus: () => {
				$editing = true;
			},
			onBlur: () => {
				$editing = false;
			}
		});
	});
	$: {
		if (editor) {
			editor.commands.setContent(body ? JSON.parse(body) : '');
		}
	}

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

<div class="card-body p-4 max-w-[15rem]">
	<div class="focus:outline-none focus:ring-0" bind:this={element} />

	<em>-{author}</em>
	<br />
	<em>{date.toLocaleDateString('cs')}</em>

	<div class="card-actions">
		<button class="btn btn-circle btn-ghost btn-sm z-10" on:click={handleDelete}>
			<iconify-icon icon="material-symbols:delete-outline" />
		</button>
	</div>
</div>

<style>
	:global(h1) {
		@apply text-2xl;
	}

	:global(ul) {
		@apply list-disc;
	}
</style>
