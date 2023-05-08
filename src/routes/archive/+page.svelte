<script lang="ts">
	import Header from '$lib/components/organisms/header.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';
	import List from '$lib/components/organisms/list.svelte';
	import type { PageData } from './$types';
	import { format } from 'date-fns';
	import { trpc } from '$lib/trpc/client';
	import type { RouterOutputs } from '$lib/trpc/router';
	import type { Task } from '@prisma/client';

	const today = new Date();

	export let data: PageData;
	// $: ({ today, yesterday, thisMonth, monthOfThisYear, more, thisYear, others, nulls, pastMonth } =
	// 	data);
	$: ({ todayList, yesterdayList, thisMonthList, more } = data);

	$: showMore = false;
	// RouterOutputs['name of router']['name of procedure']
	let moreResults: RouterOutputs['archive']['getMoreArchives'];

	const handleMore = async () => {
		showMore = true;

		if (showMore) {
			try {
				moreResults = await trpc().archive.getMoreArchives.query();
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleFilter = (arr: Task[], month: string) => {
		return arr.filter((t) => {
			if (t.completedAt) {
				return format(t.completedAt, 'MMM') === month;
			} else return null;
		});
	};
</script>

<svelte:head>
	<title>Dawn: Archive</title>
</svelte:head>

<Header>
	<ion-icon name="save" class="archive title" />
	<span>Archive</span>
</Header>

<main>
	{#if todayList.length > 0}
		<h2>Today</h2>
		<hr />
		<List tasks={todayList} showNewInput={false} />
	{/if}

	{#if yesterdayList.length > 0}
		<h2>Yesterday</h2>
		<hr />
		<List tasks={yesterdayList} showNewInput={false} />
	{/if}

	{#if thisMonthList.length > 0}
		<h2>{format(today, 'MMM')}</h2>
		<hr />
		<List tasks={thisMonthList} showNewInput={false} />
	{/if}

	{#if more > 0}
		{#if !showMore}
			<button class="general" on:click={async () => await handleMore()}>More</button>
		{/if}

		{#if moreResults}
			{#if moreResults.thisYear.length > 0}
				<h2>{format(today, 'y')}</h2>
				<hr />
				{#each moreResults.monthOfThisYear as m}
					<h2 class="month">{m}</h2>
					<List tasks={handleFilter(moreResults.thisYear, m)} showNewInput={false} />
				{/each}
			{/if}

			{#if moreResults.others.length > 0}
				{#each moreResults.pastMonth as p}
					<h2>{p.year}</h2>
					<hr />
					{#each p.month as m}
						<h2 class="month">{m}</h2>
						<List tasks={handleFilter(moreResults.others, m)} showNewInput={false} />
					{/each}
				{/each}
			{/if}

			{#if moreResults.nulls.length > 0}
				<h2>NaN</h2>
				<hr />
				<List tasks={moreResults.nulls} showNewInput={false} />
			{/if}
		{/if}
	{/if}
</main>

<MainFooter value={false} />

<style>
	main h2:not(:first-child) {
		margin-top: 2rem;
	}

	h2 {
		font-size: large;
		font-weight: bold;
	}

	h2.month {
		font-size: medium;
		margin-top: 1rem !important;
		margin-bottom: 0.5rem;
	}

	button {
		border: 1px solid black;
		margin-top: 1.5rem;
	}
</style>
