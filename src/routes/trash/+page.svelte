<script lang="ts">
	import List from '$lib/components/list.svelte';
	import Header from '$lib/components/header.svelte';
	import type { PageData } from './$types';
	import EmptyTrashConfirmModal from '$lib/components/emptyTrashConfirmModal.svelte';
	import MainFooter from '$lib/components/mainFooter.svelte';

	export let data: PageData;
	$: ({ tasks } = data);

	let open = false;
</script>

<svelte:head>
	<title>Dawn: Trash</title>
</svelte:head>

<Header>
	<ion-icon name="trash-bin" class="trashIcon title" /><span>Trash</span>
</Header>

<main>
	{#if tasks.length > 0}
		<button
			class="general blue"
			on:click={() => {
				open = true;
			}}>Empty Trash</button
		>
	{/if}
	<List {tasks} showNewInput={false} />
</main>

<MainFooter value={false} />

<EmptyTrashConfirmModal bind:value={open} />

<style>
	button {
		margin-bottom: 1.5rem;
	}
</style>
