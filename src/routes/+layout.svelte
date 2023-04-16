<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import MobileOnlyButton from '$lib/components/mobileOnlyButton.svelte';
	import { showSidebar } from '$lib/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

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
