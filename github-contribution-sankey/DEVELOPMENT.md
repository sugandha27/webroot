# Development Guide

## Project Overview

GitHub Contribution Sankey is an npm package that visualizes GitHub contributions as an interactive Sankey diagram. The project is built with TypeScript, Webpack, and the GitHub REST API.

## Architecture

### Components

```
GitHubContributionSankey (Main Class)
├── GitHubAPI (API Client)
├── Renderer (SVG/HTML Generation)
├── DataProcessor (Transform API data)
└── EventHandler (User interactions)
```

### Data Flow

```
1. User initiates render()
   ↓
2. Fetch PRs via GitHub API (GitHubAPI.searchUserPRs)
   ↓
3. Enrich PR data with commits, branches
   ↓
4. Transform data into tree structure (DataProcessor)
   ↓
5. Generate SVG Sankey diagram (Renderer)
   ↓
6. Attach event listeners
   ↓
7. Async load commit details for tooltips
```

## Key Files

### `src/index.ts`

Main component class. Responsibilities:
- Manage component lifecycle (init, render, refresh)
- Coordinate between API, data processing, and rendering
- Handle user configuration

Key methods:
- `constructor(options)` - Initialize with user config
- `render()` - Fetch data and render diagram
- `enrichPRData()` - Add commit/branch data to PRs
- `generateSankeyHTML()` - Create HTML structure

### `src/github-api.ts`

GitHub API wrapper. Responsibilities:
- Authenticate and handle API calls
- Rate limiting and batching
- Parse and format API responses

Key methods:
- `searchUserPRs(username, org)` - Find user's PRs
- `getPRDetails(owner, repo, prNumber)` - Get PR info
- `getPRCommits()` - Get commits in a PR
- `getCommitDetails()` - Get full commit info with file changes

### `src/types.ts`

TypeScript type definitions for:
- API responses (PullRequest, Commit, Repository)
- Component configuration (GitHubSankeyConfig)
- Internal data structures (TreeNode, SankeyLink)
- Theme configuration

## Development Workflow

### 1. Setup

```bash
npm install
npm run dev
```

This starts webpack in watch mode at `localhost:8080`.

### 2. Making Changes

Edit source files in `src/`:
- TypeScript changes trigger automatic rebuild
- Webpack hot module reloading for CSS
- Check console for errors

### 3. Testing

```bash
npm test
```

Write tests in `__tests__` directory with `.test.ts` extension.

### 4. Building for Production

```bash
npm run build
```

Creates minified bundle in `dist/`:
- `github-contribution-sankey.js` - Development build
- `github-contribution-sankey.min.js` - Production build

## Common Tasks

### Adding a New Feature

1. **Define types** in `src/types.ts`
2. **Add API method** to `GitHubAPI` if needed
3. **Implement logic** in main component
4. **Update rendering** if UI changes needed
5. **Write tests** in `__tests__/`
6. **Update documentation** in README.md
7. **Update CHANGELOG** if it's a significant feature

### Modifying API Calls

1. Add/update method in `src/github-api.ts`
2. Update rate limiting if needed
3. Handle errors appropriately
4. Add TypeScript types for responses
5. Test with different users/orgs

### Styling Changes

1. Maintain color variables for theming
2. Use CSS classes for components
3. Support both light and dark themes
4. Test responsive behavior
5. Ensure accessibility

## Testing

### Unit Tests

```typescript
// Example test
import GitHubAPI from '../src/github-api';

describe('GitHubAPI', () => {
  let api: GitHubAPI;

  beforeEach(() => {
    api = new GitHubAPI('test_token');
  });

  test('should fetch user PRs', async () => {
    const prs = await api.searchUserPRs('octocat', 'github');
    expect(prs).toBeInstanceOf(Array);
    expect(prs.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests

Test full user flows like:
- Load visualization with username
- Handle API errors gracefully
- Rate limiting behavior
- Multiple visualizations on same page

## Performance Optimization

### Current Optimizations

1. **Batched API Requests** - Group requests with delays to avoid rate limits
2. **Lazy Loading** - Commits load asynchronously after initial render
3. **Session Caching** - Branch data cached in session storage
4. **SVG Rendering** - Efficient vector graphics vs canvas

### Future Optimizations

1. IndexedDB for persistent caching
2. Virtual scrolling for large lists
3. Web Workers for data processing
4. Service Worker for offline support

## Debugging

### Browser DevTools

```javascript
// Access component instance in console
window.gcsankey = sankey; // if stored globally

// Trigger render manually
await window.gcsankey.render();

// Check rate limit
console.log(window.gcsankey.api.getRateLimitStatus());
```

### Logging

Add debug logs in development:

```typescript
if (process.env.DEBUG) {
  console.log('Debug info:', data);
}
```

### Common Issues

**Issue: "Cannot read properties of undefined"**
- Check that container element exists
- Verify GitHub API returned data
- Check TypeScript types

**Issue: "API rate limit exceeded"**
- Increase delay between API calls
- Add GitHub token for higher limits
- Implement caching

**Issue: "SVG paths not rendering"**
- Verify SVG container exists
- Check window.innerWidth/innerHeight
- Test on different browsers

## Building for npm

### Before Publishing

1. Update version in `package.json`
2. Build production bundle: `npm run build`
3. Run tests: `npm test`
4. Update CHANGELOG.md
5. Commit and tag: `git tag v1.0.0`

### Publishing

```bash
npm login
npm publish
```

### Updating Published Package

```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Publish
npm publish

# Tag in git
git push origin v1.0.1
```

## Dependencies

### Core
- **TypeScript** - Type safety and modern syntax
- **Webpack** - Module bundling
- **Babel** - JavaScript transpilation

### Development
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, use:
- Babel polyfills
- IE 11 specific builds if needed

## Environment Variables

```bash
# .env (for local development)
DEBUG=true
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
API_ENDPOINT=https://api.github.com
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

## Resources

- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Webpack Documentation](https://webpack.js.org/)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)

## Support

For questions or issues:
1. Check existing GitHub issues
2. Create new issue with details
3. Join GitHub Discussions
4. Contact maintainers

## Future Roadmap

- [ ] GraphQL API support
- [ ] Commit history timeline
- [ ] Export visualization as image
- [ ] Dark mode theme
- [ ] Custom color palettes
- [ ] Mobile app version
- [ ] Real-time updates via webhooks
- [ ] Advanced filtering and search

---

Last Updated: 2024
Maintainers: ModelEarth Team
