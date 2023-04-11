<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/list.svelte';
	import NewInput from '$lib/components/newInput.svelte';
	import MainFooter from '$lib/components/mainFooter.svelte';

	export let data: PageData;

	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<header>
	<!-- TODO: Add today's date? -->
	<h1><ion-icon name="file-tray" class="inbox" /><span>Inbox</span></h1>
</header>

<main>
	<List {tasks} {showNewInput} />
	{#if showNewInput}
		<NewInput />
	{/if}
</main>

<MainFooter bind:value={showNewInput} />
