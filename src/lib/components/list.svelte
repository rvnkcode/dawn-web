<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Task } from '@prisma/client';
	import EachTask from './eachTask.svelte';

	export let tasks: Task[];

	let selected: Set<number> = new Set();

	const trashSelectedTasks = async (e: KeyboardEvent) => {
		if (selected.size < 1) {
			return;
		}
		if (e.key === 'Delete') {
			// Debug
			// console.log(e.key);
			try {
				await fetch('/api', {
					method: 'DELETE',
					body: JSON.stringify(Array.from(selected))
				});
				invalidateAll(); // refresh all load function(loaded data though load function?)
			} catch (error) {
				console.error(error);
			}
		} else return;
	};
</script>

{#if tasks.length < 1}
	<!-- TODO: update style: centering, gray out -->
	<p>Your Inbox is empty - time to celebrate!</p>
{:else}
	<ul>
		{#each tasks as task (task.id)}
			<EachTask {task} {selected} />
		{/each}
	</ul>
{/if}

<svelte:window on:keydown={trashSelectedTasks} />
