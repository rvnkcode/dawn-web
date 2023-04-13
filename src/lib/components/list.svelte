<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Task } from '@prisma/client';
	import EachTask from './eachTask.svelte';
	import { selected } from '$lib/stores';
	import { onMount } from 'svelte';

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
			try {
				await fetch('/api', {
					method: 'DELETE',
					body: JSON.stringify(Array.from($selected))
				});
				$selected.clear();
				invalidateAll(); // refresh all load function(loaded data though load function?)
			} catch (error) {
				console.error(error);
			}
		} else return;
	};

	onMount(() => {
		$selected.clear();
	});
</script>

{#if tasks.length < 1}
	{#if !showNewInput}
		<p>Your list is empty - time to celebrate!</p>
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
	p {
		text-align: center;
		color: #b0b4b7;
	}
</style>
