<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/list.svelte';
	import NewInput from '$lib/components/newInput.svelte';
	import MainFooter from '$lib/components/mainFooter.svelte';
	import Header from '$lib/components/header.svelte';

	export let data: PageData;

	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<Header>
	<ion-icon name="file-tray" class="inbox" /><span>Inbox</span>
</Header>

<main>
	<List {tasks} {showNewInput} />
	{#if showNewInput}
		<NewInput />
	{/if}
</main>

<MainFooter bind:value={showNewInput} />
