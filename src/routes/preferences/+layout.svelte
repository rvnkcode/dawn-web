<script lang="ts">
	import Header from '$lib/components/organisms/pageHeader.svelte';
</script>

<svelte:head>
	<title>Dawn: Preferences</title>
</svelte:head>

<Header>
	<ion-icon name="options" class="title" /><span>Preferences</span>
</Header>

<!-- TODO: Add sub menu navigation tab  -->

<slot />
