<script lang="ts">
	//   import InfiniteCanvas from "../src/CanvasInteractable.svelte";
	//   import CanvasElement from "../src/CanvasElement.svelte";
	//   import CanvasElementLink from "../src/CanvasElementLink.svelte";
	import { onMount, afterUpdate } from 'svelte';
	import Canvas from 'svelte-infinite-canvas';
	import { browser } from '$app/environment';
	import Note from './Note.svelte';
	import NoteInner from './NoteInner.svelte';

	let areaElt: HTMLElement | null = null;
	let bounds = { width: 0, height: 0 };
	let offsetX = 0;
	let offsetY = 0;
	let scale = 1;
	let panzoomInstance: HTMLElement | null = null;

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

	let data = [
		{
			id: 'one',
			x: 20,
			y: 150,
			props: {
				body: 'Tohle je test',
				author: 'Peter'
			},
			links: [
				{ id: 'two', props: { text: 'testing 123' } },
				{ id: 'four', props: { text: 'one to four, baby' } }
			]
		}
	];

	const handleDragStart = (e) => {
		console.log(e);
		console.log('drag start');
	};
	const handleDragEnd = (e) => {
		console.log('drag end');
		data = data.map((elt) => {
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
		data = [
			...data,
			{
				id: data.length + 1,
				x: offsetX,
				y: offsetY,
				text: 'a new unit',
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
</script>

{#if browser}
	<div class="area" bind:this={areaElt}>
		<Canvas
			{data}
			OuterComponent={Note}
			InnerComponent={NoteInner}
			on:dragstart={handleDragStart}
			on:dragend={handleDragEnd}
			on:offsetchange={handleOffset}
			on:scalechange={handleScale}
			bind:panzoomInstance
			x={2000}
			y={2000}
		/>
	</div>
{/if}
