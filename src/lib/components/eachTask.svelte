<script lang="ts">
	import type { Task } from '@prisma/client';
	import EditInput from './editInput.svelte';

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

	let showEdit: boolean = false;
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
		/>
		<button on:click={() => (showEdit = !showEdit)}>{task.title}</button>
	</label>
</li>

{#if showEdit}
	<EditInput {task} />
{/if}

<style>
	li {
		border-radius: 0.25rem;
		/* TODO: Check each item's margin and padding */
		padding: 0.125rem 0;
		margin: 0.25rem 0;
	}

	li:has(> input[type='checkbox']:checked) {
		/* TODO: Change bg color */
		background-color: aqua;
	}

	label {
		width: 100%;
		display: flex;
	}

	li > input[type='checkbox'] {
		display: none;
	}

	button {
		background: none;
		border: none;
	}

	button:hover {
		cursor: pointer;
	}
</style>
