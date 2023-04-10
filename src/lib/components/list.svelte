<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Task } from '@prisma/client';
	import EachTask from './eachTask.svelte';
	import { selected } from '$lib/stores';

	export let tasks: Task[];
	export let showNewInput: boolean;

	const trashSelectedTasks = async (e: KeyboardEvent) => {
		if ($selected.size < 1) {
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
				invalidateAll(); // refresh all load function(loaded data though load function?)
			} catch (error) {
				console.error(error);
			}
		} else return;
	};
</script>

{#if tasks.length < 1}
	{#if !showNewInput}
		<p>Your Inbox is empty - time to celebrate!</p>
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

	@media (max-width: 480px) {
		ul {
			margin-bottom: 3rem;
		}
	}
</style>
