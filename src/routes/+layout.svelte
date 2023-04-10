<script>
	import Nav from '$lib/components/nav.svelte';
</script>

<Nav />
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
