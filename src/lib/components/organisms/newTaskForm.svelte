<script lang="ts">
	import { ExpandableTile, TextArea, TextInput } from 'carbon-components-svelte';
</script>

<ExpandableTile>
	<div slot="above">
		<TextInput placeholder="New To-Do" size="sm" name="title" /><br /><br />
	</div>

	<div slot="below">
		<TextArea placeholder="Notes" name="comments" />
	</div>
</ExpandableTile>
