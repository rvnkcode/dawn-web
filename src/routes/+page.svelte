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
		<!-- TODO: Add today's date -->
		<h1><ion-icon name="file-tray" /><span>Inbox</span></h1>
	</header>

	<main>
		<List {tasks} />
		{#if showNewInput}
			<NewInput />
		{/if}
	</main>

	<footer>
		<!-- TODO: When press ESC key, hide input -->
		<!-- TODO: When click outside of input(out of focus), hide input -->
		<button
			on:click={() => {
				showNewInput = !showNewInput;
			}}><ion-icon name="add" /></button
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
		/* border: 2px solid violet; */
	}

	header > h1 {
		font-size: x-large;
		font-weight: bold;
	}

	h1 > ion-icon {
		vertical-align: bottom;
		margin-right: 0.25rem;
		/* TODO: Change color */
		color: blue;
	}

	main {
		/* Fixed footer's height */
		margin: 1rem 0 3rem 0;
	}

	footer {
		position: fixed;
		z-index: 1;
		bottom: 0;
		width: 100%;
	}

	footer > button {
		border: none;
		background: none;
		width: 100%;
		padding: 0.5rem 0;
	}

	@media (min-width: 481px) {
		footer {
			left: 0;
			background-color: white;
			display: flex;
			justify-content: space-evenly;
			/* Debug */
			/* border: 2px solid burlywood; */
		}

		footer > button:hover {
			cursor: pointer;
			/* TODO: Change color */
			border: 1px solid gray;
			background-color: lightgray;
		}
	}

	@media (max-width: 480px) {
		section {
			padding: 0 1rem;
		}

		footer {
			/* TODO: Change color */
			background-color: blue;
			width: 3rem;
			height: 3rem;
			border-radius: 100%;
			right: 0;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
		}

		footer > button > ion-icon {
			color: white;
			font-size: xx-large;
		}
	}
</style>
