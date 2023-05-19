<script lang="ts">
	import { z } from 'zod';

	export let value: {
		urlList: Array<string>;
		showUrlInput: boolean;
	};

	let urlInput = '';

	const addUrl = (input: string) => {
		const urlSchema = z.string().url();

		if (urlSchema.parse(input) && value.urlList.indexOf(input) === -1) {
			value.urlList = [...value.urlList, input];
			urlInput = '';
			value.showUrlInput = false;
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
		width: calc(100% - 68px);
		margin-top: 0.5rem;
	}
</style>
