<script lang="ts">
	import type { PageServerData } from './$types';
	import Header from '$lib/components/organisms/header.svelte';
	import List from '$lib/components/organisms/list.svelte';
	import InputForm from '$lib/components/organisms/inputForm.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';

	export let data: PageServerData;

	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<Header>
	<ion-icon name="file-tray" class="inbox title" /><span>Inbox</span>
</Header>

<main>
	<List {tasks} {showNewInput} />
	{#if showNewInput}
		<InputForm value={false} />
	{/if}
</main>

<MainFooter bind:value={showNewInput} />
