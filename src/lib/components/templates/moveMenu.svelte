<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { selected } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	export let value: boolean;

	$: current = $page.url.pathname;

	// TODO: Add another category or projects someday...
	const moveItems = async (category: string) => {
		if ($selected.size < 1) {
			return;
		}

		if (current === '/') {
			return;
		}

		value = false; // close popup move menu

		await trpc().list.moveSelected.mutate({ dest: category, ids: [...$selected] });
		$selected.clear();
		invalidateAll();
	};
</script>

<div class="popup">
	<header><span>Move</span></header>
	<ul>
		<li>
			<button on:click={async () => await moveItems('inbox')}
				><ion-icon name="file-tray" class="inbox" /><span>Inbox</span></button
			>
		</li>
	</ul>
</div>

<style>
	div {
		text-align: center;
	}

	header {
		margin-bottom: 0.5rem;
	}

	li {
		padding: 0.2rem;
		border-radius: 0.25rem;
	}

	span {
		color: white;
	}

	ion-icon {
		color: #cbced6;
		margin-right: 0.25rem;
	}

	@media (min-width: 481px) {
		div {
			max-width: fit-content;
			margin: 0 auto 0.5rem auto;
		}

		li:hover {
			background-color: #519cff;
		}
	}

	@media (max-width: 480px) {
		div {
			width: 80%;
			height: 85%;
			border-radius: 1rem;
			left: 0;
			right: 0;
			bottom: 0;
			margin: 0 auto 3rem auto;
		}

		header {
			margin: 0.5rem 0;
		}

		ion-icon {
			font-size: large;
			vertical-align: text-bottom;
		}

		span {
			font-size: large;
		}
	}
</style>
