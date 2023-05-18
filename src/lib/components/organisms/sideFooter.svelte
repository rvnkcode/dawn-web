<footer>
	<a href="/preferences/contacts"><ion-icon name="options" /></a>
</footer>

<style>
	footer {
		position: fixed;
		z-index: 1;
		bottom: 0;
		width: 100%;
		left: 0;
		display: flex;
		justify-content: space-evenly;
		align-items: flex-end;
		/* Debug */
		/* border: 2px solid burlywood; */
		text-align: center;
	}

	a {
		width: 100%;
		padding: 0.25rem 0;
	}

	ion-icon {
		color: #404950;
		font-size: large;
	}

	@media (min-width: 481px) {
		footer {
			max-width: 233px; /* nav width */
		}

		footer > a:hover {
			border: 1px solid #eeeef0;
		}
	}
</style>
