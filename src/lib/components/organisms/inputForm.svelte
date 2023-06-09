<!-- TODO: Parse markdown? -->
<script lang="ts">
	import type { Task } from '@prisma/client';
	import type { ActionResult } from '@sveltejs/kit';
	import { getNotificationsContext } from 'svelte-notifications';
	import type { ZodIssue } from 'zod';

	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { errorNotificationOptions } from '$lib/const';

	import CommentsInput from '../atoms/commentsInput.svelte';
	import TaskTitleInput from '../atoms/taskTitleInput.svelte';
	import AllocatedToInput from '../molecules/allocatedToInput.svelte';
	import DateInput from '../molecules/dateInput.svelte';
	import InputButtons from '../molecules/inputButtons.svelte';
	import UrlInput from '../molecules/urlInput.svelte';
	import UrlList from './urlList.svelte';

	export let task: Task | undefined = undefined;

	const { addNotification } = getNotificationsContext();

	$: current = $page.url.pathname;

	interface Props {
		showUrlInput: boolean;
		showAllocatedTo: boolean;
		urlList: Array<string>;
		showStartedAt: boolean;
	}

	let props: Props = {
		showUrlInput: false,
		showAllocatedTo: false,
		urlList: [],
		showStartedAt: false
	};

	if (task && task.urls) {
		props.urlList = task.urls.split(',');
	}

	export let value: boolean; //showEdit

	const afterSubmit = () => {
		value = false; // showEdit

		return async ({ result }: { result: ActionResult }) => {
			// https://zod.dev/ERROR_HANDLING?id=zodissue
			if (result.type === 'failure') {
				const errorData = result.data?.error;
				if (result.status === 400 && errorData) {
					const path = errorData.map((error: ZodIssue) => error.path);
					const message = errorData.map((error: ZodIssue) => error.message);

					addNotification({
						text: `${path}: ${message}`,
						...errorNotificationOptions
					});
				} else {
					addNotification({
						text: 'Error',
						...errorNotificationOptions
					});
				}
			}

			await invalidateAll();
		};
	};
</script>

<form action={task ? '/?/updateTask' : '/?/createTask'} method="post" use:enhance={afterSubmit}>
	<!-- Hidden values -->
	{#if task}
		<input type="hidden" value={task.id} name="id" />
	{:else}
		{#if current === '/someday'}
			<input type="hidden" value="someday" name="status" />
		{/if}
		{#if current === '/anytime'}
			<input type="hidden" value="anytime" name="status" />
		{/if}
	{/if}

	<TaskTitleInput value={task?.title} />
	{#if props.showStartedAt || task?.startedAt || current === '/today' || current === '/upcoming'}
		<!-- <DateInput date={task?.startedAt} attributeType="started" /> -->
	{/if}
	{#if current === '/archive' && task?.isDone}
		<!-- <DateInput date={task.completedAt} attributeType="completed" /> -->
	{/if}
	{#if props.showAllocatedTo || task?.allocatedTo || current === '/waiting_for'}
		<!-- <AllocatedToInput value={task?.allocatedTo ?? undefined} /> -->
	{/if}
	<CommentsInput value={task?.comments ?? undefined} />

	{#if props.urlList.length > 0}
		<UrlList bind:value={props.urlList} />
	{/if}

	<!-- 
	{#if props.showUrlInput}
		<UrlInput bind:value={props} />
	{/if} -->

	<!-- <InputButtons /> -->

	<div>
		<button type="submit" class="blue general">{task ? 'Update' : 'Add'}</button>
	</div>
</form>

<style>
	form {
		margin-left: 1.25rem;
	}

	div {
		margin-top: 0.5rem;
		text-align: right;
	}

	button[type='submit'] {
		text-align: right;
		margin-bottom: 1rem;
	}
</style>
