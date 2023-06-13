<script lang="ts">
	import { SideNav, SideNavDivider, SideNavItems, SideNavLink } from 'carbon-components-svelte';
	import {
		Archive,
		Box,
		CalendarHeatMap,
		CatalogPublish,
		Task,
		TaskStar,
		TrashCan
	} from 'carbon-icons-svelte';

	import type { RouterOutputs } from '$lib/trpc/router';

	// Props
	export let count: RouterOutputs['count']['getCounts'];
	export let clientWidth: number;
	export let isOpen: boolean;
</script>

<SideNav rail={clientWidth > 1056} bind:isOpen>
	<SideNavItems>
		<SideNavLink
			icon={Task}
			text={`Inbox ${count.inbox > 0 ? `[${count.inbox}]` : ''}`}
			href="/"
			isSelected
		/>
		<SideNavDivider />
		<SideNavLink
			icon={TaskStar}
			text={`Today ${count.today > 0 ? `[${count.today}]` : ''}`}
			href="/today"
		/>
		<SideNavLink icon={CalendarHeatMap} text="Upcoming" href="/upcoming" />
		<SideNavLink icon={CatalogPublish} text="Anytime" href="/anytime" />
		<SideNavLink icon={Box} text="Someday" href="/someday" />
		<SideNavDivider />
		<SideNavLink
			icon={Box}
			text={`Waiting for... ${count.waiting > 0 ? `[${count.waiting}]` : ''}`}
			href="/waiting_for"
		/>
		<SideNavDivider />
		<SideNavLink icon={Archive} text="Archive" href="/archive" />
		<SideNavLink icon={TrashCan} text="Trash" href="/trash" />
	</SideNavItems>
</SideNav>
