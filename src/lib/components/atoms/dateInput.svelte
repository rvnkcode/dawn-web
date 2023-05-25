<script lang="ts">
	import { addDays, format } from 'date-fns';
import { onMount } from 'svelte';
	
	import { page } from '$app/stores';

	$: current = $page.url.pathname;

	type DateKind = 'started' | 'completed';

	export let date: Date | null = null;
	export let attributeType: DateKind;

	const today = format(new Date(), 'yyyy-MM-dd');
	const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

	$: value = '';

	onMount(() => {
		if (date) {
			value = format(date, 'yyyy-MM-dd');
		} else if (current === '/today') {
			value = today;
		}
	});

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
		min={attributeType === 'started' && current === '/upcoming' ? tomorrow : null}
		max={attributeType == 'completed' || current === '/archive' ? today : null}
		required={attributeType === 'started' && current === '/upcoming' ? true : false}
	/>
</label>

<style>
	input[type='date'] {
		border: none;
		margin: 0.5rem 0 0.25rem 0;
	}
</style>
