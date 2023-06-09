<!-- TODO: Add today's date? -->
<header>
	<h1>
		<slot />
	</h1>
</header>

<style>
	header {
		position: sticky;
		top: 3rem;
		z-index: 1;
		/* TODO: Dynamic theming */
		background-color: #ffffff;
		/* Debug */
		/* border: 2px solid violet; */
	}
</style>
