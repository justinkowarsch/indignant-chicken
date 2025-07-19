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

### Build Commands

#### Full Production Build (with PDFs)
```bash
npm run build
```
Generates PDFs first, then builds the site. Use for deployment and when PDF content has changed.

#### Fast Development Build (no PDFs)
```bash
npm run build:fast
```
Builds site only, skipping PDF generation. Use for quick builds when only blog content has changed.

#### PDF Generation Only
```bash
npm run build:pdf-only
# or
npm run generate-pdfs
```
Generates PDFs without building the site. Use when updating PDF content only.

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
Runs full build with PDF generation, then deploys to GitHub Pages. 

**Important**: Always use `npm run deploy` (not `docusaurus deploy` directly) to ensure PDFs are generated before deployment.

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

### PDF Document System
- **PDF Generation**: `@react-pdf/renderer` with build-time generation
  - Corporate document templates with authentic styling
  - Build script: `scripts/generatePdfs.js` - Flexible, data-driven PDF generation
  - Structured data files: `src/data/*.js` (e.g., `pifProcedureData.js`)
  - Configuration-based: Add new PDFs by updating `pdfConfigs` array
  - Integration: `npm run generate-pdfs && docusaurus build`
- **PDF Viewer**: `src/components/PdfViewer.tsx` - Custom viewer with `react-pdf`
  - Advanced zoom controls (50% to 300% range)
  - Default 125% scale for optimal readability
  - High z-index layering (`z-50`) for proper overlay behavior
  - Navigation controls for multi-page documents
  - Download functionality with professional styling
- **Content Strategy**: "Leaked document" approach
  - Blog posts focus on investigative narrative and commentary
  - All detailed procedure mechanics contained in generated PDFs
  - Enhanced shareability through official-looking document formatting

#### Adding New Leaked Documents
1. Create data file: `src/data/newDocumentData.js` with structured content
2. Add configuration to `scripts/generatePdfs.js` in `pdfConfigs` array:
   ```javascript
   {
     data: require('../src/data/newDocumentData.js').newDocumentData,
     filename: 'new-leaked-document.pdf',
     description: 'New Leaked Document'
   }
   ```
3. Run `npm run generate-pdfs` to build new PDF
4. Reference in blog post: `<PdfViewer pdfUrl="/pdf/new-leaked-document.pdf" />`

**⚠️ Deployment Warning**: Always use `npm run deploy` (not `docusaurus deploy`) to ensure PDFs are included in deployment.

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
- **PdfViewer**: Professional PDF viewing component with:
  - Zoom controls with intuitive 125% default
  - Proper z-index layering for overlay behavior
  - Mobile-responsive design with scroll handling
  - Integration with build-time PDF generation

All components feature:
- Comprehensive dark mode support
- Smooth animations and micro-interactions
- Responsive design patterns
- Accessibility considerations

## Troubleshooting

### Windows Development Environment
When working in Git Bash on Windows, some commands require specific syntax:

#### Finding and Killing Dev Server
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process by PID (use double slashes in Git Bash)
taskkill //PID <process_id> //F
```

#### Process Management
```bash
# List Node.js processes (if needed)
wmic process where "name='node.exe'" get processid,commandline
```

**Note**: Standard Unix-style commands like `taskkill /PID` will fail in Git Bash due to path interpretation. Always use `//` instead of `/` for Windows command flags.

#### Deployment
The deploy script uses Unix-style environment variables that work directly in Git Bash:
```bash
GIT_USER=justinkowarsch npx docusaurus deploy --skip-build
```
No additional environment variable packages are needed.

## Key Features
- Blog-only Docusaurus site (docs disabled)
- Custom rating system with React Context
- Field note generation via CLI
- Mermaid diagram support
- Custom reading time calculation
- RSS/Atom feeds enabled
- Tailwind CSS with sophisticated animations
- Full dark mode theme support
- **PDF Document System**: Build-time PDF generation with embedded viewer
- **"Leaked Document" Content Strategy**: Official-looking PDFs for enhanced shareability