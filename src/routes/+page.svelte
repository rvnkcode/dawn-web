<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ tasks } = data);
</script>

<svelte:head>
	<title>Dawn: Inbox</title>
</svelte:head>

<header>
	<h1>Inbox</h1>
</header>

<main>
	<form action="?/createTask" method="post">
		<input type="text" name="title" required placeholder="New To-Do" />
		<button type="submit">submit</button>
	</form>

	<ul>
		{#each tasks as task (task.id)}
			<li>
				<input type="checkbox" id={task.id.toString()} />
				<label for={task.id.toString()}>
					<input type="checkbox" checked={task.isDone} />{task.id}: {task.title} ({task.createdAt})
				</label>
			</li>
		{/each}
	</ul>
</main>
