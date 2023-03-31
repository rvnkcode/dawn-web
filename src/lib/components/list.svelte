<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Task } from '@prisma/client';

	export let tasks: Task[];

	const toggleCompleted = async (id: number, checked: boolean) => {
		await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ id, checked })
		});
	};

	export let selected: Set<number> = new Set();

	const handleSelected = (id: number) => {
		selected.has(id) ? selected.delete(id) : selected.add(id);
		console.log(selected);
	};

	const trashSelectedTasks = async (e: KeyboardEvent) => {
		if (selected.size < 1) {
			return;
		}
		if (e.key === 'Delete') {
			console.log(e.key);
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
	<p>Your Inbox is empty - time to celebrate!</p>
{:else}
	<ul>
		{#each tasks as task (task.id)}
			<li>
				<input
					type="checkbox"
					id={task.id.toString()}
					checked={selected.has(task.id)}
					on:change={() => {
						handleSelected(task.id);
					}}
				/>
				<label for={task.id.toString()}>
					<input
						type="checkbox"
						checked={task.isDone}
						on:change={async (e) => {
							await toggleCompleted(task.id, e.currentTarget.checked);
						}}
					/>{task.id}:
					<button>{task.title}</button>({task.createdAt})
				</label>
			</li>
		{/each}
	</ul>
{/if}

<svelte:window on:keydown={trashSelectedTasks} />
