<li>
	<ul>
		<slot />
	</ul>
</li>

<style>
	li:not(:last-child) {
		margin-bottom: 0.8rem;
	}

	/* Mobile */
	@media (max-width: 480px) {
		li:not(:last-child) {
			margin-bottom: 1.5rem;
		}
	}
</style>
