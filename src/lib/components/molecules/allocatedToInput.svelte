<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';

	import { trpc } from '$lib/trpc/client';
	import type { RouterOutputs } from '$lib/trpc/router';
	import { onMount } from 'svelte';

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

<!--
 <script async script lang="ts">
	import { page } from '$app/stores';

	export let value: string | undefined = undefined;

	$: current = $page.url.pathname;

</script>

<label
	>
	<input
		name="allocatedTo"
		bind:value
		list="names"
		autocomplete="off"
		placeholder="Allocated to"
		required={value == undefined && current === '/waiting_for' ? true : false}
	/>
</label>
-->
