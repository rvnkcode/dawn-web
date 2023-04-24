<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { selected, showSidebar, isSelectModeOnMobile } from '$lib/stores';
	import { page } from '$app/stores';

	$: current = $page.url.pathname;

	let menuEnabled = false;

	const handleClick = () => {
		menuEnabled = !menuEnabled;
		$isSelectModeOnMobile = !$isSelectModeOnMobile;
	};

	const handleDone = () => {
		$isSelectModeOnMobile = !$isSelectModeOnMobile;
		$selected.clear();
		// console.log($selected);
	};

	const archiveChecked = async () => {
		try {
			await fetch('/api/archive', {
				method: 'PATCH'
			});
			invalidateAll();
			menuEnabled = !menuEnabled;
		} catch (error) {
			console.error(error);
		}
	};
</script>

{#if $isSelectModeOnMobile}
	<button class="general outer blue right done" on:click={() => handleDone()}>Done</button>
{:else}
	<button class="outer left" on:click={() => ($showSidebar = !$showSidebar)}
		><ion-icon name="chevron-back" class="big" /></button
	>
	<button class="outer right" on:click={() => (menuEnabled = !menuEnabled)}
		><ion-icon name="chevron-down-circle-outline" class="big" /></button
	>
	{#if menuEnabled}
		<ul class="popup">
			<li>
				<button on:click={() => handleClick()}
					><ion-icon name="list" class="small" /><span>Select</span></button
				>
			</li>
			{#if current !== '/trash' && current !== '/archive'}
				<li>
					<button on:click={() => archiveChecked()}
						><ion-icon name="save" class="small" /><span>Archive completed</span></button
					>
				</li>
			{/if}
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
		margin-right: 0.25rem;
	}

	ion-icon.big {
		color: #9c9ea1;
		font-size: xx-large;
	}

	ul {
		right: 0;
		margin-top: 2.8rem;
		margin-right: 0.5rem;
	}

	ion-icon.small {
		color: #7ca0ef;
		margin-right: 0.25rem;
		font-size: 15px;
		vertical-align: text-bottom;
	}

	li:not(:last-child) {
		margin-bottom: 0.5rem;
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
