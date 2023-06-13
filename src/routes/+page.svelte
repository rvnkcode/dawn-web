<!-- Inbox -->
<script lang="ts">
	import { Task } from 'carbon-icons-svelte';

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
<header>
	<h1>
		<Task size={32} /><span>Inbox</span>
	</h1>

	{#if $clientWidth > 480}
		<NewTaskForm />
	{/if}
</header>
