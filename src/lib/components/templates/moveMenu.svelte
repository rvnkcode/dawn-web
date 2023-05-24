<script lang="ts">
	import MoveMenuItem from '../molecules/moveMenuItem.svelte';

	export let value: boolean;
</script>

<div class="popup">
	<header><span>Move</span></header>
	<ul>
		<MoveMenuItem dest="inbox" label="Inbox" iconName="file-tray" bind:value />
		<MoveMenuItem dest="someday" label="Someday" iconName="archive" bind:value />
	</ul>
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

		span {
			font-size: large;
		}
	}
</style>
