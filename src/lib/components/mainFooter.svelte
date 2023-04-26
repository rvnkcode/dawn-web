<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';
	import { isSelectModeOnMobile } from '$lib/stores';
	import MobileOnlyFooter from './mobileOnlyFooter.svelte';
	import { page } from '$app/stores';
	import MoveMenu from './moveMenu.svelte';
	import { trpc } from '../trpc/client';

	export let value: boolean;

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
		await trpc().archive.archiveChecked.mutate();
		invalidateAll();
	};
</script>

<footer>
	<!-- TODO: When press ESC key, hide input -->
	<!-- TODO: When click outside of input(out of focus), hide input -->
	{#if current !== '/trash' && current !== '/archive'}
		<button
			class={$isSelectModeOnMobile ? 'hide' : ''}
			on:click={() => {
				value = !value;
			}}><ion-icon name="add" /></button
		>
	{/if}
	<button class="hide" on:click={handleClick}><ion-icon name="arrow-forward" /></button>
	{#if current !== '/trash' && current !== '/archive'}
		<button class="hide" on:click={archiveChecked}><ion-icon name="save" /></button>
	{/if}
	{#if current != '/trash'}
		<button
			on:click={async () => {
				await trashSelectedTasks();
			}}
			class="hide"><ion-icon name="trash-bin" /></button
		>
	{/if}

	{#if $isSelectModeOnMobile}
		<MobileOnlyFooter />
	{/if}
</footer>

{#if showMoveMenu}
	<MoveMenu bind:value={showMoveMenu} />
{/if}

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
			/* Debug */
			/* border: 2px solid burlywood; */
		}

		footer > button:hover {
			border: 1px solid #eeeef0;
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
