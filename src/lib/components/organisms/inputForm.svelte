<!-- TODO: Parse markdown? -->
<script lang="ts">
	import { z } from 'zod';
	import type { Task } from '@prisma/client';
	import { enhance } from '$app/forms';
	import TaskTitleInput from '../atoms/taskTitleInput.svelte';
	import CommentsInput from '../atoms/commentsInput.svelte';
	import { page } from '$app/stores';
	import CompletedAtInput from '../atoms/completedAtInput.svelte';
	import AllocatedToInput from '../atoms/allocatedToInput.svelte';
	import InputButtons from '../molecules/inputButtons.svelte';
	import UrlInput from '../molecules/urlInput.svelte';

	export let task: Task | undefined = undefined;

	$: current = $page.url.pathname;

	interface Props {
		showUrlInput: boolean;
		showAllocatedTo: boolean;
		urlList: Array<string>;
	}

	let props: Props = {
		showUrlInput: false,
		showAllocatedTo: false,
		urlList: []
	};

	if (task && task.urls) {
		props.urlList = task.urls.split(',');
	}

	$: urls = props.urlList.toString();

	// let urlInput = '';

	const deleteUrl = (value: string) => {
		props.urlList = props.urlList.filter((e: string) => e !== value);
	};

	export let value: boolean; //showEdit

	const afterSubmit = () => {
		value = false; // showEdit
	};
</script>

<form action={task ? '/?/updateTask' : '/?/createTask'} method="post" use:enhance={afterSubmit}>
	{#if task}
		<input type="hidden" value={task.id} name="id" />
		<TaskTitleInput value={task.title} />
		{#if current === '/archive'}
			<CompletedAtInput date={task.completedAt} />
		{/if}
		{#if props.showAllocatedTo || task.allocatedTo}
			<AllocatedToInput value={task.allocatedTo ? task.allocatedTo : undefined} />
		{/if}
		<CommentsInput value={task.comments ? task.comments : undefined} />
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<TaskTitleInput />
		{#if props.showAllocatedTo}
			<AllocatedToInput />
		{/if}
		<CommentsInput />
	{/if}

	{#if props.urlList.length > 0}
		<ul>
			{#each props.urlList as url}
				<li>
					<ion-icon name="link-outline" />
					<a href={url} target="_blank">{url}</a>
					<button type="button" on:click={() => deleteUrl(url)}
						><ion-icon name="remove-circle-outline" /></button
					>
				</li>
			{/each}
		</ul>
		<input type="hidden" bind:value={urls} name="rawUrls" />
	{/if}

	{#if props.showUrlInput}
		<UrlInput bind:value={props} />
	{/if}

	<InputButtons bind:value={props} />

	<div>
		<button type="submit" class="blue general">Add</button>
	</div>
</form>

<style>
	form {
		margin-left: 1.25rem;
	}

	ul {
		margin-top: 0.5rem;
	}

	div {
		margin-top: 0.5rem;
		text-align: right;
	}

	ion-icon {
		font-size: large;
		vertical-align: middle;
	}

	button[type='submit'] {
		text-align: right;
	}
</style>
