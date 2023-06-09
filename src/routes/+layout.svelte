<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { Content } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/organisms/nav.svelte';
	import MainHeader from '$lib/components/organisms/mainHeader.svelte';
	import type { LayoutServerData } from './$types';
	import { clientWidth } from '$lib/stores';

	// Initialize page data
	export let data: LayoutServerData;
	$: ({ count } = data);

	// Set the time zone
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	onMount(() => {
		document.cookie = `timeZone=${timeZone}`;
	});

	let isSideNavOpen = false;
</script>

<div bind:clientWidth={$clientWidth}>
	<MainHeader bind:isSideNavOpen />
	<Nav {count} clientWidth={$clientWidth} bind:isOpen={isSideNavOpen} />
	<Content>
		<slot />
	</Content>
</div>
