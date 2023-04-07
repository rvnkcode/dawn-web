<script lang="ts">
	import type { Task } from '@prisma/client';
	import EditInput from './editInput.svelte';
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';

	export let task: Task;

	const handleSelected = (id: number) => {
		$selected.has(id) ? $selected.delete(id) : $selected.add(id);
		// Debug
		// console.log(selected);
	};

	const toggleCompleted = async (id: number, checked: boolean) => {
		await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ id, checked })
		});
	};

	const deleteTask = async (id: number) => {
		try {
			await fetch('/api/item', {
				method: 'DELETE',
				body: JSON.stringify({ id })
			});
			invalidateAll(); // refresh all load function(loaded data though load function?)
		} catch (error) {
			console.error(error);
		}
	};

	let showEdit = false;
</script>

<li>
	<input
		type="checkbox"
		id={task.id.toString()}
		checked={$selected.has(task.id)}
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
		<div>
			<button on:click={() => (showEdit = !showEdit)} class="title"
				><span>{task.title}</span></button
			>
			<button on:click={async () => await deleteTask(task.id)} class="trash"
				><ion-icon name="trash" /></button
			>
		</div>
	</label>
</li>

{#if showEdit}
	<EditInput {task} />
{/if}

<style>
	li {
		border-radius: 0.25rem;
		padding: 0.3rem 0;
	}

	li > input[type='checkbox'] {
		display: none;
	}

	label {
		display: flex;
		/* Debug */
		/* border: 2px solid red; */
	}

	label > input[type='checkbox']:checked + div > button > span {
		font-style: italic;
		text-decoration: line-through;
		color: #b0b4b7;
	}

	button {
		background: none;
		border: none;
	}

	button > span {
		font-size: 15px;
	}

	.trash {
		display: none;
	}

	@media (min-width: 481px) {
		label > div {
			display: flex;
			width: 100%;
			justify-content: space-between;
		}

		li:has(> input[type='checkbox']:checked) {
			background-color: #cae2ff;
		}

		li:hover > label > div > .trash {
			display: unset;
		}

		div > button > ion-icon {
			color: #404950;
		}

		button:hover {
			cursor: pointer;
		}
	}
</style>
