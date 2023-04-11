<script>
	import Nav from '$lib/components/nav.svelte';
	import MobileOnlyButton from '$lib/components/mobileOnlyButton.svelte';

	let showSidebar = false;
</script>

<Nav {showSidebar} />
<MobileOnlyButton bind:value={showSidebar} />
<section>
	<slot />
</section>

<style>
	section {
		max-width: 1020px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
	}
</style>
