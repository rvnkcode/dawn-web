<script lang="ts">
	import { Header, HeaderActionLink, HeaderUtilities } from 'carbon-components-svelte';
	import { SettingsAdjust } from 'carbon-icons-svelte';
</script>

<Header company="DAWN">
	<HeaderUtilities>
		<!-- TODO: Add global search menu -->
		<HeaderActionLink icon={SettingsAdjust} href="/preferences/contacts" />
	</HeaderUtilities>
</Header>
