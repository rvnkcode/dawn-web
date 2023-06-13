<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
</script>

<DatePicker datePickerType="single" dateFormat="Y-n-j">
	<DatePickerInput size="sm" name="startedAt" placeholder="When" />
</DatePicker>
