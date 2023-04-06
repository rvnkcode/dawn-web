<form action="?/createTask" method="post">
	<!-- svelte-ignore a11y-autofocus -->
	<input type="text" name="title" required placeholder="New To-Do" autocomplete="off" autofocus />
</form>

<style>
	input[type='text'] {
		width: 95%;
	}
</style>
