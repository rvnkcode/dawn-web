<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected } from '$lib/stores';
	import { trpc } from '$lib/trpc/client';

	export let value: boolean;

	const handleDate = async (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const date = e.currentTarget.valueAsDate;

		if (date) {
			await trpc().list.updateStartDate.mutate({ date, ids: [...$selected] });

			value = false;
			$selected.clear();
			invalidateAll();
		}
	};
</script>

<div class="popup">
	<header><span>When</span></header>
	<input type="date" on:change={async (e) => await handleDate(e)} />
</div>

<style>
	div {
		text-align: center;
	}

	header {
		margin-bottom: 0.5rem;
	}

	span {
		color: white;
	}

	@media (min-width: 481px) {
		div {
			max-width: fit-content;
			margin: 0 auto 0.5rem auto;
		}
	}
</style>
