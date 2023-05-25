<script lang="ts">
	export let value: Array<string>; // URL list
	$: urls = value.toString();

	const deleteUrl = (selectedUrl: string) => {
		value = value.filter((e: string) => e !== selectedUrl);
	};
</script>

<ul>
	{#each value as url}
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

<style>
	ul {
		margin-top: 0.5rem;
	}

	ion-icon {
		font-size: large;
		vertical-align: middle;
	}
</style>
