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

<!-- TODO: Add side menu -->
<!-- <aside>menu</aside> -->
<section>
	<header>
		<!-- TODO: Add today's date -->
		<h1><ion-icon name="file-tray" /><span>Inbox</span></h1>
	</header>

	<main>
		<List {tasks} {showNewInput} />
		{#if showNewInput}
			<NewInput />
		{/if}
	</main>

	<MainFooter bind:value={showNewInput} />
</section>

<style>
	section {
		max-width: 960px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
	}

	@media (min-width: 481px) {
		main {
			/* Fixed footer's height */
			margin-bottom: 3rem;
		}
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
		color: #1aa9f8;
	}

	main {
		margin-top: 2rem;
	}
</style>
