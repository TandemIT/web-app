# Tandem IT Web Application

A modern SvelteKit-based website for Tandem IT, built with Svelte 5, TailwindCSS 4, and TypeScript. This application showcases Tandem IT's services in network infrastructure and cybersecurity, providing an engaging user experience with smooth navigation and responsive design.

## 🚀 Tech Stack

- **Framework**: SvelteKit (Svelte 5) with TypeScript
- **Styling**: TailwindCSS 4 with custom design system
- **Icons**: Lucide Svelte & Tabler Icons
- **Fonts**: Poppins & Space Grotesk Variable
- **Package Manager**: pnpm
- **Deployment**: Docker with Node.js
- **Testing**: Playwright for E2E tests

## 📁 Project Structure

```
src/
├── components/           # Reusable Svelte components
│   ├── Header.svelte    # Navigation with smooth scrolling & active states
│   ├── Footer.svelte    # Site footer
│   ├── Aanpak.svelte    # Approach section (id: "aanpak")
│   ├── Goals.svelte     # Mission section (id: "missie")
│   ├── Bewijs.svelte    # Cases section (id: "cases")
│   ├── Enthousiast.svelte # Enthusiasm section
│   ├── Team.svelte      # Team showcase
│   ├── about/           # About page components
│   │   └── About.svelte
│   └── projects/        # Project showcase components
│       ├── Makecenter.svelte
│       └── Makerspace.svelte
├── routes/              # SvelteKit file-based routing
│   ├── +layout.svelte   # Global layout with Header/Footer
│   ├── +page.svelte     # Homepage
│   ├── +error.svelte    # Custom error page (404, 500, etc.)
│   ├── [...catchall]/   # Catch-all route for 404s
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   └── projects/        # Projects page
├── lib/                 # Shared utilities and API data
│   ├── api/            # Static JSON data
│   │   ├── listMembers.json
│   │   └── summaryReport.json
│   └── index.ts
├── app.css             # Global styles with custom CSS variables
├── app.html            # HTML template
└── app.d.ts            # TypeScript declarations
```

## 🛠️ Development

### Prerequisites

- Node.js 23.2.0 or higher
- pnpm 9.14.4 or higher

### Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm run dev
   
   # Or open in browser automatically
   pnpm run dev -- --open
   ```

3. **Available Scripts**:
   ```bash
   pnpm run dev          # Start development server
   pnpm run build        # Build for production
   pnpm run preview      # Preview production build
   pnpm run check        # Type checking with svelte-check
   pnpm run check:watch  # Type checking in watch mode
   pnpm run format       # Format code with Prettier
   pnpm run lint         # Check code formatting
   pnpm run test:e2e     # Run Playwright E2E tests
   ```

## 🎨 Design System

The application uses a carefully crafted design system with CSS custom properties:

### Color Palette

```css
/* Primary (Green) */
--color-primary-300: #2ced94    /* Active states, CTAs */
--color-primary-400: #1dce7c    /* Hover states */
--color-primary-500: #13a260    /* Primary buttons */

/* Secondary (Blue-grey) */
--color-secondary-50: #ffffff   /* Text on dark backgrounds */
--color-secondary-200: #b9cbcc  /* Subtle text */
--color-secondary-600: #1a545a  /* Card backgrounds */
--color-secondary-700: #004147  /* Section backgrounds */
--color-secondary-800: #002124  /* Dark backgrounds */
--color-secondary-900: #000000  /* Deepest backgrounds */

/* Accent (Warm orange) */
--color-accent-300: #fdba74     /* Warning states */
--color-accent-400: #fb923c     /* Hover accents */
--color-accent-500: #f97316     /* Accent buttons */
```

### Typography

- **Primary Font**: Poppins (body text, UI elements)
- **Display Font**: Space Grotesk Variable (headings, brand elements)

## 📝 Content Management

### Adding/Editing Homepage Sections

The homepage consists of several key sections that can be easily modified:

#### 1. Hero Section (`src/routes/+page.svelte`)
```svelte
<h1 class="font-grotesk text-secondary-50 mb-4 text-6xl leading-tight font-medium">
  Your main headline here
</h1>
<p class="max-w-lg text-lg">
  Your description text here
</p>
```

#### 2. Approach Section (`src/components/Aanpak.svelte`)
- **Section ID**: `aanpak` (for navigation)
- **Purpose**: Explain your methodology
- **Navigation**: Linked from Header "Aanpak"

#### 3. Mission Section (`src/components/Goals.svelte`)
- **Section ID**: `missie` (for navigation)
- **Purpose**: Company goals and objectives
- **Navigation**: Linked from Header "Missie"
- **Data Structure**:
  ```typescript
  interface Objective {
    icon: typeof Globe;
    title: string;
    description: string;
  }
  ```

#### 4. Cases Section (`src/components/Bewijs.svelte`)
- **Section ID**: `cases` (for navigation)
- **Purpose**: Showcase projects and case studies
- **Navigation**: Linked from Header "Cases"

### Navigation Management

The main navigation is controlled in `src/components/Header.svelte`:

```typescript
const links = [
  { href: '/', name: 'Home', id: null },
  { href: '/#aanpak', name: 'Aanpak', id: 'aanpak' },
  { href: '/#missie', name: 'Missie', id: 'missie' },
  { href: '/#cases', name: 'Cases', id: 'cases' },
  { href: '/about', name: 'Over ons', id: null }
];
```

**To add a new section**:
1. Create the component with a unique `id` attribute
2. Add it to the homepage in `src/routes/+page.svelte`
3. Update the `links` array in `Header.svelte`
4. Update the Intersection Observer selector in Header.svelte

### Adding New Pages

1. **Create route directory**: `src/routes/your-page/`
2. **Add page component**: `src/routes/your-page/+page.svelte`
3. **Update navigation**: Add to `links` array in `Header.svelte`

Example:
```svelte
<!-- src/routes/services/+page.svelte -->
<script lang="ts">
  // Your page logic
</script>

<div class="wrapper">
  <h1>Services Page</h1>
  <!-- Your page content -->
</div>
```

## 🎯 Key Features

### Smooth Scrolling Navigation
- Automatic active section highlighting using Intersection Observer
- Smooth scroll behavior for anchor links
- Mobile-responsive navigation with slide-out menu

### Error Handling
- Custom 404/500 error pages with consistent design
- Catch-all route for undefined paths
- User-friendly error messages in Dutch

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Adaptive navigation for mobile/desktop
- Optimized images and assets

### Performance
- Svelte 5 with modern runes for optimal reactivity
- Static generation with SvelteKit
- Optimized font loading and CSS

## 🐳 Deployment

### Docker Deployment

The application includes Docker configuration for production deployment:

```bash
# Build Docker image
docker build -t tandem-web-app .

# Run container
docker run -p 3000:3000 tandem-web-app
```

### Docker Compose

```bash
# Development
docker-compose -f dev.compose.yml up

# Production
docker-compose -f compose.yml up
```

## 🧪 Testing

### E2E Testing with Playwright

```bash
# Run all tests
pnpm run test:e2e

# Run tests in UI mode
pnpm exec playwright test --ui

# Generate test report
pnpm exec playwright show-report
```

## 🔧 Troubleshooting

### Common Issues

1. **Navigation not working**: Ensure section IDs match the `id` values in Header.svelte links
2. **Styles not applying**: Check that CSS custom properties are properly defined in app.css
3. **Build errors**: Run `pnpm run check` to identify TypeScript issues

### Development Tips

- Use `pnpm run check:watch` for continuous type checking
- Test responsive design using browser dev tools
- Verify smooth scrolling behavior across different browsers
- Check console for any Intersection Observer warnings

## 📄 License

WTFPL - Do What The Fuck You Want To Public License v2.0

See the [LICENSE](LICENSE) file for full details. In short: you can do whatever the fuck you want with this code! 🎉

---

For questions or support, contact the development team or create an issue in the project repository.
