<script lang="ts">
	import ContactList from '$lib/components/organisms/contactList.svelte';
	import type { PageServerData } from './$types';
	import { selectedContacts } from '$lib/stores';
	import { onMount } from 'svelte';
	import { trpc } from '$lib/trpc/client';
	import { invalidateAll } from '$app/navigation';

	export let data: PageServerData;

	$: ({ disabled, activated } = data);

	const deactivateContacts = async (ids: Set<number>) => {
		if (ids.size < 1) return;

		await trpc().contact.deactivateSelectedContacts.mutate(Array.from(ids));
		$selectedContacts.clear();
		invalidateAll();
	};

	const activateContacts = async (ids: Set<number>) => {
		if (ids.size < 1) return;

		await trpc().contact.activateSelectedContacts.mutate(Array.from(ids));
		$selectedContacts.clear();
		invalidateAll();
	};

	onMount(() => {
		$selectedContacts.clear();
		// console.log($selectedContacts);
	});
</script>

<main>
	<ContactList list={disabled} />

	<div>
		<button
			class="general"
			on:click={async () => {
				await activateContacts($selectedContacts);
			}}><ion-icon name="chevron-forward-outline" /></button
		>
		<button
			class="general"
			on:click={async () => {
				await deactivateContacts($selectedContacts);
			}}><ion-icon name="chevron-back-outline" /></button
		>
	</div>

	<ContactList list={activated} />
</main>

<style>
	main {
		display: flex;
	}

	main > div {
		display: flex;
		flex-direction: column;
	}
</style>
