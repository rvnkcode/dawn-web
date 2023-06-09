<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { Content } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/organisms/nav.svelte';
	import MainHeader from '$lib/components/organisms/mainHeader.svelte';
	import type { LayoutServerData } from './$types';

	// Initialize page data
	export let data: LayoutServerData;
	$: ({ count } = data);

	// Set the time zone
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	onMount(() => {
		document.cookie = `timeZone=${timeZone}`;
	});

	let clientWidth: number;
	let isSideNavOpen = false;
</script>

<div bind:clientWidth>
	<MainHeader bind:isSideNavOpen />
	<Nav {count} {clientWidth} bind:isOpen={isSideNavOpen} />
	<Content>
		<slot />
	</Content>
</div>
