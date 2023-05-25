<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	import { page } from '$app/stores';

	$: current = $page.url.pathname;
	export let dest: string;
	export let label: string;
	export let iconName: string;
	export let value: boolean;

	const moveItems = async (dest: string) => {
		if ($selected.size < 1) {
			return;
		}

		if (current === '/' && dest === 'inbox') {
			return;
		}
		if (current === '/someday' && dest === 'someday') {
			return;
		}
		if (current === '/anytime' && dest === 'anytime') {
			return;
		}

		value = false; // close popup move menu

		await trpc().list.moveSelected.mutate({ dest, ids: [...$selected] });
		$selected.clear();
		invalidateAll();
	};
</script>

<li>
	<button on:click={async () => await moveItems(dest)}
		><ion-icon name={iconName} class={dest} /><span>{label}</span></button
	>
</li>

<style>
	li {
		padding: 0.2rem;
		border-radius: 0.25rem;
		width: 100%;
	}

	span {
		color: white;
	}

	ion-icon {
		color: #cbced6;
		margin-right: 0.25rem;
		vertical-align: middle;
	}

	@media (min-width: 481px) {
		li {
			text-align: left;
		}

		li:hover {
			background-color: #519cff;
		}
	}

	@media (max-width: 480px) {
		ion-icon {
			font-size: large;
			vertical-align: text-bottom;
		}

		span {
			font-size: large;
		}
	}
</style>
