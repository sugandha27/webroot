# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- GraphQL API support option
- Commit history timeline view
- Export visualization as SVG/PNG
- Dark mode theme refinements
- Advanced filtering and search
- Real-time updates via webhooks
- Mobile app version
- Monorepo support

## [1.0.0] - 2024-01-15

### Added
- Initial release of GitHub Contribution Sankey
- Interactive Sankey diagram visualization
- Multi-level hierarchy: User → Repos → Branches → PRs → Commits
- Status-based PR coloring (merged/open/closed)
- Status-matched commit dot colors
- Dynamic line weighting based on commit counts
- Rich hover tooltips showing:
  - PR title, date, and status
  - Repository last update date
  - Branch last commit date
  - Commit SHA and number of files changed
- Interactive commit dots with GitHub routing
- Light and dark theme support
- Responsive design for various screen sizes
- GitHub token support for higher API rate limits
- Comprehensive error handling and rate limiting
- TypeScript type definitions
- Webpack bundled and minified builds
- Full API documentation
- Example HTML file
- GitHub Pages deployment guide
- Development guide
- Contributing guidelines

### Features
- `GitHubContributionSankey` main class
- `GitHubAPI` class for GitHub API interactions
- Type-safe TypeScript interfaces
- Async data fetching with proper error handling
- Session storage for caching
- Local storage for token persistence
- Configurable organization filtering
- URL parameter support for pre-filling values
- Multiple instance support on same page

### Documentation
- README.md with comprehensive guide
- DEVELOPMENT.md with architecture details
- CONTRIBUTING.md with contribution guidelines
- GITHUB-PAGES.md with deployment instructions
- example.html demonstrating usage
- Inline JSDoc comments in source code
- API documentation with examples

### Project Files
- package.json with proper npm configuration
- webpack.config.js for bundling
- tsconfig.json for TypeScript compilation
- .gitignore for source control
- LICENSE (MIT) for open source

## Contribution History

### Initial Development Phase
- Created main visualization component
- Implemented GitHub API integration
- Built SVG Sankey diagram renderer
- Added interactive tooltip system
- Integrated status-based coloring
- Created TypeScript type definitions

### Enhancement Phase
- Added dynamic line weighting
- Implemented commit detail fetching
- Added branch and repo metadata
- Created example implementations
- Built comprehensive documentation

### Package Phase
- Extracted to reusable npm package
- Created webpack build configuration
- Added TypeScript support
- Wrote development guides
- Prepared for npm publishing

## Known Issues

- Rate limiting without token may occur with high activity users
- Very large PR counts (1000+) may have performance impact
- GitHub API search has 120-second cache on server side
- Requires public_repo scope for GitHub token

## Migration Guide

No migrations needed for v1.0.0 (initial release).

## Performance Notes

- Typical load time: 2-5 seconds for 50 PRs
- API calls: ~10-15 requests per visualization
- Bundle size: ~25KB minified + gzipped
- Browser memory: ~5-10MB per visualization

## Future Versions

### 2.0.0 (Planned)
- GraphQL API support
- Advanced caching strategies
- Service Worker support
- Offline mode
- Export functionality

### 3.0.0 (Planned)
- Mobile native apps
- Real-time webhooks
- Collaboration features
- Analytics dashboard
- Team reporting

## Version Support

| Version | Status | Released | End of Life |
|---------|--------|----------|-------------|
| 1.0.x | Active | Jan 2024 | Jan 2025 |
| 2.0.x | Planned | Q2 2024 | Q2 2025 |
| 3.0.x | Planned | Q4 2024 | Q4 2025 |

## Links

- [GitHub Repository](https://github.com/ModelEarth/webroot)
- [npm Package](https://www.npmjs.com/package/github-contribution-sankey)
- [Issues](https://github.com/ModelEarth/webroot/issues)
- [Discussions](https://github.com/ModelEarth/webroot/discussions)

## Credits

**Created by:** ModelEarth Team  
**License:** MIT  
**Based on:** GitHub REST API v3

---

**Note:** Version numbering starts at 1.0.0 following npm best practices. Pre-release versions may be published with tags like `1.0.0-beta.1`.
