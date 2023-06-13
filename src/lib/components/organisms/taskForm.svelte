<script lang="ts">
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { Button, TextArea, TextInput, ToastNotification } from 'carbon-components-svelte';
	import { Add, OverflowMenuVertical } from 'carbon-icons-svelte';
	import { createForm } from 'felte';

	import { invalidateAll } from '$app/navigation';
	import { zTaskSchema, type zTaskKeys } from '$lib/zod';

	import InputButtons from '../molecules/inputButtons.svelte';
	import type { Task } from '@prisma/client';

	export let task: Task | undefined = undefined;

	let showMoreInputs = false;
	const formList: zTaskKeys[] = ['title', 'comments', 'startedAt', 'url', 'allocatedTo'];

	const { form, reset } = createForm({
		extend: [validator({ schema: zTaskSchema }), reporter],
		onSuccess() {
			invalidateAll();
			reset();
		}
	});
</script>

<form use:form method="post" action={task ? '/?/updateTask' : '/?/createTask'}>
	<div>
		<TextInput placeholder="New To-Do" size="sm" name="title" autocomplete="off" />
		<Button
			size="small"
			icon={OverflowMenuVertical}
			iconDescription="More"
			kind="tertiary"
			on:click={() => (showMoreInputs = !showMoreInputs)}
		/>
		<Button size="small" icon={Add} iconDescription="Add new To-DO" type="submit" />
	</div>

	{#each formList as formName}
		<ValidationMessage for={formName} let:messages={message}>
			{#if message && message?.length > 0}
				<ToastNotification
					title="error"
					subtitle={message.toString()}
					lowContrast
					class="notification"
				/>
			{/if}
		</ValidationMessage>
	{/each}

	{#if showMoreInputs}
		<TextArea placeholder="Notes" name="comments" />
		<InputButtons />
	{/if}
</form>

<style>
	div {
		display: flex;
	}

	:global(.notification) {
		position: absolute;
		top: 0;
		right: 1rem;
		z-index: 3;
	}
</style>
