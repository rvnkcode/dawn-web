<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	export let value: boolean;

	const emptyTrash = async () => {
		try {
			await fetch('/api/list', {
				method: 'DELETE'
			});
			invalidateAll();
		} catch (error) {
			console.error(error);
		}
	};

	const handleOk = async () => {
		value = false;
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

<style>
	header {
		font-weight: bold;
		margin-bottom: 1rem;
	}

	footer {
		margin-top: 1rem;
	}

	p {
		font-size: smaller;
	}
</style>
