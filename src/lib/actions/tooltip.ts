import Tooltip from '$lib/components/atoms/tooltip.svelte';

export const tooltip = (element: HTMLElement) => {
	const text = element.getAttribute('tooltipText');
	let component: Tooltip;

	function mouseOver(event: MouseEvent) {
		component = new Tooltip({
			target: document.body,
			props: {
				tooltipText: text ?? undefined,
				x: event.pageX,
				y: event.pageY
			}
		});
	}

	function mouseMove(event: MouseEvent) {
		component.$set({
			x: event.pageX,
			y: event.pageY
		});
	}

	function mouseLeave() {
		component.$destroy();
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mousemove', mouseMove);
	element.addEventListener('mouseleave', mouseLeave);
};
