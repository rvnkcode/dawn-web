<script lang="ts">
	import { z } from 'zod';

	let showUrlInput = false;
	let urlList: Array<string> = [];
	let urlInput: string = '';
	$: urls = urlList.toString();

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
</script>

<form action="?/createTask" method="post">
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		name="title"
		required
		placeholder="New To-Do"
		autocomplete="off"
		autofocus
		class="inputTitle"
	/>

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
		<button type="submit" class="blue general">submit</button>
	{/if}
</form>

<style>
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
		color: #d6d5d8;
	}

	input[type='url'] {
		width: calc(100% - 68px);
		margin-top: 0.5rem;
	}

	a {
		font-size: 14px;
	}
</style>
