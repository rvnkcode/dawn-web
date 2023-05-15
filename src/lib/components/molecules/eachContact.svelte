<script lang="ts">
	import type { Contact } from '@prisma/client';
	import { selectedContacts } from '$lib/stores';

	export let contact: Contact;

	const handleSelected = (id: number) => {
		$selectedContacts.has(id) ? $selectedContacts.delete(id) : $selectedContacts.add(id);
		console.log($selectedContacts);
	};
</script>

<li>
	<label
		><input
			type="checkbox"
			checked={$selectedContacts.has(contact.id)}
			on:change={() => {
				handleSelected(contact.id);
			}}
		/>{contact.name}<button>edit</button></label
	>
</li>

<style>
	li {
		padding: 0 0.25rem;
	}
</style>
