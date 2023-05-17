<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { trpc } from '$lib/trpc/client';

	export let value: boolean; // Is modal opened?
	export let id: number;

	const deleteContact = async (id: number) => {
		await trpc().contact.deleteContact.mutate(id);
		invalidateAll();
	};
</script>

{#if value}
	<div class="backdrop" />
{/if}

<dialog open={value}>
	<header>Delete Contact</header>
	<p>
		Are you sure you want to remove the<br /> item in the Contact permanently?<br />
		It is also deleted from allocated tasks
	</p>
	<footer>
		<button
			on:click={() => {
				value = false;
			}}
			class="general cancel">Cancel</button
		>
		<button
			on:click={async () => {
				await deleteContact(id);
			}}
			class="general blue">Delete</button
		>
	</footer>
</dialog>
