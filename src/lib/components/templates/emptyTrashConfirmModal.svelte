<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { trpc } from '$lib/trpc/client';

	export let value: boolean; // Is modal opened?

	const emptyTrash = async () => {
		await trpc().trash.emptyTrash.mutate();
		invalidateAll();
	};

	const handleOk = async () => {
		value = false; // close modal
		await emptyTrash();
	};
</script>

{#if value}
	<div class="backdrop" />
{/if}

<dialog open={value}>
	<header>Empty Trash</header>
	<p>Are you sure you want to remove the<br /> items in the Trash permanently?</p>
	<footer>
		<button on:click={() => (value = false)} class="general cancel">Cancel</button>
		<button on:click={async () => await handleOk()} class="general blue">Empty Trash</button>
	</footer>
</dialog>
