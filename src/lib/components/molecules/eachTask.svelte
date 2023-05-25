<script lang="ts">
	import type { Task } from '@prisma/client';
	import { format } from 'date-fns';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { tooltip } from '$lib/actions/tooltip';
	import { isSelectModeOnMobile, selected } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	import InputForm from '../organisms/inputForm.svelte';
	import HoverButtonsOnList from './hoverButtonsOnList.svelte';

	export let task: Task;

	$: current = $page.url.pathname;

	$: if ($isSelectModeOnMobile) {
		$selected.clear();
	}

	let urls: Array<string> = [];
	$: if (task.urls) {
		urls = task.urls?.split(',');
	}

	const handleSelected = (id: number) => {
		$selected.has(id) ? $selected.delete(id) : $selected.add(id);
		// Debug
		// console.log($selected);
	};

	const toggleCompleted = async (
		id: number,
		checked: boolean,
		archive: boolean,
		startedAt?: Date
	) => {
		await trpc().task.toggleCompleted.mutate({ id, checked, isArchived: archive, startedAt });
		invalidateAll();
	};

	let showEdit = false;

	const handleKeyboard = async (e: KeyboardEvent) => {
		// console.log(e.key)

		switch (e.key) {
			case 'Escape':
				showEdit = false;
				break;

			default:
				break;
		}
	};
</script>

<li class={!$isSelectModeOnMobile ? 'uncheckedItem' : ''}>
	<label class={$isSelectModeOnMobile ? 'fullWidth' : ''} for={task.id.toString()}>
		<input
			type="checkbox"
			checked={task.isDone}
			on:change={async (e) => {
				await toggleCompleted(
					task.id,
					e.currentTarget.checked,
					task.archive,
					task.startedAt ?? undefined
				);
			}}
		/>
		{#if current === '/archive' && task.completedAt != null}
			<span class="date">{format(task.completedAt, 'MMM d')}</span>
		{/if}
		{#if current === '/waiting_for' && task.allocatedTo}
			<span class="date">{task.allocatedTo}</span>
		{/if}
		<div>
			<div class="titleDiv">
				<button on:click={() => (showEdit = !showEdit)} class="title"
					><span class="title {current === '/archive' ? 'noLineThrough' : ''}">{task.title}</span
					></button
				>
				{#if task.comments}
					<!-- Recreate tooltip when comment(task) has updated -->
					{#key task.comments}
						<ion-icon name="document-outline" use:tooltip={task.comments} />
					{/key}
				{/if}
				{#each urls as url}
					<a href={url} target="_blank">
						<ion-icon name="link-outline" use:tooltip={url} />
					</a>
				{/each}
			</div>
			<HoverButtonsOnList id={task.id} done={task.isDone} />
		</div>
	</label>

	<!-- Checkbox for select tasks -->
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
	<InputForm bind:value={showEdit} {task} />
{/if}

<svelte:window on:keydown={handleKeyboard} />

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
		max-width: max-content;
		width: 100%;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	label > input[type='checkbox']:checked ~ div > div > button > span.title {
		font-style: italic;
		text-decoration: line-through;
		color: #b0b4b7;
	}

	span.noLineThrough {
		font-style: normal !important;
		text-decoration: none !important;
		color: #000000 !important;
	}

	button > span {
		font-size: 15px;
		word-break: break-all;
		/* border: 1px solid red; */
	}

	button.title {
		text-align: start;
	}

	ion-icon {
		font-size: smaller;
		vertical-align: middle;
		color: gray;
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

		:global(li:hover > label > div > div > .overlay) {
			visibility: visible !important;
		}
	}

	@media (max-width: 480px) {
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
