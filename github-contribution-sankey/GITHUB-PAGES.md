# GitHub Pages Deployment Guide

This guide explains how to deploy the GitHub Contribution Sankey visualization to GitHub Pages.

## Overview

You have two options:

1. **Direct Hosting** - Host a single page showing one user's contributions
2. **Multi-User Dashboard** - Create a dashboard where users can enter their GitHub username

## Option 1: Direct Hosting (Single User)

### Setup

1. Create a repository for GitHub Pages hosting (or use existing one):

```bash
# If starting fresh
git clone https://github.com/your-username/your-username.github.io
cd your-username.github.io
```

2. Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My GitHub Contributions</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    #container { max-width: 1400px; margin: 0 auto; padding: 20px; }
  </style>
</head>
<body>
  <div id="container"></div>

  <!-- Import from CDN or local file -->
  <script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>
  
  <script>
    const sankey = new GitHubContributionSankey({
      username: 'your-github-username', // Change this
      container: '#container',
      organization: 'your-org-name',    // Change this
      token: localStorage.getItem('gh_token') // Optional
    });

    sankey.render().catch(error => {
      document.getElementById('container').innerHTML = 
        `<p style="color: red;">Error loading visualization: ${error.message}</p>`;
    });
  </script>
</body>
</html>
```

3. Push to GitHub:

```bash
git add index.html
git commit -m "Add GitHub Contribution Sankey visualization"
git push origin main
```

4. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select `main` branch as source
   - Click Save

5. Visit `https://your-username.github.io` in a few minutes

## Option 2: Multi-User Dashboard

### Setup

1. Create the dashboard HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Contributions Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      background: white;
      border-radius: 12px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .header h1 {
      font-size: 2.5em;
      color: #2c3e50;
      margin-bottom: 10px;
    }

    .header p {
      font-size: 1.1em;
      color: #7f8c8d;
      margin-bottom: 30px;
    }

    .search-box {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .search-box input,
    .search-box button,
    .search-box select {
      padding: 12px 20px;
      border: 2px solid #ecf0f1;
      border-radius: 6px;
      font-size: 1em;
      font-family: inherit;
    }

    .search-box input {
      min-width: 250px;
    }

    .search-box button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s;
    }

    .search-box button:hover {
      transform: translateY(-2px);
    }

    .visualization {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      min-height: 600px;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 600px;
      color: #7f8c8d;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #ecf0f1;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .footer {
      text-align: center;
      color: white;
      margin-top: 40px;
      padding: 20px;
    }

    .footer a {
      color: #ecf0f1;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 GitHub Contributions Visualizer</h1>
      <p>Explore your GitHub contributions with an interactive Sankey diagram</p>

      <div class="search-box">
        <input
          type="text"
          id="username"
          placeholder="Enter GitHub username"
          value=""
        >
        <input
          type="text"
          id="organization"
          placeholder="Organization (optional)"
          value="github"
        >
        <select id="theme">
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
        <button onclick="loadVisualization()">Load</button>
      </div>
    </div>

    <div class="visualization">
      <div id="sankey-container" class="loading">
        <p>Enter a username and click "Load" to get started</p>
      </div>
    </div>

    <div class="footer">
      <p>
        GitHub Contributions Visualizer |
        <a href="https://github.com" target="_blank">GitHub</a> |
        Powered by <a href="https://www.npmjs.com/package/github-contribution-sankey" target="_blank">github-contribution-sankey</a>
      </p>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>

  <script>
    let currentSankey = null;

    window.loadVisualization = async function() {
      const username = document.getElementById('username').value.trim();
      const organization = document.getElementById('organization').value.trim() || 'github';
      const theme = document.getElementById('theme').value;

      if (!username) {
        alert('Please enter a GitHub username');
        return;
      }

      const container = document.getElementById('sankey-container');
      container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading...</p></div>';

      try {
        currentSankey = new GitHubContributionSankey({
          username,
          container,
          organization,
          theme,
          onLoad: () => {
            console.log('✅ Visualization loaded');
          },
          onError: (error) => {
            console.error('❌ Error:', error);
            container.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Error: ${error.message}</p>`;
          }
        });

        await currentSankey.render();

      } catch (error) {
        container.innerHTML = `<p style="color: red; text-align: center; padding: 40px;">Error: ${error.message}</p>`;
      }
    };

    // Allow Enter key to load
    document.getElementById('username').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') loadVisualization();
    });

    // Load from URL parameter if provided
    const params = new URLSearchParams(window.location.search);
    if (params.has('user')) {
      document.getElementById('username').value = params.get('user');
      if (params.has('org')) {
        document.getElementById('organization').value = params.get('org');
      }
      loadVisualization();
    }
  </script>
</body>
</html>
```

2. Push to GitHub:

```bash
git add index.html
git commit -m "Add interactive GitHub Contributions Dashboard"
git push origin main
```

3. Enable GitHub Pages and access your dashboard

## URL Parameters (Optional)

You can share links with pre-filled values:

```
https://your-username.github.io/?user=octocat&org=github
```

Parameters:
- `user` - GitHub username (required)
- `org` - Organization name (optional, defaults to "github")
- `theme` - "light" or "dark" (optional)

## Using GitHub Token

For higher API rate limits (5,000 instead of 60 per hour):

1. Create a Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Select `public_repo` scope
   - Copy the token

2. Update your HTML:

```javascript
const token = localStorage.getItem('github_token') || 
              prompt('Enter GitHub token (optional):');

if (token) {
  localStorage.setItem('github_token', token);
}

const sankey = new GitHubContributionSankey({
  username: 'octocat',
  container: '#container',
  token: token
});
```

## Troubleshooting

### "Cannot find GitHub Contribution Sankey"

- Check that the CDN URL is correct
- Verify network request completes in DevTools
- Try updating to latest version

### Rate limit errors

- Add a GitHub token for higher limits
- Wait 1 hour for rate limit to reset
- Add delays between multiple loads

### No data displayed

- Verify username is correct
- Check that user has PRs in the organization
- Open DevTools Console for error messages
- Try with a token

## Performance Tips

1. **Enable HTTPS** - GitHub Pages provides free HTTPS
2. **Cache data** - LocalStorage caches GitHub token
3. **Use CDN** - jsdelivr provides global CDN
4. **Compress assets** - GitHub Pages auto-gzips files

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file:

```bash
echo "yourdomain.com" > CNAME
```

2. Update DNS records at your registrar to point to GitHub Pages

3. Enable HTTPS in GitHub Pages settings

## Advanced: Building from Source

If you want to include the full npm package:

```bash
npm install github-contribution-sankey
npm run build

# Copy dist files to your GitHub Pages repo
cp dist/* ./
```

## Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Creating a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)

## Questions?

See README.md or open an issue on GitHub!
