<script lang="ts">
	import type { Contact } from '@prisma/client';
	import EachContact from '../molecules/eachContact.svelte';

	export let list: Contact[];
</script>

<ul>
	<header><label><input type="checkbox" /><span>Select all</span></label></header>
	<hr />
	{#each list as contact}
		<EachContact {contact} />
	{/each}
</ul>

<style>
	ul {
		border: 1px solid gray;
		border-radius: 0.25rem;
	}

	ul > header {
		padding: 0 0.25rem;
	}
</style>
