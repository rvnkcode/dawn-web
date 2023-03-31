<script lang="ts">
	import type { Task } from '@prisma/client';

	const toggleCompleted = async (id: number, checked: boolean) => {
		await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ id, checked })
		});
	};

	export let tasks: Task[];
</script>

{#if tasks.length < 1}
	<p>Your Inbox is empty - time to celebrate!</p>
{:else}
	<ul>
		{#each tasks as task (task.id)}
			<li>
				<input type="checkbox" id={task.id.toString()} />
				<label for={task.id.toString()}>
					<input
						type="checkbox"
						checked={task.isDone}
						on:change={async (e) => {
							await toggleCompleted(task.id, e.currentTarget.checked);
						}}
					/>{task.id}:
					<button>{task.title}</button>({task.createdAt}){task.trash}
				</label>
			</li>
		{/each}
	</ul>
{/if}
