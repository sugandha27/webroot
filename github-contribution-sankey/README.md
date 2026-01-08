# GitHub Contribution Sankey

A beautiful, interactive npm package for visualizing GitHub contributions as a Sankey diagram. Display your GitHub activity with a professional, hierarchical visualization showing repositories, branches, pull requests, and commits.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## Features

- 🎨 **Interactive Sankey Diagram** - Beautiful hierarchical visualization of GitHub contributions
- 📊 **Multi-level Hierarchy** - User → Repositories → Branches → Pull Requests → Commits
- 🎯 **Status-based Coloring** - Different colors for merged, open, and closed PRs
- 🔗 **Dynamic Line Weighting** - PR connector thickness based on commit count
- 💬 **Rich Tooltips** - Hover information for repos, branches, PRs, and commits
- ⚡ **Async Data Loading** - Non-blocking GitHub API calls with rate limiting
- 🎭 **Light/Dark Themes** - Professional color schemes with customization
- 📱 **Responsive Design** - Adapts to different screen sizes
- 🔐 **Token Support** - Optional GitHub token for higher rate limits
- 🚀 **TypeScript Ready** - Full type definitions included
- 📦 **Production Ready** - Webpack bundled and minified

## Installation

```bash
npm install github-contribution-sankey
```

Or with yarn:

```bash
yarn add github-contribution-sankey
```

## Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/sankey.css">
</head>
<body>
  <div id="sankey-container"></div>

  <script src="node_modules/github-contribution-sankey/dist/github-contribution-sankey.min.js"></script>
  <script>
    const sankey = new GitHubContributionSankey({
      username: 'octocat',
      container: '#sankey-container',
      organization: 'github'
    });

    sankey.render();
  </script>
</body>
</html>
```

### TypeScript Usage

```typescript
import GitHubContributionSankey from 'github-contribution-sankey';

const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: document.getElementById('app'),
  organization: 'github',
  theme: 'dark'
});

await sankey.render();
```

## Configuration

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `username` | `string` | required | GitHub username to visualize |
| `container` | `string \| HTMLElement` | required | DOM element or selector to mount |
| `token` | `string` | undefined | GitHub API token (optional, for higher rate limits) |
| `organization` | `string` | `'ModelEarth'` | GitHub organization to filter PRs |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme for the visualization |
| `maxWidth` | `number` | `1400` | Maximum width in pixels |
| `onLoad` | `() => void` | undefined | Callback when data finishes loading |
| `onError` | `(error: Error) => void` | undefined | Callback on error |

### Example with All Options

```typescript
const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#visualization',
  token: 'ghp_xxxxxxxxxxxx', // Your GitHub PAT
  organization: 'github',
  theme: 'dark',
  maxWidth: 1600,
  onLoad: () => console.log('Visualization loaded!'),
  onError: (error) => console.error('Failed to load:', error)
});

await sankey.render();
```

## API

### Methods

#### `render(): Promise<void>`

Fetches GitHub data and renders the Sankey diagram.

```typescript
await sankey.render();
```

#### `setToken(token: string): void`

Set or update the GitHub API token at runtime.

```typescript
sankey.setToken('ghp_xxxxxxxxxxxx');
```

#### `refresh(): Promise<void>`

Refresh the visualization with latest data.

```typescript
await sankey.refresh();
```

## GitHub API Token

For higher rate limits and private repository access, provide a Personal Access Token (PAT):

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select `public_repo` scope (or `repo` for private repos)
4. Copy the token
5. Pass it to the component:

```typescript
const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  token: 'ghp_your_token_here'
});
```

**Rate Limits:**
- Without token: 60 requests/hour
- With token: 5,000 requests/hour

## Data Structure

The visualization shows:

```
Your Username (Root)
├── Repository 1
│   ├── Branch 1
│   │   ├── PR #123 (merged)
│   │   │   ├── Commit SHA (file changes)
│   │   │   └── Commit SHA (file changes)
│   │   └── PR #124 (open)
│   └── Branch 2
│       └── PR #125 (closed)
└── Repository 2
    └── ...
```

## Color Scheme

### Light Theme (Default)

| Element | Color | Hex |
|---------|-------|-----|
| User/Root | Dark Charcoal | #2c3e50 |
| Repository | Slate Gray | #5a6c7d |
| Branch | Teal | #16a085 |
| PR (Open) | Green | #1e8449 |
| PR (Merged) | Purple | #6f42c1 |
| PR (Closed) | Red | #c0392b |
| Commit (Open) | Amber | #e67e22 |
| Commit (Merged) | Purple | #6f42c1 |
| Commit (Closed) | Grey | #95a5a6 |

### Dark Theme

Dark theme with adjusted contrast for better readability on dark backgrounds.

## Styling

The component uses CSS custom properties for theming. Override them in your CSS:

```css
:root {
  --sankey-color-root: #2c3e50;
  --sankey-color-repo: #5a6c7d;
  --sankey-color-branch: #16a085;
  --sankey-color-pr-open: #1e8449;
  --sankey-color-pr-merged: #6f42c1;
  --sankey-color-pr-closed: #c0392b;
  --sankey-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## Examples

### Multiple Visualizations

```typescript
// User 1's contributions in GitHub org
const sankey1 = new GitHubContributionSankey({
  username: 'octocat',
  container: '#user1-viz',
  organization: 'github'
});

// User 2's contributions in different org
const sankey2 = new GitHubContributionSankey({
  username: 'torvalds',
  container: '#user2-viz',
  organization: 'torvalds'
});

Promise.all([sankey1.render(), sankey2.render()]);
```

### With Error Handling

```typescript
const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  onLoad: () => {
    console.log('✅ Visualization loaded successfully');
  },
  onError: (error) => {
    console.error('❌ Failed to load visualization:', error.message);
    // Show fallback UI or error message to user
  }
});

try {
  await sankey.render();
} catch (error) {
  console.error('Error:', error);
}
```

### Dynamic Updates

```typescript
const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app'
});

await sankey.render();

// Update user after some action
document.getElementById('user-select').addEventListener('change', async (e) => {
  sankey.options.username = e.target.value;
  await sankey.refresh();
});
```

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Edge | ✅ Latest 2 versions |
| IE 11 | ⚠️ Requires polyfills |

## Performance

The component is optimized for performance:

- **Batched API requests** - Prevents rate limiting with intelligent delays
- **Async data loading** - Non-blocking UI updates
- **SVG rendering** - Efficient vector graphics
- **Lazy loading** - Commits load asynchronously after render
- **Caching** - Branch data cached in session storage

## Troubleshooting

### Rate Limit Exceeded

**Problem**: "API rate limit exceeded"

**Solution**: Provide a GitHub token:

```typescript
const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  token: 'ghp_your_token'
});
```

### No Data Displayed

**Problem**: Container appears empty

**Solution**: 
1. Verify username is correct
2. Check browser console for errors
3. Ensure organization name is correct
4. Verify GitHub API is accessible

```typescript
const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  onError: (error) => console.error('Error:', error)
});
```

### CORS Issues

**Problem**: "Access to fetch at 'https://api.github.com' from origin... blocked by CORS policy"

**Solution**: This typically indicates GitHub API accessibility issue. The plugin uses GitHub's public API which should be CORS-enabled. Try:

1. Check your internet connection
2. Verify GitHub is not down
3. Try with a GitHub token

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/ModelEarth/github-contribution-sankey.git
cd github-contribution-sankey

# Install dependencies
npm install

# Build
npm run build

# Development mode with watch
npm run dev

# Run tests
npm test
```

### Project Structure

```
├── src/
│   ├── index.ts           # Main component
│   ├── types.ts           # TypeScript definitions
│   ├── github-api.ts      # GitHub API wrapper
│   └── styles.ts          # CSS styles
├── dist/                  # Compiled output
├── webpack.config.js      # Webpack configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Package configuration
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions:

- 📝 [Open an issue](https://github.com/ModelEarth/webroot/issues)
- 💬 [GitHub Discussions](https://github.com/ModelEarth/webroot/discussions)
- 📧 Email: support@modelearth.org

## Changelog

### v1.0.0 (Initial Release)

- ✨ Initial release
- 🎨 Beautiful Sankey diagram visualization
- 📊 Multi-level hierarchy support
- 🎯 Status-based PR coloring
- 💬 Rich tooltip system
- ⚡ Async data loading
- 🔐 GitHub token support
- 🚀 Production-ready

## Acknowledgments

Built with ❤️ by [ModelEarth](https://modelearth.org)

Special thanks to:
- [GitHub API](https://docs.github.com/en/rest)
- The open source community
