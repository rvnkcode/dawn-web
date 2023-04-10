<script lang="ts">
	import type { Task } from '@prisma/client';
	import EditInput from './editInput.svelte';
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';
	import { isSelectModeOnMobile } from '$lib/stores';

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
	<label class={$isSelectModeOnMobile ? 'fullWidth' : ''} for={task.id.toString()}>
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
	<input
		type="checkbox"
		id={task.id.toString()}
		checked={!$isSelectModeOnMobile ? false : null}
		class={$isSelectModeOnMobile ? 'show' : 'hide'}
		on:change={() => {
			handleSelected(task.id);
			console.log($selected);
		}}
	/>
</li>

{#if showEdit}
	<EditInput {task} />
{/if}

<style>
	li {
		border-radius: 0.25rem;
		padding: 0.3rem 0;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	li:has(> input[type='checkbox']:checked) {
		background-color: #cae2ff;
	}

	label {
		display: flex;
		align-items: flex-start;
		/* Debug */
		/* border: 1px solid red; */
	}

	label > input[type='checkbox']:checked + div > button > span {
		font-style: italic;
		text-decoration: line-through;
		color: #b0b4b7;
	}

	button > span {
		font-size: 15px;
		word-break: break-word;
	}

	.title {
		text-align: start;
	}

	@media (min-width: 481px) {
		li > input[type='checkbox'] {
			display: none;
		}

		label {
			width: 100%;
		}

		label > div {
			display: flex;
			width: 100%;
			justify-content: space-between;
		}

		.trash {
			visibility: hidden;
		}

		li:hover > label > div > .trash {
			visibility: visible;
		}

		div > button > ion-icon {
			color: #404950;
			font-size: large;
		}

		button:hover {
			cursor: pointer;
		}
	}

	@media (max-width: 480px) {
		.trash {
			display: none;
		}

		.show {
			display: inherit;
		}

		.hide {
			display: none;
		}

		.fullWidth {
			width: 100%;
		}
	}
</style>
