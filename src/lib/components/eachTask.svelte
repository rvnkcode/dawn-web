<script lang="ts">
	import type { Task } from '@prisma/client';

	export let task: Task;

	export let selected: Set<number>;

	const handleSelected = (id: number) => {
		selected.has(id) ? selected.delete(id) : selected.add(id);
		console.log(selected);
	};

	const toggleCompleted = async (id: number, checked: boolean) => {
		await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ id, checked })
		});
	};
</script>

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
