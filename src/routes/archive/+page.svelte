<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import MainFooter from '$lib/components/mainFooter.svelte';
	import List from '$lib/components/list.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ tasks } = data);
</script>

<svelte:head>
	<title>Dawn: Archive</title>
</svelte:head>

<Header>
	<ion-icon name="save" class="archive title" />
	<span>Archive</span>
</Header>

<main>
	<List {tasks} showNewInput={false} />
</main>

<MainFooter value={false} />
