<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	$: current = $page.url.pathname;

	export let id: number;
	export let done: boolean;

	const deleteTask = async (id: number) => {
		await trpc().trash.deleteTask.mutate(id);
		invalidateAll();
	};

	const archiveTask = async (id: number) => {
		await trpc().archive.archiveTask.mutate(id);
		invalidateAll();
	};

	const undoTrash = async (id: number) => {
		await trpc().trash.undoTrash.mutate(id);
		invalidateAll();
	};

	const undoArchive = async (id: number) => {
		await trpc().archive.undoArchive.mutate(id);
		invalidateAll();
	};
</script>

<div>
	<!-- archive single task button -->
	{#if current != '/archive' && current != '/trash' && done}
		<button class="overlay" disabled={!done} on:click={async () => await archiveTask(id)}
			><ion-icon name="save" /></button
		>
	{/if}
	<!-- Undo trash button -->
	{#if current === '/trash'}
		<button on:click={async () => await undoTrash(id)} class="overlay"
			><ion-icon name="arrow-undo" /></button
		>
	{/if}
	<!-- Undo archive button -->
	{#if current === '/archive'}
		<button on:click={async () => await undoArchive(id)} class="overlay"
			><ion-icon name="arrow-undo" /></button
		>
	{/if}
	<!-- Trash single task button -->
	{#if current != '/trash'}
		<button on:click={async () => await deleteTask(id)} class="overlay"
			><ion-icon name="trash" /></button
		>
	{/if}
</div>

<style>
	@media (min-width: 481px) {
		.overlay {
			visibility: hidden;
		}

		div:hover > .overlay {
			visibility: visible;
		}

		ion-icon {
			color: #404950;
			font-size: large;
		}
	}

	@media (max-width: 480px) {
		.overlay {
			display: none;
		}
	}
</style>
