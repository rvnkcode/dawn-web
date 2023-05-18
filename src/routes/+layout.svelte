<script lang="ts">
	import Nav from '$lib/components/organisms/nav.svelte';
	import MobileOnlyButton from '$lib/components/zMobile/mobileOnlyButton.svelte';
	import { showSidebar } from '$lib/stores';
	import { onMount } from 'svelte';
	import SideFooter from '$lib/components/organisms/sideFooter.svelte';
	import type { LayoutServerData } from './$types';

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	onMount(() => {
		document.cookie = `timeZone=${timeZone}`;
	});

	export let data: LayoutServerData;

	$: ({ count } = data);
</script>

<aside class={$showSidebar ? 'show' : ''}>
	<Nav {count} />
	<SideFooter />
</aside>
{#if !$showSidebar}
	<MobileOnlyButton />
	<section>
		<slot />
	</section>
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
