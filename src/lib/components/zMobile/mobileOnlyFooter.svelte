<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { selected } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';
	import CalendarMenu from '../templates/calendarMenu.svelte';

	import MoveMenu from '../templates/moveMenu.svelte';

	$: current = $page.url.pathname;

	let showMoveMenu = false;
	let showCalendarMenu = false;

	const trashSelectedTasks = async () => {
		if ($selected.size < 1) {
			return;
		}

		await trpc().trash.trashSelected.mutate([...$selected]);
		$selected.clear();
		invalidateAll();
	};

	const calendar = () => {
		if ($selected.size > 0) {
			showCalendarMenu = !showCalendarMenu;
		}
	};

	const move = () => {
		if ($selected.size > 0) {
			showMoveMenu = !showMoveMenu;
		}
	};
</script>

<div>
	<button on:click={calendar}><ion-icon name="calendar" /></button>
	<button on:click={move}><ion-icon name="arrow-forward" /></button>
	{#if current != '/trash'}
		<button
			on:click={async () => {
				await trashSelectedTasks();
			}}><ion-icon name="trash" /></button
		>
	{/if}
</div>

{#if showCalendarMenu}
	<CalendarMenu bind:value={showCalendarMenu} />
{/if}

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
		gap: 1rem;
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
