# Contributing to GitHub Contribution Sankey

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Respect privacy and confidentiality

## How to Contribute

### Reporting Bugs

Before creating a bug report, check the issue list as you might find out that you don't need to create one. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the styleguides
- Include appropriate test cases
- End all files with a newline
- Avoid platform-dependent code

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ModelEarth/webroot.git
cd github-contribution-sankey

# Install dependencies
npm install

# Create a new branch
git checkout -b feature/your-feature-name
```

### Building

```bash
# Development mode (watch)
npm run dev

# Production build
npm run build

# Run tests
npm test
```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Include type prefix: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

Examples:
```
feat: add support for custom color themes
fix: resolve rate limiting issue with GitHub API
docs: update installation instructions
```

### TypeScript/JavaScript Code Style

- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use single quotes for strings
- Use `const` by default, `let` when reassignment is needed
- Avoid `var`
- Use arrow functions when appropriate

### Naming Conventions

- **Files**: use kebab-case (e.g., `github-api.ts`)
- **Classes**: use PascalCase (e.g., `GitHubContributionSankey`)
- **Functions**: use camelCase (e.g., `fetchUserPRs`)
- **Constants**: use UPPER_SNAKE_CASE (e.g., `API_RATE_LIMIT`)
- **Private methods**: prefix with underscore (e.g., `_parseResponse`)

### TypeScript Guidelines

- Provide explicit type annotations for public APIs
- Use interfaces for object types
- Avoid `any` - use `unknown` when type is truly unknown
- Document complex types with JSDoc comments

### Documentation

- Use clear, concise language
- Provide code examples when helpful
- Update README.md for new features
- Add JSDoc comments to exported functions and classes

Example JSDoc:
```typescript
/**
 * Fetch PR details from GitHub API
 * @param owner Repository owner username
 * @param repo Repository name
 * @param prNumber Pull request number
 * @returns Promise resolving to PR details
 * @throws Error if API call fails
 */
async getPRDetails(owner: string, repo: string, prNumber: number): Promise<PullRequest>
```

## Testing

- Write tests for all new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="pattern"
```

## Project Structure

```
├── src/
│   ├── index.ts           # Main component
│   ├── types.ts           # Type definitions
│   ├── github-api.ts      # API wrapper
│   └── styles.ts          # Styling
├── dist/                  # Build output
├── example.html           # Usage example
├── webpack.config.js      # Build config
├── tsconfig.json          # TypeScript config
└── package.json           # Package config
```

## Performance Considerations

- Minimize API calls - use batching where possible
- Implement caching for frequently accessed data
- Use async/await for non-blocking operations
- Profile before optimizing

## Accessibility

- Ensure keyboard navigation works
- Provide semantic HTML
- Use appropriate ARIA labels
- Test with screen readers

## Release Process

Releases follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Questions?

Feel free to:
- Open an issue for questions
- Check existing documentation
- Look at closed issues for similar questions
- Ask in GitHub Discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributor graph

Thank you for contributing! 🎉
