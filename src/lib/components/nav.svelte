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

<style>
	nav {
		background-color: #f9fafb;
		min-height: 100vh;
		width: 100%;
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

	@media (min-width: 481px) {
		nav {
			max-width: 233px;
		}
	}

	@media (max-width: 480px) {
		nav {
			display: none;
		}
	}
</style>
