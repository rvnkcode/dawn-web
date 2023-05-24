<script lang="ts">
	import Header from '$lib/components/organisms/header.svelte';
	import MainFooter from '$lib/components/organisms/mainFooter.svelte';

	let showNewInput = false;
</script>

<svelte:head>
	<title>Dawn: Someday</title>
</svelte:head>

<Header>
	<ion-icon name="archive" class="title someday" /><span>Someday</span>
</Header>

<MainFooter bind:value={showNewInput} />
