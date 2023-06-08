<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { Content } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/organisms/nav.svelte';
	import MainHeader from '$lib/components/organisms/mainHeader.svelte';
	import type { LayoutServerData } from './$types';
	// import Notifications from 'svelte-notifications';
	// import MobileOnlyButton from '$lib/components/zMobile/mobileOnlyButton.svelte';
	// import { showSidebar } from '$lib/stores';

	// Initialize page data
	export let data: LayoutServerData;
	$: ({ count } = data);

	// Set the time zone
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	onMount(() => {
		document.cookie = `timeZone=${timeZone}`;
	});
</script>

<MainHeader />
<Nav {count} />
<Content>
	<slot />
</Content>

<!-- 
{#if !$showSidebar}
	<MobileOnlyButton />
	<Notifications zIndex={3}>
			</Notifications>
{/if}

<style>
	aside {
		background-color: #f9fafb;
		min-height: 100vh;
		width: 100%;
	}

	section {
		max-width: 1020px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
	}

	@media (min-width: 481px) {
		aside {
			max-width: 233px;
		}
	}

	@media (max-width: 480px) {
		aside {
			display: none;
		}

		aside.show {
			position: absolute;
			left: 0;
			display: block;
			z-index: 1;
		}
	}
</style>
	 -->
