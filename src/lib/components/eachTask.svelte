<script lang="ts">
	import type { Task } from '@prisma/client';
	import EditInput from './editInput.svelte';
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';
	import { isSelectModeOnMobile } from '$lib/stores';
	import { page } from '$app/stores';
	import { format } from 'date-fns';

	export let task: Task;

	$: current = $page.url.pathname;

	$: if ($isSelectModeOnMobile) {
		$selected.clear();
	}

	$: done = task.isDone;

	const handleSelected = (id: number) => {
		$selected.has(id) ? $selected.delete(id) : $selected.add(id);
		// Debug
		// console.log($selected);
	};

	const toggleCompleted = async (id: number, checked: boolean) => {
		await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ id, checked })
		});
		invalidateAll();
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

	const archiveTask = async (id: number) => {
		try {
			await fetch('/api/archive/item', {
				method: 'PATCH',
				body: JSON.stringify({ id })
			});
			invalidateAll();
		} catch (error) {
			console.error(error);
		}
	};

	let showEdit = false;
</script>

<!-- TODO: Add completed date on archive page -->
<li class={!$isSelectModeOnMobile ? 'uncheckedItem' : ''}>
	<label class={$isSelectModeOnMobile ? 'fullWidth' : ''} for={task.id.toString()}>
		<input
			type="checkbox"
			checked={task.isDone}
			on:change={async (e) => {
				await toggleCompleted(task.id, e.currentTarget.checked);
				done = !done;
			}}
		/>
		{#if current === '/archive' && task.completedAt != null}
			<span class="date">{format(task.completedAt, 'MMM d')}</span>
		{/if}
		<div class="titleDiv">
			<button on:click={() => (showEdit = !showEdit)} class="title"
				><span class="title">{task.title}</span></button
			>
			<div>
				{#if current != '/archive' && done}
					<button class="overlay" disabled={!done} on:click={async () => await archiveTask(task.id)}
						><ion-icon name="save" /></button
					>
				{/if}
				{#if current != '/trash'}
					<button on:click={async () => await deleteTask(task.id)} class="overlay"
						><ion-icon name="trash" /></button
					>
				{/if}
			</div>
		</div>
	</label>
	<input
		type="checkbox"
		id={task.id.toString()}
		checked={!$isSelectModeOnMobile ? false : null}
		class={$isSelectModeOnMobile ? 'show' : 'hide'}
		on:change={() => {
			handleSelected(task.id);
			// console.log($selected);
		}}
	/>
</li>

{#if showEdit}
	<EditInput {task} />
{/if}

<style>
	li {
		border-radius: 0.25rem;
		padding: 0.15rem 0;
		display: flex;
		justify-content: space-between;
	}

	li:has(> input[type='checkbox']:checked) {
		background-color: #cae2ff;
	}

	label {
		display: flex;
		align-items: center;
		/* Debug */
		/* border: 1px solid red; */
	}

	label > input[type='checkbox'] {
		min-width: 1rem;
	}

	span.date {
		color: #0061c2;
		font-size: 14px;
		max-width: max-content;
		width: 100%;
		margin-left: 0.5rem;
	}

	label > input[type='checkbox']:checked ~ div > button > span.title {
		font-style: italic;
		text-decoration: line-through;
		color: #b0b4b7;
	}

	button > span {
		font-size: 15px;
		word-break: break-all;
		/* border: 1px solid red; */
	}

	button.title {
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

		.overlay {
			visibility: hidden;
		}

		li:hover > label > div > div > .overlay {
			visibility: visible;
		}

		div > button > ion-icon {
			color: #404950;
			font-size: large;
		}
	}

	@media (max-width: 480px) {
		.overlay {
			display: none;
		}

		.show {
			display: inherit;
		}

		.hide {
			display: none;
			opacity: 0;
		}

		.fullWidth {
			width: 100%;
		}

		.uncheckedItem:has(> input[type='checkbox']:checked) {
			background: none;
		}
	}
</style>
