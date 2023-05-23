<script lang="ts">
	import { format } from 'date-fns';

	import { page } from '$app/stores';

	$: current = $page.url.pathname;

	type DateKind = 'started' | 'completed';

	export let date: Date | null = null;
	export let attributeType: DateKind;

	let value = '';

	if (date) {
		value = format(date, 'yyyy-MM-dd');
	}

	const today = format(new Date(), 'yyyy-MM-dd');

	const handleLabel = (dateKind: DateKind) => {
		switch (dateKind) {
			case 'started':
				return `When`;

			case 'completed':
				return `Completed`;
		}
	};

	const handleName = (dateKind: DateKind) => {
		switch (dateKind) {
			case 'started':
				return `startedAt`;

			case 'completed':
				return 'completedAt';
		}
	};
</script>

<label>
	<span>{handleLabel(attributeType)}:</span>
	<input
		type="date"
		bind:value
		name={handleName(attributeType)}
		max={attributeType == 'completed' || current === '/archive' ? today : null}
	/>
</label>

<style>
	input[type='date'] {
		border: none;
		margin: 0.5rem 0 0.25rem 0;
	}
</style>
