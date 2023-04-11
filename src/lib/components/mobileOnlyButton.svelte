<script lang="ts">
	import { isSelectModeOnMobile } from '$lib/stores';
	import { selected } from '$lib/stores';

	let menuEnabled = false;

	const handleClick = () => {
		menuEnabled = !menuEnabled;
		$isSelectModeOnMobile = !$isSelectModeOnMobile;
	};

	const handleDone = () => {
		$isSelectModeOnMobile = !$isSelectModeOnMobile;
		$selected.clear();
		console.log($selected);
	};

	export let value: boolean;
</script>

{#if $isSelectModeOnMobile}
	<button class="outer done right" on:click={() => handleDone()}>Done</button>
{:else}
	<button class="outer left" on:click={() => (value = !value)}
		><ion-icon name="chevron-back" class="big" /></button
	>
	<button class="outer right" on:click={() => (menuEnabled = !menuEnabled)}
		><ion-icon name="chevron-down-circle-outline" class="big" /></button
	>
	{#if menuEnabled}
		<ul>
			<li>
				<button on:click={() => handleClick()}
					><ion-icon name="list" class="small" /><span>Select</span></button
				>
			</li>
		</ul>
	{/if}
{/if}

<style>
	button.outer {
		position: fixed;
		top: 0;
		margin-top: 0.5rem;
		z-index: 1;
	}

	button.right {
		right: 0;
	}

	button.left {
		left: 0;
	}

	button.done {
		background-color: #469ffc;
		border-radius: 0.25rem;
		color: white;
		margin-right: 0.25rem;
		padding: 0.5rem 0.75rem;
		font-weight: bold;
	}

	ion-icon.big {
		color: #9c9ea1;
		font-size: xx-large;
	}

	ul {
		background-color: #292c37;
		border-radius: 0.25rem;
		z-index: 1;
		position: absolute;
		right: 0;
		padding: 0.6rem;
		margin-top: 2.8rem;
		margin-right: 0.5rem;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	ion-icon.small {
		color: #7ca0ef;
		margin-right: 0.25rem;
		font-size: 15px;
		vertical-align: text-bottom;
	}

	li > button > span {
		color: white;
		font-size: 15px;
	}

	@media (min-width: 481px) {
		button {
			display: none;
		}

		ul {
			display: none;
		}
	}
</style>
