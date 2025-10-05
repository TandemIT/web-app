import { browser } from '$app/environment';
import { page } from '$app/stores';
import { writable, derived } from 'svelte/store';
import type { NavLink } from '$lib/types';

const links: NavLink[] = [
  { href: '/', name: 'Home', id: null },
  { href: '/#aanpak', name: 'Aanpak', id: 'aanpak' },
  { href: '/#missie', name: 'Missie', id: 'missie' },
  { href: '/#cases', name: 'Cases', id: 'cases' },
  { href: '/about', name: 'Over ons', id: null }
];

const isMenuOpen = writable(false);
const activeSection = writable<string | null>(null);
const currentPath = writable('/');

// Intersection Observer to detect active section
if (browser) {
  // Subscribe to page store only in browser
  page.subscribe((p) => {
    currentPath.set(p.url.pathname);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      let hasActiveSection = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          activeSection.set(entry.target.id);
          hasActiveSection = true;
        }
      });

      // Clear active section if no section is currently in view
      if (!hasActiveSection) {
        activeSection.set(null);
      }
    },
    {
      threshold: 0.5,
      rootMargin: '-100px 0px -100px 0px'
    }
  );

  // Observe all sections
  const sections = document.querySelectorAll('#aanpak, #missie, #cases');
  sections.forEach((section) => observer.observe(section));
}

// Reset active section when navigating to different pages
currentPath.subscribe((path) => {
  // If we're not on the homepage, clear any active section
  if (path !== '/') {
    activeSection.set(null);
  }
});

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

  // Toggle mobile menu
  toggleMenu: () => {
    isMenuOpen.update(open => !open);
  },

  // Close mobile menu
  closeMenu: () => {
    isMenuOpen.set(false);
  },

  // Handle smooth scrolling for anchor links
  handleNavClick: (event: MouseEvent, href: string) => {
    if (!browser) return;

    // Check if it's an anchor link
    if (href.startsWith('/#')) {
      event.preventDefault();
      const id = href.substring(2); // Remove '/#'
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    // Close mobile menu
    isMenuOpen.set(false);
  }
};