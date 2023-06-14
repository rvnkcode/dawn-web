<script lang="ts">
	import { createForm } from 'felte';
	import { getNotificationsContext } from 'svelte-notifications';

	import { zTaskCreateInput, type zTaskKeys } from '$lib/zod';
	import { errorNotificationOptions } from '../../const';

	const { form } = createForm();

	const { addNotification } = getNotificationsContext();
</script>

<form use:form method="post" action="/?/createTask">
	<div>
		<input type="text" name="title" placeholder="New To-Do" required />
		<button type="submit" class="general blue">Add</button>
	</div>
</form>

<style>
	div {
		display: flex;
	}

	div > input[type='text'] {
		border: none;
		border-bottom: 1px solid #e4e7ea;
		background-color: #f9fafb;
		width: 100%;
	}

	div > input[type='text']:focus {
		outline: 1px solid #469ffc;
	}
</style>
