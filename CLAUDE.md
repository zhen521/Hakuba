# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hakuba is a fast static blog starter built with SvelteKit that reads data from GitHub Discussions. It fetches content via GitHub GraphQL API and renders static blog pages.

## Architecture

### Data Flow

1. **Build-time data fetching**: `.scripts/pre/index.ts` runs before build to fetch GitHub Discussions
   - Fetches user info and all discussions from GitHub GraphQL API
   - Filters discussions into config, posts, and pages
   - Writes posts to `src/routes/post/_source/[number].md`
   - Writes pages to `src/routes/_page/[title].md`
   - Generates environment variables to `.env`
2. **SvelteKit build**: Uses `@sveltejs/adapter-static` to generate static files in `build/`
3. **Post-build**: `.scripts/post/index.ts` runs after build (sitemap generation)

### Content Categories (GitHub Discussions)

- **Config**: Discussion with title `index` in `CONFIG_CATEGORY` (default: "Config") for blog configuration
- **Post**: Regular blog posts in `POST_CATEGORY` (default: "Post")
- **Page**: Static pages in `PAGE_CATEGORY` (default: "Page")

### Key Directories

- `src/routes/`: SvelteKit routes
  - `post/_source/`: Generated markdown posts (gitignored)
  - `_page/`: Generated markdown pages (gitignored)
- `src/lib/components/`: Svelte components
- `src/lib/helper/`: Utility functions for fetching posts/pages
- `.scripts/pre/`: Build-time data fetching scripts
- `.scripts/post/`: Post-build scripts
- `static/`: Static assets

### Configuration

Environment variables (defined in `.env` or system env):

- `GITHUB_TOKEN`: Required, GitHub personal access token with `public_repo` or `repo` scope
- `REPOSITORY`: Required, target repository name
- `CONFIG_CATEGORY`, `POST_CATEGORY`, `PAGE_CATEGORY`: Category names
- `BLOG_NAME`, `BIO`, `EMAIL`, `TWITTER`, `DOMAIN`, `DESCRIPTION`, `KEYWORDS`: Blog metadata
- `PAGE_SIZE`, `LANGUAGE`, `TIMEZONE`, `COMMENT`: Blog settings

## Common Commands

```bash
# Development
npm run dev              # Start development server

# Build
npm run build           # Full build: fetch data + build + post scripts
npm run generateData    # Only fetch data from GitHub Discussions
npm run preview         # Preview production build

# Code quality
npm run lint            # Run prettier and eslint checks
npm run format          # Format code with prettier
npm run check           # Type-check with svelte-check
npm run check:watch     # Type-check in watch mode

# Bundle analysis
npm run report          # Build with bundle analyzer
```

## Tech Stack

- **Framework**: SvelteKit with static adapter
- **Node.js**: >=22
- **Language**: TypeScript (using `tsx` for scripts)
- **Styling**: Tailwind CSS + Typography plugin
- **Markdown**: mdsvex with rehype plugins (slug, autolink headings, external links)
- **Package Manager**: yarn (lockfile present)

## Important Notes

- Uses `mdsvex` for Markdown processing with Svelte components support
- Indenting 4 spaces does NOT create code blocks (mdsvex limitation)
- All posts/pages must use front matter for metadata
- The `build/` directory is the output for deployment
- Supports webhooks for automatic rebuilds when discussions change
