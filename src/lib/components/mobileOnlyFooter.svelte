<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';
	import { page } from '$app/stores';
	import MoveMenu from './moveMenu.svelte';

	$: current = $page.url.pathname;

	let showMoveMenu = false;

	const trashSelectedTasks = async () => {
		if ($selected.size < 1) {
			return;
		}

		try {
			await fetch('/api', {
				method: 'DELETE',
				body: JSON.stringify(Array.from($selected))
			});
			$selected.clear();
			invalidateAll(); // refresh all loaded data from load function
		} catch (error) {
			console.error(error);
		}
	};

	const handleClick = () => {
		// console.log($selected.size);
		if ($selected.size > 0) {
			showMoveMenu = !showMoveMenu;
		}
	};
</script>

<div>
	<button on:click={handleClick}><ion-icon name="arrow-forward" /></button>
	{#if current != '/trash'}
		<button
			on:click={async () => {
				await trashSelectedTasks();
			}}><ion-icon name="trash" /></button
		>
	{/if}
</div>

{#if showMoveMenu}
	<MoveMenu bind:value={showMoveMenu} />
{/if}

<style>
	div {
		background-color: #292c37;
		border-radius: 0.25rem;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto 1rem auto;
		width: 50%;
		padding: 0.25rem;
		display: flex;
		justify-content: center;
	}

	ion-icon {
		color: #d1d4da;
		font-size: large;
	}

	@media (min-width: 481px) {
		div {
			display: none;
		}
	}
</style>
