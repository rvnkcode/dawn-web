<!-- TODO: Add today's date? -->
<header>
	<h1>
		<slot />
	</h1>
</header>

<style>
	header {
		background-color: white;
		padding-top: 3rem;
		padding-bottom: 0.5rem;
		position: sticky;
		top: 0;
		/* Debug */
		/* border: 2px solid violet; */
	}

	header > h1 {
		font-size: x-large;
		font-weight: bold;
	}
</style>
