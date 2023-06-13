<!-- Inbox -->
<script lang="ts">
	import { Task } from 'carbon-icons-svelte';

	import List from '$lib/components/organisms/list.svelte';
	import PageHeader from '$lib/components/organisms/pageHeader.svelte';
	import NewTaskForm from '$lib/components/organisms/taskForm.svelte';
	import { clientWidth } from '$lib/stores';

	import type { PageServerData } from './$types';

	// Initialize page data
	export let data: PageServerData;
	$: ({ tasks } = data);
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
	<List {tasks} showNewInput={false} />
	<!-- {#if showNewInput}
		<InputForm bind:value={showNewInput} />
	{/if} -->
</section>
