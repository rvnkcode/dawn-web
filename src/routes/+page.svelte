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

<!-- TODO: Add side menu -->
<!-- <aside>menu</aside> -->
<section>
	<header>
		<!-- TODO: Add icon -->
		<!-- TODO: Add today's date -->
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
</section>

<style>
	section {
		max-width: 960px;
		width: 100%;
		margin: 0 auto;
	}

	header {
		background-color: white;
		padding-top: 3rem;
		position: sticky;
		top: 0;
		/* Debug */
		border: 2px solid violet;
	}

	header > h1 {
		font-size: x-large;
	}

	main {
		/* Fixed footer's height */
		margin-bottom: 3rem;
	}

	footer {
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white;
		/* Debug */
		border: 2px solid burlywood;
	}
</style>
