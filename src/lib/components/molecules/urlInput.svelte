<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';
</script>

<TextInput size="sm" name="url" placeholder="https://www.example.com" />

<!-- <script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import { z, type ZodIssue } from 'zod';

	import { errorNotificationOptions } from '$lib/const';

	export let value: {
		urlList: Array<string>;
		showUrlInput: boolean;
	};

	const { addNotification } = getNotificationsContext();

	let urlInput = '';

	const addUrl = (input: string) => {
		const urlSchema = z.string().url();

		try {
			urlSchema.parse(input);

			if (value.urlList.indexOf(input) === -1) {
				value.urlList = [...value.urlList, input];
				urlInput = '';
				value.showUrlInput = false;
			} else {
				addNotification({
					text: 'URL already exists',
					...errorNotificationOptions
				});
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				const message = error.issues.map((err: ZodIssue) => err.message);

				addNotification({
					text: message,
					...errorNotificationOptions
				});
			}
		}
	};
</script>

<input type="url" required bind:value={urlInput} placeholder="http://example.com" name="url" />
<button
	type="button"
	on:click={() => {
		addUrl(urlInput);
	}}><ion-icon name="add-circle-outline" /></button
>
-->
