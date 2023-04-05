<script lang="ts">
	export let value: boolean;
</script>

<footer>
	<!-- TODO: When press ESC key, hide input -->
	<!-- TODO: When click outside of input(out of focus), hide input -->
	<button
		on:click={() => {
			value = !value;
		}}><ion-icon name="add" /></button
	>
</footer>

<style>
	footer {
		position: fixed;
		z-index: 1;
		bottom: 0;
		width: 100%;
	}

	footer > button {
		border: none;
		background: none;
		width: 100%;
		padding: 0.5rem 0;
	}

	@media (min-width: 481px) {
		footer {
			left: 0;
			background-color: white;
			display: flex;
			justify-content: space-evenly;
			/* Debug */
			/* border: 2px solid burlywood; */
		}

		footer > button:hover {
			cursor: pointer;
			/* TODO: Change color */
			border: 1px solid gray;
			background-color: lightgray;
		}
	}

	@media (max-width: 480px) {
		footer {
			/* TODO: Change color */
			background-color: blue;
			width: 3rem;
			height: 3rem;
			border-radius: 100%;
			right: 0;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
		}

		footer > button > ion-icon {
			color: white;
			font-size: xx-large;
		}
	}
</style>
