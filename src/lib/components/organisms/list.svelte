<script lang="ts">
	import type { Task } from '@prisma/client';
	import { onMount } from 'svelte';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import EachTask from '$lib/components/molecules/eachTask.svelte';
	import { selected } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	export let tasks: Task[];
	export let showNewInput: boolean;

	$: current = $page.url.pathname;

	const trashSelectedTasks = async (e: KeyboardEvent) => {
		if ($selected.size < 1) {
			return;
		}
		if (current === '/trash') {
			return;
		}

		if (e.key === 'Delete') {
			// Debug
			// console.log(e.key);
			await trpc().trash.trashSelected.mutate([...$selected]);
			$selected.clear();
			invalidateAll();
		} else return;
	};

	onMount(() => {
		$selected.clear();
	});
</script>

{#if tasks.length < 1}
	<!-- {#if !showNewInput && current === '/'} -->
	{#if !showNewInput}
		<div>
			<ion-icon name="checkbox" />
		</div>
	{/if}
{:else}
	<ul>
		{#each tasks as task (task.id)}
			<EachTask {task} />
		{/each}
	</ul>
{/if}

<svelte:window on:keydown={trashSelectedTasks} />

<style>
	div {
		text-align: center;
		height: calc(100vh - 182px);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	ion-icon {
		font-size: 100px;
		color: rgba(0, 0, 0, 0.1);
	}
	/* 
	p {
		text-align: center;
		color: #b0b4b7;
	} */
</style>
