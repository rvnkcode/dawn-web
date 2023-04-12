<script lang="ts">
	import List from '$lib/components/list.svelte';
	import Header from '$lib/components/header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ tasks } = data);
</script>

<svelte:head>
	<title>Dawn: Trash</title>
</svelte:head>

<Header>
	<ion-icon name="trash-bin" class="trashIcon" /><span>Trash</span>
</Header>

<main>
	{#if tasks.length > 0}
		<button class="blue">Empty Trash</button>
	{/if}
	<List {tasks} showNewInput={false} />
</main>

<style>
	button {
		margin-bottom: 1.5rem;
	}
</style>
