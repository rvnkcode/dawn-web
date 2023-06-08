<script lang="ts">
	import { SideNav, SideNavDivider, SideNavItems, SideNavLink } from 'carbon-components-svelte';
	import {
		Archive,
		Box,
		CatalogPublish,
		CalendarHeatMap,
		Task,
		TaskStar,
		TrashCan
	} from 'carbon-icons-svelte';
	import type { RouterOutputs } from '$lib/trpc/router';

	export let count: RouterOutputs['count']['getCounts'];
</script>

<!-- TODO: Change rail property by its client's width -->
<SideNav rail>
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
