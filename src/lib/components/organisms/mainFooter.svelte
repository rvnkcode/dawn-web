<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import MoveMenu from '$lib/components/templates/moveMenu.svelte';
	import MobileOnlyFooter from '$lib/components/zMobile/mobileOnlyFooter.svelte';
	import { selected } from '$lib/stores';
	import { isSelectModeOnMobile } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	export let value: boolean; //showNewInput

	$: current = $page.url.pathname;

	let showMoveMenu = false;

	const trashSelectedTasks = async () => {
		if ($selected.size < 1) {
			return;
		}

		await trpc().trash.trashSelected.mutate([...$selected]);
		$selected.clear();
		invalidateAll();
	};

	const handleClick = () => {
		// console.log($selected.size);
		if ($selected.size > 0) {
			showMoveMenu = !showMoveMenu;
		}
	};

	const archiveChecked = async () => {
		await trpc().archive.archiveChecked.mutate(current);
		invalidateAll();
	};

	const handleKeyboard = async (e: KeyboardEvent) => {
		if (current === '/trash' || current === '/archive') {
			return;
		}

		// console.log(e.key);

		switch (e.key) {
			case 'Escape':
				value = false;
				break;

			default:
				break;
		}
	};
</script>

<footer>
	<!-- Add button -->
	{#if current !== '/trash' && current !== '/archive'}
		<button
			class={$isSelectModeOnMobile ? 'hide' : ''}
			on:click={() => {
				value = !value;
			}}><ion-icon name="add" /></button
		>
	{/if}

	<!-- Move button -->
	<div class="moveContainer">
		{#if showMoveMenu}
			<MoveMenu bind:value={showMoveMenu} />
		{/if}
		<button class="hide" on:click={handleClick}><ion-icon name="arrow-forward" /></button>
	</div>

	<!-- Archive button -->
	{#if current !== '/trash' && current !== '/archive'}
		<button class="hide" on:click={archiveChecked}><ion-icon name="save" /></button>
	{/if}

	<!-- Trash button -->
	{#if current != '/trash'}
		<button
			on:click={async () => {
				await trashSelectedTasks();
			}}
			class="hide"><ion-icon name="trash" /></button
		>
	{/if}

	{#if $isSelectModeOnMobile}
		<MobileOnlyFooter />
	{/if}
</footer>
<svelte:window on:keydown={handleKeyboard} />

<style>
	button {
		width: 100%;
		padding: 0.25rem 0;
	}

	@media (min-width: 481px) {
		footer {
			position: fixed;
			z-index: 1;
			bottom: 0;
			max-width: calc(100% - 233px); /* nav width */
			width: 100%;
			right: 0;
			background-color: white;
			display: flex;
			justify-content: space-evenly;
			align-items: flex-end;
			/* Debug */
			/* border: 2px solid burlywood; */
		}

		footer > button:hover {
			border: 1px solid #eeeef0;
		}

		div.moveContainer {
			width: 100%;
		}

		ion-icon {
			color: #404950;
			font-size: large;
		}
	}

	@media (max-width: 480px) {
		footer > button {
			background-color: #469ffc;
			width: 3rem;
			height: 3rem;
			border-radius: 100%;
			position: fixed;
			bottom: 0;
			right: 0;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
		}

		footer > button > ion-icon {
			color: white;
			font-size: xx-large;
		}

		.hide {
			display: none;
		}
	}
</style>
