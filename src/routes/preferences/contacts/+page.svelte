<script lang="ts">
	import ContactList from '$lib/components/organisms/contactList.svelte';
	import type { PageServerData } from './$types';
	import { selectedContacts } from '$lib/stores';
	import { onMount } from 'svelte';
	import { trpc } from '$lib/trpc/client';
	import { invalidateAll } from '$app/navigation';

	export let data: PageServerData;

	let clientWidth: number;

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
	});
</script>

<main bind:clientWidth>
	<ContactList list={disabled} title={'Deactivated contacts'} />

	<div>
		<button
			class="general"
			on:click={async () => {
				await activateContacts($selectedContacts);
			}}
			><ion-icon
				name={clientWidth > 480 ? 'chevron-forward-outline' : 'chevron-up-outline'}
			/></button
		>
		<button
			class="general"
			on:click={async () => {
				await deactivateContacts($selectedContacts);
			}}
			><ion-icon
				name={clientWidth > 480 ? 'chevron-back-outline' : 'chevron-down-outline'}
			/></button
		>
	</div>

	<ContactList list={activated} title={'Activated contacts'} />
</main>

<style>
	main {
		display: flex;
	}

	main > div {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 480px) {
		main {
			flex-direction: column;
		}

		main > div {
			flex-direction: row;
			margin: 0 auto;
		}
	}
</style>
