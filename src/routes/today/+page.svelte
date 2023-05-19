<script lang="ts">
	import Header from '$lib/components/organisms/header.svelte';
	import InputForm from '$lib/components/organisms/inputForm.svelte';
	import List from '$lib/components/organisms/list.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Today</title>
</svelte:head>

<Header>
	<ion-icon name="receipt" class="title today" /><span>Today</span>
</Header>

<main>
	<List {tasks} {showNewInput} />
	{#if showNewInput}
		<InputForm value={false} />
	{/if}
</main>

<MainFooter bind:value={showNewInput} />
