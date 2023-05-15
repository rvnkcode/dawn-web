<script lang="ts">
	import type { Contact } from '@prisma/client';
	import { selectedContacts } from '$lib/stores';
	import { onMount } from 'svelte';
	import { trpc } from '../../trpc/client';
	import { invalidateAll } from '$app/navigation';

	export let contact: Contact;

	let value = '';

	let editMode = false;

	const handleSelected = (id: number) => {
		$selectedContacts.has(id) ? $selectedContacts.delete(id) : $selectedContacts.add(id);
		console.log($selectedContacts);
	};

	const updateContact = async (id: number, name: string) => {
		if (value.length < 1) return;
		await trpc().contact.updateContactName.mutate({ id, name });
		invalidateAll();
		editMode = false;
	};

	onMount(() => {
		value = contact.name;
	});
</script>

<li>
	<input
		type="checkbox"
		checked={$selectedContacts.has(contact.id)}
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
	{:else}
		<input type="text" bind:value />
		<button
			on:click={() => {
				editMode = false;
			}}><ion-icon name="close-circle" class="cancel" /></button
		>
		<button
			on:click={async () => {
				await updateContact(contact.id, value);
			}}><ion-icon name="checkbox" class="confirm" /></button
		>
	{/if}
</li>

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
