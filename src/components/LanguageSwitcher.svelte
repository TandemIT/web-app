<script lang="ts">
	import { page } from '$app/state';
	import { extractLocaleFromUrl, locales, localizeHref } from '$lib/paraglide/runtime';

	const localeLabels: Record<string, string> = {
		en: 'EN',
		nl: 'NL'
	};

	const localeNames: Record<string, string> = {
		en: 'English',
		nl: 'Nederlands'
	};

	const currentLocale = $derived(extractLocaleFromUrl(page.url.href));
</script>

<nav
	class="border-secondary-300 bg-secondary-50/95 inline-flex items-center gap-1 rounded-full border p-1 shadow-sm"
	aria-label="Choose language"
>
	<span class="text-secondary-700 px-2 text-[11px] font-semibold tracking-wide uppercase"
		>Language</span
	>

	{#each locales as locale (locale)}
		<!-- Localized links preserve current page and use Paraglide's official routing strategy. -->
		<a
			href={localizeHref(`${page.url.pathname}${page.url.search}${page.url.hash}`, { locale })}
			data-sveltekit-reload
			class="focus-visible:ring-primary-500 focus-visible:ring-offset-secondary-50 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide no-underline transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
			class:bg-secondary-800={locale === currentLocale}
			class:text-secondary-50={locale === currentLocale}
			class:shadow-sm={locale === currentLocale}
			class:text-secondary-700={locale !== currentLocale}
			class:hover:bg-secondary-200={locale !== currentLocale}
			class:hover:text-secondary-900={locale !== currentLocale}
			aria-current={locale === currentLocale ? 'true' : undefined}
			aria-label={`Switch language to ${localeNames[locale] ?? locale}`}
		>
			<span class="sr-only">Switch language to {localeNames[locale] ?? locale}. </span>
			{localeLabels[locale] ?? locale.toUpperCase()}
		</a>
	{/each}
</nav>
