<script lang="ts">
	import type { Task } from '@prisma/client';

	export let task: Task;
</script>

<form action="?/updateTask" method="post">
	<input type="hidden" value={task.id} name="id" />
	<!-- svelte-ignore a11y-autofocus -->
	<input type="text" bind:value={task.title} required autocomplete="off" name="title" autofocus />
</form>

<style>
	input[type='text'] {
		width: 95%;
	}
</style>
