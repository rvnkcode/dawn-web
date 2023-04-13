<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';

	const trashSelectedTasks = async () => {
		if ($selected.size < 1) {
			return;
		}

		try {
			await fetch('/api', {
				method: 'DELETE',
				body: JSON.stringify(Array.from($selected))
			});
			$selected.clear();
			invalidateAll(); // refresh all loaded data from load function
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div>
	<button
		on:click={async () => {
			await trashSelectedTasks();
		}}><ion-icon name="trash" /></button
	>
</div>

<style>
	div {
		background-color: #292c37;
		border-radius: 0.25rem;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto 1rem auto;
		width: 50%;
		padding: 0.25rem;
		display: flex;
		justify-content: center;
	}

	ion-icon {
		color: #d1d4da;
		font-size: large;
	}

	@media (min-width: 481px) {
		div {
			display: none;
		}
	}
</style>
