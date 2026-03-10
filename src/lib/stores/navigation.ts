import type { NavLink } from '$lib/types';
import { derived, writable } from 'svelte/store';

const links: NavLink[] = [
	{ href: '/', id: null },
	{ href: '/#aanpak', id: 'aanpak' },
	{ href: '/#missie', id: 'missie' },
	{ href: '/#cases', id: 'cases' },
	{ href: '/about', id: null }
];

const isMenuOpen = writable(false);
const activeSection = writable<string | null>(null);
const currentPath = writable('/');

// Check if link is active
const isActiveLink = derived([activeSection, currentPath], ([$activeSection, $currentPath]) => {
	return (link: NavLink): boolean => {
		if (link.id) {
			return $activeSection === link.id;
		}
		return $currentPath === link.href;
	};
});

export const navigation = {
	links,
	isMenuOpen,
	activeSection,
	currentPath,
	isActiveLink,

	setCurrentPath: (path: string) => {
		currentPath.set(path);
	},

	setActiveSection: (sectionId: string | null) => {
		activeSection.set(sectionId);
	},

	// Toggle mobile menu
	toggleMenu: () => {
		isMenuOpen.update((open) => !open);
	},

	// Close mobile menu
	closeMenu: () => {
		isMenuOpen.set(false);
	}
};
