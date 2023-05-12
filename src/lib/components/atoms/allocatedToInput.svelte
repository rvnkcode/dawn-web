<script async script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import type { RouterOutputs } from '../../trpc/router';

	export let value = '';

	let list: RouterOutputs['contact']['getContacts'] = [];

	onMount(async () => {
		list = await trpc().contact.getContacts.query();
	});
</script>

<label
	><span>Allocated to:</span>
	<input name="allocatedTo" bind:value list="names" autocomplete="off" />
</label>

<datalist id="names">
	{#each list as opt}
		<option value={opt.name} />
	{/each}
</datalist>

<style>
	input {
		margin: 0.5rem 0 0.25rem 0;
	}
</style>
