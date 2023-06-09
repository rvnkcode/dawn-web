<script lang="ts">
	import { Task } from 'carbon-icons-svelte';
	import PageHeader from '$lib/components/organisms/pageHeader.svelte';
	import InputForm from '$lib/components/organisms/inputForm.svelte';
	import List from '$lib/components/organisms/list.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';

	import type { PageServerData } from './$types';
	import NewTaskForm from '$lib/components/organisms/taskForm.svelte';
	import { clientWidth } from '$lib/stores';

	// Initialize page data
	export let data: PageServerData;
	$: ({ tasks } = data);

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<!-- TODO: Sticky header -->
<PageHeader>
	<Task size={32} /><span>Inbox</span>
</PageHeader>

{#if $clientWidth > 480}
	<NewTaskForm />
{/if}

<section>
	<!-- <List {tasks} {showNewInput} /> -->
	<!-- {#if showNewInput}
		<InputForm bind:value={showNewInput} />
	{/if} -->
</section>

<!-- <MainFooter bind:value={showNewInput} /> -->
