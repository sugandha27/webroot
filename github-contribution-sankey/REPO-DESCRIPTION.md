# GitHub Contribution Sankey

## 📊 Overview

**GitHub Contribution Sankey** is an interactive visualization tool that displays your GitHub contributions as a beautiful Sankey diagram. It hierarchically shows your pull requests, commits, and branches across all repositories in a clear, visual format.

## 🎯 Purpose

Transform complex GitHub contribution data into an easy-to-understand interactive tree visualization. Perfect for:
- **Portfolio showcasing** - Visualize your development activity
- **Team analytics** - See contribution patterns at a glance
- **Contribution tracking** - Monitor activity over time and by year
- **GitHub Pages hosting** - Share your contribution story

## ✨ Key Features

- 📈 **Interactive Sankey Diagram** - Visualize PR flow and commit hierarchy
- 🎨 **Status-based Coloring** - Purple (merged), Green (open), Red (closed)
- 📅 **Year Filtering** - View contributions by year (defaults to current year)
- 🔗 **Click-to-GitHub** - Jump to commit details with one click
- 💬 **Rich Tooltips** - Hover to see PR titles, dates, file changes
- 🌙 **Light/Dark Themes** - Professional appearance
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Fast & Lightweight** - ~25KB minified, no external dependencies
- 🔐 **GitHub Token Support** - Higher rate limits (5,000/hr vs 60/hr)

## 🚀 Quick Start

### Via npm
```bash
npm install github-contribution-sankey
```

### Via HTML
```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/github-contribution-sankey@1.0.0/dist/github-contribution-sankey.min.js"></script>
<script>
  new GitHubContributionSankey({
    username: 'octocat',
    container: '#app',
    organization: 'github'
  }).render();
</script>
```

### Via GitHub Pages
Deploy your contribution visualization to `your-username.github.io` in minutes.

## 📊 What You Get

```
Your Username (Root)
├── Repository 1
│   ├── Branch: main
│   │   ├── PR #123 (merged) → 5 commits
│   │   └── PR #124 (open) → 3 commits
│   └── Branch: feature
│       └── PR #125 (closed) → 2 commits
└── Repository 2
    └── Branch: main
        └── PR #126 (merged) → 8 commits
```

**Color-coded by status:**
- 🟣 Purple = Merged PRs
- 🟢 Green = Open PRs
- 🔴 Red = Closed PRs

**Line thickness** = Number of commits in each PR

## 🛠️ Technology

- **TypeScript** - Type-safe, modern JavaScript
- **Webpack** - Optimized bundling
- **GitHub REST API** - Real-time data
- **SVG** - Scalable graphics
- **Zero Dependencies** - Pure JavaScript core

## 📦 Package Contents

- **Source Code** (3 TypeScript files)
  - Main visualization component
  - GitHub API wrapper
  - Type definitions

- **Documentation** (9 comprehensive guides)
  - Quick start guide
  - Full API reference
  - Development guide
  - GitHub Pages deployment
  - Contributing guidelines

- **Examples** (Interactive demo)
  - Working HTML example
  - Code samples
  - Configuration options

## 🌟 Use Cases

### 1. Portfolio Showcase
Host on GitHub Pages to show employers your coding activity and contributions.

### 2. Team Analytics
Visualize team member contributions across organization repositories.

### 3. Project Tracking
Monitor contribution patterns and PR trends over time.

### 4. Contribution Reports
Generate visual reports for stakeholders and team leads.

## 📈 Statistics

- Supports unlimited repositories
- Displays all PR statuses (merged, open, closed)
- Shows commit counts per PR
- Visualizes file changes
- Handles GitHub API rate limiting
- Caches data efficiently

## 🔗 Integration Points

- **GitHub REST API v3** - Fetches PR and commit data
- **GitHub Pages** - Deploy hosted version
- **npm Registry** - Install as dependency
- **CDN** - Include via jsdelivr or unpkg
- **Local Development** - Webpack dev server

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Complete reference guide |
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Architecture & internals |
| [GITHUB-PAGES.md](./GITHUB-PAGES.md) | Deployment instructions |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute |

## 🎓 Getting Started

1. **Choose your method:**
   - npm package for integration
   - GitHub Pages for standalone hosting
   - HTML/CDN for quick demos

2. **Provide GitHub username** and optionally your GitHub token

3. **Customize** theme, organization, and appearance

4. **Share** your beautiful contribution visualization!

## 🔐 Security & Privacy

✅ Client-side rendering (no server-side data storage)  
✅ Optional GitHub token for higher API limits  
✅ No sensitive data exposure  
✅ MIT license (open source)  
✅ Works offline (after initial load)

## 💡 Pro Tips

- Use a GitHub token for better rate limiting
- Deploy to GitHub Pages for easy sharing
- Customize colors to match your brand
- Filter by year to highlight specific periods
- Include in portfolio websites

## 🤝 Contributing

This is an open-source project! Contributions welcome:
- Report bugs and suggest features
- Submit pull requests
- Improve documentation
- Share your use cases

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT - Free for personal and commercial use

## 🚀 Next Steps

- **[Quick Start](./QUICKSTART.md)** - Get running in 5 minutes
- **[Full Docs](./README.md)** - Complete reference
- **[Deploy to GitHub Pages](./GITHUB-PAGES.md)** - Share your viz
- **[Contribute](./CONTRIBUTING.md)** - Join the project

---

**Version:** 1.0.0  
**Status:** Production Ready  
**License:** MIT  

Built with ❤️ by the ModelEarth community
