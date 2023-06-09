<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { CalendarAdd, Link, UserFollow } from 'carbon-icons-svelte';

	import StartedAt from './startedAt.svelte';
	import UrlInput from './urlInput.svelte';
	import AllocatedToInput from './allocatedToInput.svelte';

	let showStartedAt = false;
	let showUrlInput = false;
	let showAllocatedTo = false;
</script>

<div class="container">
	<div>
		<Button
			icon={CalendarAdd}
			kind="ghost"
			size="small"
			iconDescription="When"
			on:click={() => (showStartedAt = !showStartedAt)}
		/>
		{#if showStartedAt}
			<StartedAt />
		{/if}
	</div>

	<div>
		<Button
			icon={Link}
			kind="ghost"
			size="small"
			iconDescription="URL"
			on:click={() => (showUrlInput = !showUrlInput)}
		/>
		{#if showUrlInput}
			<UrlInput />
		{/if}
	</div>

	<div>
		<Button
			icon={UserFollow}
			kind="ghost"
			size="small"
			iconDescription="Allocated to"
			on:click={() => (showAllocatedTo = !showAllocatedTo)}
		/>
		{#if showAllocatedTo}
			<AllocatedToInput />
		{/if}
	</div>
</div>

<style>
	div {
		display: flex;
	}

	div.container {
		justify-content: right;
	}
</style>
