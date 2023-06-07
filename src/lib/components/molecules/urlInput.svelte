<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import { z, type ZodIssue } from 'zod';

	import { notificationOptions } from '$lib/const';

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
					...notificationOptions
				});
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				const message = error.issues.map((err: ZodIssue) => err.message);

				addNotification({
					text: message,
					...notificationOptions
				});
			}
		}
	};
</script>

<ion-icon name="link-outline" />
<input type="url" required bind:value={urlInput} placeholder="http://example.com" name="url" />
<button
	type="button"
	on:click={() => {
		addUrl(urlInput);
	}}><ion-icon name="add-circle-outline" /></button
>

<style>
	input[type='url'] {
		width: calc(100% - 52px);
		margin-top: 0.5rem;
	}

	ion-icon {
		font-size: large;
		vertical-align: middle;
	}
</style>
