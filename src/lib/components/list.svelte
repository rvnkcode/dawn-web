<script lang="ts">
	import type { Task } from '@prisma/client';

	export let tasks: Task[];
</script>

<ul>
	{#each tasks as task (task.id)}
		<li>
			<input type="checkbox" id={task.id.toString()} />
			<label for={task.id.toString()}>
				<input type="checkbox" checked={task.isDone} />{task.id}:
				<button>{task.title}</button>({task.createdAt})
			</label>
		</li>
	{/each}
</ul>
