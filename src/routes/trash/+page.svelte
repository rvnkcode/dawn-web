<script lang="ts">
	import List from '../../lib/components/list.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ tasks } = data);
</script>

<svelte:head>
	<title>Dawn: Trash</title>
</svelte:head>

<header>
	<h1><ion-icon name="trash-bin" class="trashIcon" /><span>Trash</span></h1>
</header>

<main>
	<List {tasks} showNewInput={false} />
</main>
