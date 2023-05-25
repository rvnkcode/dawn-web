<script lang="ts">
	import type { Contact } from '@prisma/client';
	import { onMount } from 'svelte';

	import { invalidateAll } from '$app/navigation';
	import { selectedContacts } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	import DeleteContactConfirmModal from '../templates/deleteContactConfirmModal.svelte';

	export let contact: Contact;
	export let value: boolean;

	let name = '';

	let editMode = false;
	let openModal = false;

	$: checked = $selectedContacts.has(contact.id);

	const handleSelected = (id: number) => {
		$selectedContacts.has(id) ? $selectedContacts.delete(id) : $selectedContacts.add(id);
		console.log($selectedContacts);

		if ($selectedContacts.size < 1) {
			value = false;
		}

		invalidateAll();
	};

	const updateContact = async (id: number, name: string) => {
		if (name.length < 1) return;
		await trpc().contact.updateContactName.mutate({ id, name });
		invalidateAll();
		$selectedContacts.clear();
		editMode = false;
	};

	onMount(() => {
		name = contact.name;
	});
</script>

<li>
	<input
		type="checkbox"
		bind:checked
		on:change={() => {
			handleSelected(contact.id);
		}}
		id={contact.id.toString()}
	/>
	{#if !editMode}
		<label for={contact.id.toString()}>
			<span>{contact.name}</span>
		</label>
		<button
			type="button"
			on:click={() => {
				editMode = true;
			}}><ion-icon name="ellipsis-horizontal-circle" /></button
		>
		<button
			type="button"
			on:click={() => {
				openModal = true;
			}}><ion-icon name="trash" /></button
		>
	{:else}
		<input type="text" bind:value={name} />
		<button
			type="button"
			on:click={() => {
				editMode = false;
			}}><ion-icon name="close-circle" class="cancel" /></button
		>
		<button
			type="button"
			on:click={async () => {
				await updateContact(contact.id, name);
			}}><ion-icon name="checkbox" class="confirm" /></button
		>
	{/if}
</li>

<DeleteContactConfirmModal bind:value={openModal} id={contact.id} />

<style>
	li {
		padding: 0 0.25rem;
	}

	ion-icon {
		font-size: large;
		vertical-align: bottom;
	}

	ion-icon.cancel {
		color: gray;
	}

	ion-icon.confirm {
		color: green;
	}
</style>
