<script lang="ts">
	export let value = '';
</script>

<!-- svelte-ignore a11y-autofocus -->
<input
	type="text"
	name="title"
	required
	placeholder="New To-Do"
	autocomplete="off"
	autofocus
	class="inputTitle"
	bind:value
/>
