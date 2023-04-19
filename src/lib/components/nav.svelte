<script lang="ts">
	import { page } from '$app/stores';
	import { showSidebar } from '$lib/stores';

	$: current = $page.url.pathname;

	export let count: number;
</script>

<nav class={$showSidebar ? 'show' : ''}>
	<ul>
		<li class={current === '/' ? 'current' : ''}>
			<div>
				<ion-icon name="file-tray" class="inbox" /><a
					href="/"
					on:click={() => {
						$showSidebar = false;
					}}>Inbox</a
				>
			</div>
			{#if count > 0}
				<span>{count}</span>
			{/if}
		</li>
		<li class={current === '/archive' ? 'current' : ''}>
			<div>
				<ion-icon name="save" class="archive" />
				<a
					href="/archive"
					on:click={() => {
						$showSidebar = false;
					}}>Archive</a
				>
			</div>
		</li>
		<li class={current === '/trash' ? 'current' : ''}>
			<div>
				<ion-icon name="trash-bin" class="trashIcon" /><a
					href="/trash"
					on:click={() => {
						$showSidebar = false;
					}}>Trash</a
				>
			</div>
		</li>
	</ul>
</nav>

<style>
	nav {
		background-color: #f9fafb;
		min-height: 100vh;
		width: 100%;
	}

	ul {
		margin: 3rem 1rem 0 1rem;
	}

	li {
		margin-bottom: 0.25rem;
		border-radius: 0.25rem;
		padding: 0.25rem 0.25rem;
		display: flex;
		justify-content: space-between;
	}

	li.current {
		background-color: #e4e7ea;
	}

	a {
		text-decoration: none;
		color: #292e34;
		/* font-weight: bold; */
	}

	span {
		margin-right: 0.5rem;
		color: #989ea5;
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

		nav.show {
			position: absolute;
			left: 0;
			display: block;
			z-index: 1;
		}
	}
</style>
