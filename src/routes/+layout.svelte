<script lang="ts">
	import Nav from '$lib/components/organisms/nav.svelte';
	import MobileOnlyButton from '$lib/components/zMobile/mobileOnlyButton.svelte';
	import { showSidebar } from '$lib/stores';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: ({ count } = data);
</script>

<Nav {count} />
{#if !$showSidebar}
	<MobileOnlyButton />
	<section>
		<slot />
	</section>
{/if}

<style>
	section {
		max-width: 1020px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
	}
</style>
