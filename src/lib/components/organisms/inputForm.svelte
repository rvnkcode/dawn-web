<script lang="ts">
	import { z } from 'zod';
	import type { Task } from '@prisma/client';
	import { enhance } from '$app/forms';
	import TaskTitleInput from '../atoms/taskTitleInput.svelte';
	import CommentsInput from '../atoms/commentsInput.svelte';

	export let task: Task | undefined = undefined;

	let showUrlInput = false;

	let urlList: Array<string> = [];
	if (task && task.urls) {
		urlList = task.urls.split(',');
	}

	$: urls = urlList.toString();

	let urlInput: string = '';

	const urlSchema = z.string().url();

	const addUrl = (value: string) => {
		if (urlSchema.parse(value) && urlList.indexOf(value) === -1) {
			urlList = [...urlList, value];
			urlInput = '';
			showUrlInput = false;
		}
	};

	const deleteUrl = (value: string) => {
		urlList = urlList.filter((e: string) => e !== value);
	};

	export let value: boolean; //showEdit

	const afterSubmit = () => {
		value = false;
	};
</script>

<form action={task ? '/?/updateTask' : '/?/createTask'} method="post" use:enhance={afterSubmit}>
	{#if task}
		<input type="hidden" value={task.id} name="id" />
		<TaskTitleInput value={task.title} />
		<CommentsInput value={task.comments ? task.comments : undefined} />
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<TaskTitleInput />
		<CommentsInput />
	{/if}

	{#if urlList.length > 0}
		<ul>
			{#each urlList as url}
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

	{#if showUrlInput}
		<ion-icon name="link-outline" />
		<input type="url" required bind:value={urlInput} placeholder="http://example.com" name="url" />
		<button
			type="button"
			on:click={() => {
				addUrl(urlInput);
			}}><ion-icon name="add-circle-outline" /></button
		>
	{/if}

	<div>
		<button type="button" on:click={() => (showUrlInput = !showUrlInput)}
			><ion-icon name="link-outline" class="button" /></button
		>
	</div>

	{#if urls.length > 0 || showUrlInput}
		<div>
			<button type="submit" class="blue general">submit</button>
		</div>
	{/if}
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

	ion-icon.button {
		color: #a9aeb2;
	}

	input[type='url'] {
		width: calc(100% - 68px);
		margin-top: 0.5rem;
	}

	a {
		font-size: 14px;
	}

	button[type='submit'] {
		text-align: right;
	}
</style>