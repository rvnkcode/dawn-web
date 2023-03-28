<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ tasks } = data);
</script>

<ul>
	{#each tasks as task (task.id)}
		<li>{task.title}</li>
	{/each}
</ul>
