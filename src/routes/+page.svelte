<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/list.svelte';

	let showNewInput = false;

	export let data: PageData;

	$: ({ tasks } = data);
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
		<form action="?/createTask" method="post">
			<input type="text" name="title" required placeholder="New To-Do" autocomplete="off" />
			<button type="submit">submit</button>
		</form>
	{/if}
</main>

<footer>
	<button
		on:click={() => {
			showNewInput = !showNewInput;
		}}>+</button
	>
	<button type="submit" form="list">Trash</button>
</footer>
