<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';

	export let value: boolean;

	const trashSelectedTasks = async () => {
		if ($selected.size < 1) {
			return;
		}

		try {
			await fetch('/api', {
				method: 'DELETE',
				body: JSON.stringify(Array.from($selected))
			});
			invalidateAll(); // refresh all loaded data from load function
		} catch (error) {
			console.error(error);
		}
	};
</script>

<footer>
	<!-- TODO: When press ESC key, hide input -->
	<!-- TODO: When click outside of input(out of focus), hide input -->
	<button
		on:click={() => {
			value = !value;
		}}><ion-icon name="add" /></button
	>
	<button
		on:click={async () => {
			await trashSelectedTasks();
		}}
		class="hide"><ion-icon name="trash-bin" /></button
	>
</footer>

<style>
	button {
		border: none;
		background: none;
		width: 100%;
		padding: 0.5rem 0;
	}

	@media (min-width: 481px) {
		footer {
			position: fixed;
			z-index: 1;
			bottom: 0;
			width: 100%;
			left: 0;
			background-color: white;
			display: flex;
			justify-content: space-evenly;
			/* Debug */
			/* border: 2px solid burlywood; */
		}

		footer > button:hover {
			cursor: pointer;
			border: 1px solid #eeeef0;
		}

		ion-icon {
			color: #404950;
			font-size: large;
		}
	}

	@media (max-width: 480px) {
		footer > button {
			background-color: #469ffc;
			width: 3rem;
			height: 3rem;
			border-radius: 100%;
			position: fixed;
			bottom: 0;
			right: 0;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
		}

		footer > button > ion-icon {
			color: white;
			font-size: xx-large;
		}

		.hide {
			display: none;
		}
	}
</style>
