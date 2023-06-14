<script lang="ts">
	import { onMount } from 'svelte';
	import Notifications from 'svelte-notifications';

	import Nav from '$lib/components/organisms/nav.svelte';
	import SideFooter from '$lib/components/organisms/sideFooter.svelte';
	import MobileOnlyButton from '$lib/components/zMobile/mobileOnlyButton.svelte';
	import { showSidebar } from '$lib/stores';

	import type { LayoutServerData } from './$types';

	// Initialize client's time zone
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	onMount(() => {
		document.cookie = `timeZone=${timeZone}`;
	});

	// Initialize layout server data
	export let data: LayoutServerData;
	$: ({ count } = data);
</script>

<aside class={$showSidebar ? 'show' : ''}>
	<Nav {count} />
	<SideFooter />
</aside>
{#if !$showSidebar}
	<MobileOnlyButton />
	<Notifications zIndex={3}>
		<section>
			<slot />
		</section>
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

	/* PC */
	@media (min-width: 481px) {
		aside {
			max-width: 233px;
		}
	}

	/* Mobile */
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
