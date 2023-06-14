<script lang="ts">
	import { clientWidth } from '$lib/stores';
	import TaskForm from './taskForm.svelte';
</script>

<header>
	<h1>
		<slot />
	</h1>

	<!-- TODO: Add today's date? -->

	{#if $clientWidth > 481}
		<TaskForm />
	{/if}
</header>

<style>
	header {
		background-color: white;
		padding-top: 3rem;
		padding-bottom: 0.5rem;
		position: sticky;
		top: 0;
		z-index: 1;
		/* Debug */
		/* border: 2px solid violet; */
	}

	header > h1 {
		font-size: x-large;
		font-weight: bold;
		margin-bottom: 1rem;
	}
</style>
