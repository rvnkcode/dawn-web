<script lang="ts">
	import { page } from '$app/stores';
	import { showSidebar } from '$lib/stores';

	export let path: string;
	export let iconName: string;
	export let iconClass = '';
	export let label: string;
	export let count: number | undefined = undefined;

	$: current = $page.url.pathname;

	const hideSidebar = () => {
		$showSidebar = false;
	};
</script>

<li class={current === path ? 'current' : ''}>
	<div>
		<ion-icon name={iconName} class={('title', iconClass)} />
		<a href={path} on:click={hideSidebar}>{label}</a>
	</div>

	{#if count && count > 0}
		<span>{count}</span>
	{/if}
</li>

<style>
	li {
		border-radius: 0.25rem;
		padding: 0.25rem 0.25rem;
		display: flex;
		justify-content: space-between;
	}

	li.current {
		background-color: #e4e7ea;
	}

	a {
		text-decoration: none;
		color: #292e34;
		font-size: 1rem;
		/* font-weight: bold; */
	}

	span {
		margin-right: 0.5rem;
		color: #989ea5;
	}

	@media (max-width: 480px) {
		li {
			font-size: large;
		}

		a {
			font-size: large;
		}
	}
</style>
