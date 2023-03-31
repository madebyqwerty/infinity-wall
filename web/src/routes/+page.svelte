<script lang="ts">
	//   import InfiniteCanvas from "../src/CanvasInteractable.svelte";
	//   import CanvasElement from "../src/CanvasElement.svelte";
	//   import CanvasElementLink from "../src/CanvasElementLink.svelte";
	import { onMount, afterUpdate } from 'svelte';
	import Canvas from 'svelte-infinite-canvas';
	import { browser } from '$app/environment';
	import Note from './Note.svelte';
	import NoteInner from './NoteInner.svelte';
	import { pb } from '@pocketbase';
	import Create from './Create.svelte';
	import { invalidateAll } from '$app/navigation';
	import { editing } from '@utils/editingstore';

	let areaElt: HTMLElement | null = null;
	let bounds = { width: 0, height: 0 };
	let offsetX = 0;
	let offsetY = 0;
	let scale = 1;
	let panzoomInstance: HTMLElement | null = null;

	export let data;

	const calculateBounds = () => {
		if (areaElt) {
			const eltBounds = areaElt.getBoundingClientRect();
			bounds = { width: eltBounds.width, height: eltBounds.height };
		}
	};

	onMount(() => {
		calculateBounds();
	});

	afterUpdate(() => {
		// calculateBounds();
	});

	$: boardData = data.notes.map((note) => {
		return {
			id: note.id,
			x: note.x,
			y: note.y,
			props: {
				body: note.body,
				author: note.author,
				id: note.id
			},
			links: []
		};
	});

	const handleDragStart = (e) => {
		$editing = true;
		console.log('drag start');
	};
	const handleDragEnd = (e) => {
		console.log('drag end', e);
		$editing = false;
		pb.collection('notes').update(
			e.detail.id,
			{ x: e.detail.x, y: e.detail.y },
			{ $$autoCancel: false }
		);
		boardData = boardData.map((elt) => {
			if (elt.id === e.detail.id) {
				elt.x = e.detail.x;
				elt.y = e.detail.y;
			}
			return elt;
		});
	};

	const handleOffset = (e) => {
		// what space is detail x y in
		// bounds in pixel space
		offsetX = e.detail.x;
		offsetY = e.detail.y;
		console.log('offset', e.detail.x, e.detail.y, offsetX, offsetY);
	};

	const handleScale = (e) => {
		// offsetX, y in pixel space
		// console.log(e.detail.scale, bounds.width, bounds.height);
		// offsetX *= e.detail.scale;
		// offsetY *= e.detail.scale;
		scale = e.detail.scale;
		console.log('scale', scale);
	};

	const handleCreateUnit = () => {
		boardData = [
			...boardData,
			{
				id: data.length + 1,
				x: offsetX,
				y: offsetY,
				links: []
			}
		];
	};

	const zoomIn = (e) => {
		// unit space
		const centerX = (offsetX + bounds.width / 2) / scale;
		const centerY = (offsetY + bounds.height / 2) / scale;
		const dX = bounds.width / 2 / scale;
		const dY = bounds.height / 2 / scale;
		const top = centerY - dY * 0.8;
		const bottom = centerY + dY * 0.8;
		const left = centerX - dX * 0.8;
		const right = centerX + dX * 0.8;

		// HACK: to cancel animation
		panzoomInstance.zoomTo(centerX, centerY, 1.25); // upper-left corner
		// relative to original

		panzoomInstance.showRectangle({
			top: top,
			bottom: bottom,
			left: left,
			right: right
		});
	};

	const boundWindow = (e) => {};

	const zoomOut = () => {
		// unit space
		const centerX = (offsetX + bounds.width / 2) / scale;
		const centerY = (offsetY + bounds.height / 2) / scale;
		const dX = bounds.width / 2 / scale;
		const dY = bounds.height / 2 / scale;
		const top = centerY - dY * 1.25;
		const bottom = centerY + dY * 1.25;
		const left = centerX - dX * 1.25;
		const right = centerX + dX * 1.25;

		// HACK: to cancel animation
		panzoomInstance.zoomTo(centerX, centerY, 0.8); // upper-left corner
		// relative to original

		panzoomInstance.showRectangle({
			top: top,
			bottom: bottom,
			left: left,
			right: right
		});
	};

	let isOpen = false;
</script>

{#if browser}
	<div class="grid ">
		<div class="h-screen bg-base-200 p-2">
			<button class="btn btn-circle" on:click={() => (isOpen = true)}>
				<iconify-icon icon="material-symbols:add-circle-outline" width={32} />
			</button>
			<a class="btn btn-circle mt-2" href="/stats">
				<iconify-icon icon="ion:ios-stats" width={32} />
			</a>
			<Create bind:isOpen />
		</div>
		<div class="area max-w-screen max-h-screen" bind:this={areaElt}>
			<Canvas
				data={boardData}
				OuterComponent={Note}
				InnerComponent={NoteInner}
				on:dragstart={handleDragStart}
				on:dragend={handleDragEnd}
				on:offsetchange={handleOffset}
				on:scalechange={handleScale}
				bind:panzoomInstance
				x={1080}
				y={1920}
			/>
		</div>
	</div>
{/if}

<style>
	.grid {
		grid-template-columns: 64px 1fr;
	}
</style>
