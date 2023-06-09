<script lang="ts">
	import { Header, HeaderActionLink, HeaderUtilities } from 'carbon-components-svelte';
	import { SettingsAdjust } from 'carbon-icons-svelte';

	export let isSideNavOpen: boolean;
</script>

<Header company="DAWN" bind:isSideNavOpen>
	<HeaderUtilities>
		<!-- TODO: Add global search menu -->
		<HeaderActionLink icon={SettingsAdjust} href="/preferences/contacts" />
	</HeaderUtilities>
</Header>
