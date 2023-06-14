<script lang="ts">
	import Header from '$lib/components/organisms/header.svelte';
	import InputForm from '$lib/components/organisms/inputForm.svelte';
	// import List from '$lib/components/organisms/list.svelte';
	// import MainFooter from '$lib/components/organisms/mainFooter.svelte';
	import { clientWidth } from '$lib/stores';

	import type { PageServerData } from './$types';

	// Initialize page server data
	export let data: PageServerData;
	$: ({ tasks } = data);

	let showInput = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<Header>
	<ion-icon name="file-tray" class="inbox title" /><span>Inbox {$clientWidth}</span>
</Header>

<main bind:clientWidth={$clientWidth}>
	<!-- <List {tasks} showNewInput={showInput} /> -->
	{#if showInput}
		<InputForm bind:value={showInput} />
	{/if}
</main>

<!-- <MainFooter bind:value={showNewInput} /> -->
