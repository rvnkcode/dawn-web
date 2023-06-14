<script lang="ts">
	import { showSidebar } from '$lib/stores';
	import type { RouterOutputs } from '$lib/trpc/router';

	import NavItem from '../molecules/navItem.svelte';
	import NavSubList from '../molecules/navSubList.svelte';

	export let count: RouterOutputs['count']['getCounts'];
</script>

<nav class={$showSidebar ? 'show' : ''}>
	<ul class="container">
		<NavSubList>
			<NavItem
				path="/"
				iconName="file-tray"
				iconClass="inbox"
				label="Inbox"
				count={count.inboxCount}
			/>
		</NavSubList>
		<!-- <NavSubList>
			<NavItem
				path="/today"
				iconName="pause"
				iconClass="today"
				label="Today"
				count={count.todayCount}
			/>
			<NavItem
				path="/upcoming"
				iconName="play-skip-forward"
				iconClass="upcoming"
				label="Upcoming"
			/>
			<NavItem path="/anytime" iconName="stop" iconClass="anytime" label="Anytime" />
			<NavItem path="/someday" iconName="archive" iconClass="someday" label="Someday" />
		</NavSubList>
		<NavSubList>
			<NavItem
				path="/waiting_for"
				iconName="chatbox-ellipses"
				label="Waiting for"
				count={count.waitingForCount}
			/>
		</NavSubList>
		<NavSubList>
			<NavItem path="/archive" iconName="save" iconClass="archive" label="Archive" />
			<NavItem path="/trash" iconName="trash" iconClass="trashIcon" label="Trash" />
		</NavSubList> -->
	</ul>
</nav>

<style>
	nav {
		width: 100%;
	}

	ul.container {
		margin: 3rem 1rem 0 1rem;
	}

	@media (min-width: 481px) {
		ul.container {
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
</style>
