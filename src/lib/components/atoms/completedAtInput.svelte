<script lang="ts">
	import { format, formatISO } from 'date-fns';

	export let date: Date | null;
	let value = '';

	if (date) {
		value = format(date, 'yyyy-MM-dd');
	}
</script>

<label
	><span>Completed:</span>
	<input type="date" bind:value name="completedAt" />
</label>

<style>
	input[type='date'] {
		border: none;
		margin: 0.5rem 0 0.25rem 0;
	}
</style>
