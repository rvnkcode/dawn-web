<script lang="ts">
	import type { Contact } from '@prisma/client';

	export let list: Contact[];
</script>

<ul>
	<header><label><input type="checkbox" /><span>Select all</span></label></header>
	<hr />
	{#each list as c}
		<li><label><input type="checkbox" />{c.name}<button>edit</button></label></li>
	{/each}
</ul>

<style>
	ul {
		border: 1px solid gray;
		border-radius: 0.25rem;
	}

	ul > header {
		padding: 0 0.25rem;
	}

	li {
		padding: 0 0.25rem;
	}
</style>
