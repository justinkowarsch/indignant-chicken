# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus-based blog website called "theSludge.report" that appears to be a technical blog with field notes and articles. The site is configured as a blog-only setup (no docs section) and uses a custom rating system for content.

## Development Commands

### Installation
```bash
npm install
```

### Local Development
```bash
npm run start
```
Starts development server with hot reload at http://localhost:3000

### Build
```bash
npm run build
```
Generates static content into the `build` directory

### TypeScript Type Checking
```bash
npm run typecheck
```
Runs TypeScript compiler to check for type errors

### Content Generation
```bash
npm run tsr g fn "Post Title"
```
Creates a new field note blog post using the custom generator script

### Deployment
```bash
npm run deploy
```
Deploys to GitHub Pages (configured for user `justinkowarsch`)

## Architecture

### Content Structure
- **Blog posts**: Located in `/blog/` directory using MDX format
- **Field notes**: Special blog post type with `fn` tag, created via generator script
- **Authors**: Configured in `/blog/authors.yml`
- **Tags**: Configured in `/blog/tags.yml`

### Custom Components
- **Rating System**: Global context provider for content rating ("explicit" vs "pg")
  - `RatingContext.tsx`: Context provider for rating state
  - `RatingSelector.tsx`, `RatingSwitcher.tsx`: UI components for rating selection
  - `PronunciationSwitcher.tsx`: Additional UI component
- **Theme Override**: Custom Root component wraps the entire app with RatingProvider

### Configuration
- **Docusaurus config**: `docusaurus.config.ts` - main site configuration
- **Theme**: Uses classic preset with custom CSS and Mermaid support
- **Deployment**: Configured for GitHub Pages deployment to `gh-pages` branch
- **Tailwind CSS**: Integrated via custom Docusaurus plugin with dark mode support

### File Generation
- **Generator script**: `generate.js` creates new field note posts with proper frontmatter
- **Command alias**: `tsr` script command for generating content

### Tailwind CSS Integration
- **Plugin**: `src/plugins/tailwind-plugin.js` - Custom Docusaurus plugin for Tailwind CSS
- **Config**: `tailwind.config.js` - Configured for Docusaurus dark mode detection using `[data-theme="dark"]`
- **Styles**: `src/css/custom.css` - Includes Tailwind directives and custom CSS variables
- **Dark Mode**: Full dark mode support across all custom components

### Interactive Components
- **EmailSignup**: Newsletter signup with responsive design and status feedback
- **DietrichTipGenerator**: Animated security tip generator with smooth transitions
- **PasswordComplexityCalculator**: Sophisticated password analyzer with:
  - Real-time visual feedback on input strength
  - Staggered animation sequences for results
  - Dynamic color-coded borders and rings
  - Button loading states with emoji feedback
  - Checkmark reveal animations with 100ms delays
- **SecurityMetricsDashboard**: Real-time metrics dashboard with live data updates

All components feature:
- Comprehensive dark mode support
- Smooth animations and micro-interactions
- Responsive design patterns
- Accessibility considerations

## Key Features
- Blog-only Docusaurus site (docs disabled)
- Custom rating system with React Context
- Field note generation via CLI
- Mermaid diagram support
- Custom reading time calculation
- RSS/Atom feeds enabled
- Tailwind CSS with sophisticated animations
- Full dark mode theme support