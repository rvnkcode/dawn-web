<script lang="ts">
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
</script>

<DatePicker datePickerType="single" dateFormat="y/m/d">
	<DatePickerInput size="sm" name="startedAt" placeholder="When" />
</DatePicker>
