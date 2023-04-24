<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import MainFooter from '$lib/components/mainFooter.svelte';
	import List from '$lib/components/list.svelte';
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	export let data: PageData;
	$: ({ today, yesterday, thisMonth, monthOfThisYear, more, thisYear, others, nulls, pastMonth } =
		data);

	$: showMore = false;

	const date = new Date();
</script>

<svelte:head>
	<title>Dawn: Archive</title>
</svelte:head>

<Header>
	<ion-icon name="save" class="archive title" />
	<span>Archive</span>
</Header>

<main>
	{#if today.length > 0}
		<h2>Today</h2>
		<hr />
		<List tasks={today} showNewInput={false} />
	{/if}
	{#if yesterday.length > 0}
		<h2>Yesterday</h2>
		<hr />
		<List tasks={yesterday} showNewInput={false} />
	{/if}
	{#if thisMonth.length > 0}
		<h2>{format(date, 'MMM')}</h2>
		<hr />
		<List tasks={thisMonth} showNewInput={false} />
	{/if}
	{#if more > 0}
		<button class="general" on:click={() => (showMore = !showMore)}>More</button>
		{#if showMore}
			{#if thisYear.length > 0}
				<h2>{format(date, 'y')}</h2>
				<hr />
				{#each monthOfThisYear as m}
					<h2 class="month">{m}</h2>
					<List
						tasks={thisYear.filter((t) =>
							t.completedAt ? format(t.completedAt, 'MMM') === m : null
						)}
						showNewInput={false}
					/>
				{/each}
			{/if}

			{#if others.length > 0}
				{#each pastMonth as p}
					<h2>{p.year}</h2>
					<hr />
					{#each p.month as m}
						<h2 class="month">{m}</h2>
						<List
							tasks={others.filter((t) =>
								t.completedAt
									? format(t.completedAt, 'y') === p.year && format(t.completedAt, 'MMM') === m
									: null
							)}
							showNewInput={false}
						/>
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
	}

	button {
		border: 1px solid black;
		margin-top: 1.5rem;
	}
</style>
