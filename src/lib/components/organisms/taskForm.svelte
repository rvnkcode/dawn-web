<script lang="ts">
	import { Button, TextArea, TextInput } from 'carbon-components-svelte';
	import { OverflowMenuVertical } from 'carbon-icons-svelte';

	import InputButtons from '../molecules/inputButtons.svelte';

	let showMoreInputs = false;
</script>

<div>
	<TextInput placeholder="New To-Do" size="sm" name="title" required autocomplete="off" />
	<Button
		size="small"
		icon={OverflowMenuVertical}
		iconDescription="More"
		on:click={() => (showMoreInputs = !showMoreInputs)}
	/>
</div>

{#if showMoreInputs}
	<TextArea placeholder="Notes" name="comments" />
	<InputButtons />
{/if}

<style>
	div {
		display: flex;
	}
</style>
