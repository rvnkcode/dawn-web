<script lang="ts">
	import Header from '$lib/components/organisms/header.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';
	import List from '$lib/components/organisms/list.svelte';
	import type { PageServerData } from './$types';
	import { format } from 'date-fns';
	import type { Task } from '@prisma/client';
	import { onMount } from 'svelte';

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	onMount(() => {
		document.cookie = `timeZone=${timeZone}`;
	});

	const today = new Date();

	export let data: PageServerData;
	$: ({
		todayList,
		yesterdayList,
		thisMonthList,
		more,
		thisYear,
		monthOfThisYear,
		nulls,
		others,
		pastMonth
	} = data);

	$: showMore = false;

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
			<button class="general" on:click={() => (showMore = true)}>More</button>
		{:else}
			{#if thisYear.length > 0}
				<h2>{format(today, 'y')}</h2>
				<hr />
				{#each monthOfThisYear as m}
					<h2 class="month">{m}</h2>
					<List tasks={handleFilter(thisYear, m)} showNewInput={false} />
				{/each}
			{/if}

			{#if others.length > 0}
				{#each pastMonth as p}
					<h2>{p.year}</h2>
					<hr />
					{#each p.month as m}
						<h2 class="month">{m}</h2>
						<List tasks={handleFilter(others, m)} showNewInput={false} />
					{/each}
				{/each}
			{/if}

			{#if nulls.length > 0}
				<h2>NaN</h2>
				<hr />
				<List tasks={nulls} showNewInput={false} />
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
	}

	button:not(:first-child) {
		margin-top: 1.5rem;
	}
</style>
