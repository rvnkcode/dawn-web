<script lang="ts">
	import type { Contact } from '@prisma/client';
	import EachContact from '../molecules/eachContact.svelte';
	import { selectedContacts } from '$lib/stores';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let list: Contact[];
	export let title: string;

	$: checked = false;

	const handleSelectAll = () => {
		console.log(checked);

		if (checked && list.length > 0) {
			list.forEach((c: Contact) => $selectedContacts.add(c.id));
			console.log($selectedContacts);
		} else {
			$selectedContacts.clear();
		}

		invalidateAll();
	};
</script>

<ul>
	<header>
		<label
			><div>
				<input type="checkbox" bind:checked on:change={() => handleSelectAll()} /><span
					>Select all</span
				>
			</div>
			<span>{title}</span></label
		>
	</header>
	<hr />
	{#each list as contact}
		<EachContact {contact} bind:value={checked} />
	{/each}
</ul>

<style>
	ul {
		border: 1px solid gray;
		border-radius: 0.25rem;
		width: 100%;
	}

	ul > header {
		padding: 0 0.25rem;
	}

	ul > header > label {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
</style>
