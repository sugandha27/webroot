# Quick Start Guide

Get up and running with GitHub Contribution Sankey in minutes!

## 🎯 Installation

### Via npm

```bash
npm install github-contribution-sankey
```

### Via CDN (when published)

```html
<script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>
```

## 📝 Basic Usage

### HTML + JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>My GitHub Contributions</title>
  <style>
    body { font-family: system-ui, sans-serif; }
    #container { max-width: 1400px; margin: 0 auto; padding: 20px; }
  </style>
</head>
<body>
  <h1>🐙 My GitHub Contributions</h1>
  <div id="container"></div>

  <script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>
  <script>
    const viz = new GitHubContributionSankey({
      username: 'octocat',
      container: '#container',
      organization: 'github'
    });
    
    viz.render();
  </script>
</body>
</html>
```

### TypeScript + Bundler

```typescript
import GitHubContributionSankey from 'github-contribution-sankey';

const viz = new GitHubContributionSankey({
  username: 'octocat',
  container: document.getElementById('app'),
  organization: 'github',
  theme: 'dark'
});

await viz.render();
```

## ⚙️ Configuration

### Minimal Config

```typescript
new GitHubContributionSankey({
  username: 'your-username',
  container: '#app'
});
```

### Full Config

```typescript
new GitHubContributionSankey({
  username: 'your-username',           // Required
  container: '#app',                   // Required (element or selector)
  token: 'ghp_xxxxxxxxxxxx',          // Optional (for higher limits)
  organization: 'your-org',            // Optional (default: ModelEarth)
  theme: 'light',                      // Optional (light/dark)
  maxWidth: 1400,                      // Optional (in pixels)
  onLoad: () => console.log('Ready'),  // Optional callback
  onError: (e) => console.error(e)     // Optional error handler
});
```

## 🔑 Getting a GitHub Token

For higher rate limits (5,000/hour instead of 60/hour):

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select `public_repo` scope
4. Copy the token
5. Pass to the component:

```typescript
const viz = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  token: 'ghp_your_token_here'
});
```

## 🌐 Themes

### Light Theme (Default)

```typescript
new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  theme: 'light'
});
```

### Dark Theme

```typescript
new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  theme: 'dark'
});
```

## 🔄 Handling Errors

```typescript
const viz = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  onError: (error) => {
    console.error('Visualization failed:', error.message);
    // Show fallback UI
  }
});

try {
  await viz.render();
} catch (error) {
  // Handle error
}
```

## 📱 Responsive Container

```html
<!-- Mobile-friendly -->
<div id="app" style="
  max-width: 100%;
  overflow-x: auto;
"></div>
```

```typescript
const viz = new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  maxWidth: 1400
});
```

## 🚀 GitHub Pages

Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Contributions</title>
</head>
<body>
  <div id="app"></div>
  
  <script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>
  <script>
    new GitHubContributionSankey({
      username: 'your-username',
      container: '#app'
    }).render();
  </script>
</body>
</html>
```

Push to `your-username.github.io` repo and GitHub Pages does the rest!

## 📊 Example: Interactive Dashboard

```html
<!DOCTYPE html>
<html>
<head>
  <title>GitHub Contributions</title>
  <style>
    #controls { padding: 20px; background: #f5f5f5; }
    #app { padding: 20px; }
    input, button { padding: 10px; margin-right: 10px; }
    button { background: #0366d6; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <div id="controls">
    <input id="username" placeholder="GitHub username" value="octocat">
    <button onclick="load()">Load</button>
  </div>
  
  <div id="app"></div>

  <script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>
  <script>
    let viz;
    
    async function load() {
      const username = document.getElementById('username').value;
      document.getElementById('app').innerHTML = 'Loading...';
      
      viz = new GitHubContributionSankey({
        username,
        container: '#app',
        onError: (e) => {
          document.getElementById('app').innerHTML = `Error: ${e.message}`;
        }
      });
      
      await viz.render();
    }
    
    // Load on Enter
    document.getElementById('username').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') load();
    });
  </script>
</body>
</html>
```

## 🎨 Styling

The component is self-contained. Customize with CSS:

```html
<style>
  /* Override default styles */
  .sankey-container {
    font-family: 'Your Font', sans-serif;
  }
</style>
```

## 🐛 Troubleshooting

### "Cannot find GitHubContributionSankey"
- Verify script tag is loaded
- Check console for network errors
- Try updating package version

### "Rate limit exceeded"
- Add a GitHub token
- Wait 1 hour for reset
- Reduce data fetching frequency

### No data displayed
- Verify username is correct
- Check that user has PRs in organization
- Open DevTools Console for errors

## 📚 Learn More

- **Full Docs**: See [README.md](./README.md)
- **API Reference**: See [README.md](./README.md#api)
- **Deployment**: See [GITHUB-PAGES.md](./GITHUB-PAGES.md)
- **Development**: See [DEVELOPMENT.md](./DEVELOPMENT.md)

## 💡 Tips & Tricks

### Tip 1: Pre-fill from URL

```typescript
const params = new URLSearchParams(location.search);
const username = params.get('user') || 'octocat';

new GitHubContributionSankey({
  username,
  container: '#app'
}).render();
```

Then share: `https://yoursite.com/?user=torvalds`

### Tip 2: Multiple Users

```typescript
const users = ['octocat', 'linus', 'torvalds'];

users.forEach(user => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  new GitHubContributionSankey({
    username: user,
    container
  }).render();
});
```

### Tip 3: Cache Token

```javascript
const token = localStorage.getItem('github_token') || prompt('GitHub Token:');
if (token) localStorage.setItem('github_token', token);

new GitHubContributionSankey({
  username: 'octocat',
  container: '#app',
  token
}).render();
```

## 🆘 Getting Help

1. Check [README.md](./README.md) for detailed docs
2. Review [example.html](./example.html) for implementation
3. Check [GitHub Issues](https://github.com/ModelEarth/webroot/issues)
4. Open a new issue with details

## 📦 What's Next?

1. ✅ Install the package
2. ✅ Try the basic example
3. ✅ Customize for your needs
4. ✅ Deploy to GitHub Pages
5. ✅ Share with others!

---

**Happy visualizing! 🚀**
