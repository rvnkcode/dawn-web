<script lang="ts">
	import { page } from '$app/stores';
	import { showSidebar } from '$lib/stores';

	import type { RouterOutputs } from '../../trpc/router';

	$: current = $page.url.pathname;

	export let count: RouterOutputs['count']['getCounts'];
</script>

<!-- TODO: Separate nav lists  -->
<nav class={$showSidebar ? 'show' : ''}>
	<ul>
		<li class={current === '/' ? 'current' : ''}>
			<div>
				<ion-icon name="file-tray" class="inbox title" /><a
					href="/"
					on:click={() => {
						$showSidebar = false;
					}}>Inbox</a
				>
			</div>
			{#if count.inboxCount > 0}
				<span>{count.inboxCount}</span>
			{/if}
		</li>
		<li class={current === '/today' ? 'current' : ''}>
			<div>
				<ion-icon name="receipt" class="title today" /><a
					href="/today"
					on:click={() => {
						$showSidebar = false;
					}}>Today</a
				>
			</div>
			{#if count.todayCount > 0}
				<span>{count.todayCount}</span>
			{/if}
		</li>
		<li class={current === '/upcoming' ? 'current' : ''}>
			<div>
				<ion-icon name="calendar" class="title upcoming" />
				<a
					href="/upcoming"
					on:click={() => {
						$showSidebar = false;
					}}>Upcoming</a
				>
			</div>
		</li>
		<li class={current === '/waiting_for' ? 'current' : ''}>
			<div>
				<ion-icon name="chatbox-ellipses" class="title" />
				<a
					href="/waiting_for"
					on:click={() => {
						$showSidebar = false;
					}}>Waiting for</a
				>
			</div>
			{#if count.waitingForCount > 0}
				<span>{count.waitingForCount}</span>
			{/if}
		</li>
		<li class={current === '/archive' ? 'current' : ''}>
			<div>
				<ion-icon name="save" class="archive title" />
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
				<ion-icon name="trash" class="trashIcon title" /><a
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
		font-size: 1rem;
		/* font-weight: bold; */
	}

	span {
		margin-right: 0.5rem;
		color: #989ea5;
	}

	@media (min-width: 481px) {
		ul {
			position: fixed;
			width: inherit;
			max-width: calc(233px - 2rem);
			top: 0;
			left: 0;
			z-index: 1;
			/* Debug */
			/* border: 2px solid violet; */
		}
	}

	@media (max-width: 480px) {
		li {
			font-size: large;
		}

		a {
			font-size: large;
		}
	}
</style>
