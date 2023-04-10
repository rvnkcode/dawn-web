<aside><ul><li><ion-icon name="file-tray" class="inbox" /><a href="/">Inbox</a></li></ul></aside>
<slot />

<style>
	aside {
		background-color: #f9fafb;
		height: 100vh;
		width: 100%;
		max-width: 233px;
		/* border: 2px solid red; */
	}

	ul {
		margin: 3rem 1rem 0 1rem;
	}

	a {
		text-decoration: none;
		color: #292e34;
		font-weight: bold;
	}
</style>
