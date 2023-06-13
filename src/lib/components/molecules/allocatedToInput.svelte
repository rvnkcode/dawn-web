<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	import { trpc } from '$lib/trpc/client';
	import type { RouterOutputs } from '$lib/trpc/router';

	let list: RouterOutputs['contact']['getContacts'] = [];

	onMount(async () => {
		list = await trpc().contact.getContacts.query();
	});
</script>

<TextInput
	size="sm"
	list="names"
	name="allocatedTo"
	autocomplete="off"
	placeholder="Allocated to"
/>

<datalist id="names">
	{#each list as opt}
		<option value={opt.name} />
	{/each}
</datalist>
