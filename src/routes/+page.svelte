<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/components/list.svelte';
	import NewInput from '$lib/components/newInput.svelte';
	import MainFooter from '$lib/components/mainFooter.svelte';
	import MobileOnlyButton from '$lib/components/mobileOnlyButton.svelte';

	export let data: PageData;

	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<header>
	<!-- TODO: Add today's date -->
	<MobileOnlyButton />
	<h1><ion-icon name="file-tray" class="inbox" /><span>Inbox</span></h1>
</header>

<main>
	<List {tasks} {showNewInput} />
	{#if showNewInput}
		<NewInput />
	{/if}
</main>

<MainFooter bind:value={showNewInput} />

<style>
	main {
		/* Fixed footer's height */
		margin-bottom: 3rem;
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

	main {
		margin-top: 2rem;
	}
</style>
