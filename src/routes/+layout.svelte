<script lang="ts">
	import { page } from '$app/stores';

	$: current = $page.url.pathname;
</script>

<nav>
	<ul>
		<li class={current === '/' ? 'current' : ''}>
			<ion-icon name="file-tray" class="inbox" /><a href="/">Inbox</a>
		</li>
		<li class={current === '/trash' ? 'current' : ''}>
			<ion-icon name="trash-bin" class="trashIcon" /><a href="/trash">Trash</a>
		</li>
	</ul>
</nav>
<section>
	<slot />
</section>

<style>
	nav {
		background-color: #f9fafb;
		height: 100vh;
		width: 100%;
		max-width: 233px;
		/* border: 2px solid red; */
	}

	ul {
		margin: 3rem 1rem 0 1rem;
	}

	li {
		margin-bottom: 0.25rem;
		border-radius: 0.25rem;
		padding: 0.4rem 0.25rem;
	}

	li.current {
		background-color: #e4e7ea;
	}

	a {
		text-decoration: none;
		color: #292e34;
		font-weight: bold;
	}

	section {
		max-width: 1020px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
	}
</style>
