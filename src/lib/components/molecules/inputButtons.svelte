<script lang="ts">
	export let value: {
		showAllocatedTo: boolean;
		showUrlInput: boolean;
		showStartedAt: boolean;
	};
</script>

<div>
	<button
		type="button"
		on:click={() => {
			value.showStartedAt = !value.showStartedAt;
		}}><ion-icon name="calendar" /></button
	>
	<button type="button" on:click={() => (value.showUrlInput = !value.showUrlInput)}
		><ion-icon name="link-outline" /></button
	>
	<button type="button" on:click={() => (value.showAllocatedTo = !value.showAllocatedTo)}
		><ion-icon name="person-add" /></button
	>
</div>

<style>
	div {
		margin-top: 0.5rem;
		text-align: right;
	}

	ion-icon {
		font-size: large;
		color: #a9aeb2;
	}

	button:not(:last-child) {
		margin-right: 0.75rem;
	}
</style>
