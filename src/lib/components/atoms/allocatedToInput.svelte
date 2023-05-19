<script async script lang="ts">
	import { onMount } from 'svelte';

	import { trpc } from '$lib/trpc/client';
	import type { RouterOutputs } from '$lib/trpc/router';

	export let value: string | undefined = undefined;

	let list: RouterOutputs['contact']['getContacts'] = [];

	onMount(async () => {
		list = await trpc().contact.getContacts.query();
	});
</script>

<label
	><ion-icon name="person-add" />
	<input
		name="allocatedTo"
		bind:value
		list="names"
		autocomplete="off"
		placeholder="Allocated to"
		required
	/>
</label>

<datalist id="names">
	{#each list as opt}
		<option value={opt.name} />
	{/each}
</datalist>

<style>
	ion-icon {
		vertical-align: middle;
	}

	input {
		margin: 0.5rem 0 0.25rem 0;
	}
</style>
