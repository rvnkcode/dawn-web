<script lang="ts">
	export let value = '';
</script>

<textarea placeholder="Notes" bind:value autocomplete="off" rows="4" name="comments" />

<style>
	textarea {
		width: 100%;
		font-family: sans-serif;
		border: none;
		margin-top: 0.25rem;
	}
</style>
