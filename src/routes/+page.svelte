<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ tasks } = data);
</script>

<form action="?/createTask" method="post">
	<input type="text" name="title" required />
	<button type="submit">submit</button>
</form>

<ul>
	{#each tasks as task (task.id)}
		<li>{task.id}: {task.title} ({task.createdAt}) {task.isDone}</li>
	{/each}
</ul>
