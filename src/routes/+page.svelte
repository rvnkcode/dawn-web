<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/list.svelte';
	import NewInput from '$lib/components/newInput.svelte';

	export let data: PageData;

	$: ({ tasks } = data);

	let showNewInput: boolean = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<header>
	<h1>Inbox</h1>
</header>

<main>
	<List {tasks} />
	{#if showNewInput}
		<NewInput />
	{/if}
</main>

<footer>
	<button
		on:click={() => {
			showNewInput = !showNewInput;
		}}>+</button
	>
</footer>
