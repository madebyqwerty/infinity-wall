<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { pb } from '@pocketbase';
	import { editing } from '@utils/editingstore';

	export let id;
	export let body: string;
	export let author: string;

	let element;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: body,
			onTransaction: ({ editor }) => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				pb.collection('notes');
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<button class="btn btn-circle">
	<iconify-icon icon="mdi:dots-vertical" />
</button>

<div bind:this={element} />

{author}

<style>
	:global(h1) {
		@apply text-2xl;
	}
</style>
