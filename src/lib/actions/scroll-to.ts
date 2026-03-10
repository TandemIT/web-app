import { browser } from '$app/environment';

type ScrollTarget = string | null | undefined;

/**
 * Smoothly scrolls to an element by id when the host element is clicked.
 * If the target element is not present, default browser navigation is preserved.
 */
export function scrollTo(node: HTMLElement, target: ScrollTarget) {
	let currentTarget = target;

	const onClick = (event: MouseEvent) => {
		if (!browser || !currentTarget) return;

		const element = document.getElementById(currentTarget);
		if (!element) return;

		event.preventDefault();
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	node.addEventListener('click', onClick);

	return {
		update(nextTarget: ScrollTarget) {
			currentTarget = nextTarget;
		},
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
}
