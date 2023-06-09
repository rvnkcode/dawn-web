<script lang="ts">
	import Header from '$lib/components/organisms/pageHeader.svelte';
	import InputForm from '$lib/components/organisms/inputForm.svelte';
	import List from '$lib/components/organisms/list.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Someday</title>
</svelte:head>

<Header>
	<ion-icon name="archive" class="title someday" /><span>Someday</span>
</Header>

<main>
	<List {tasks} {showNewInput} />
	{#if showNewInput}
		<InputForm bind:value={showNewInput} />
	{/if}
</main>

<MainFooter bind:value={showNewInput} />
