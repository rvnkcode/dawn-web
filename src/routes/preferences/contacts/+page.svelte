<script lang="ts">
	import ContactList from '../../../lib/components/organisms/contactList.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: ({ disabled, activated } = data);
</script>

<main>
	<ContactList list={disabled} />

	<div>
		<button class="general"><ion-icon name="chevron-forward-outline" /></button>
		<button class="general"><ion-icon name="chevron-back-outline" /></button>
	</div>

	<ContactList list={activated} />
</main>

<style>
	main {
		display: flex;
	}

	main > div {
		display: flex;
		flex-direction: column;
	}
</style>
