/**
 * GitHub Contribution Sankey Diagram
 * A visualization plugin for displaying GitHub contributions as an interactive Sankey diagram
 */

export interface GitHubSankeyOptions {
  username: string;
  container: string | HTMLElement;
  token?: string;
  organization?: string;
  theme?: 'light' | 'dark';
  maxWidth?: number;
}

export interface Repository {
  owner: string;
  name: string;
  url: string;
}

export interface Branch {
  name: string;
  repo: string;
  prs: PR[];
  commits: Commit[];
}

export interface PR {
  number: number;
  title: string;
  state: 'open' | 'closed' | 'merged';
  created_at: string;
  merged_at?: string;
  html_url: string;
  commits: number;
  branch?: string;
}

export interface Commit {
  sha: string;
  message: string;
  url: string;
  files: number;
}

class GitHubContributionSankey {
  private options: GitHubSankeyOptions;
  private container: HTMLElement;
  private githubToken: string;
  private repos: Repository[] = [];
  private data: {
    username: string;
    repos: { [key: string]: PR[] };
    branches: { [key: string]: Branch };
  };

  constructor(options: GitHubSankeyOptions) {
    this.options = {
      maxWidth: 1400,
      theme: 'light',
      ...options
    };

    // Get container element
    if (typeof this.options.container === 'string') {
      const el = document.querySelector(this.options.container);
      if (!el) throw new Error(`Container element not found: ${this.options.container}`);
      this.container = el as HTMLElement;
    } else {
      this.container = this.options.container;
    }

    this.githubToken = this.options.token || localStorage.getItem('github_token') || '';
    this.data = {
      username: this.options.username,
      repos: {},
      branches: {}
    };
  }

  /**
   * Initialize and render the Sankey diagram
   */
  async render(): Promise<void> {
    try {
      // Show loading state
      this.container.innerHTML = '<div style="padding: 40px; text-align: center;">Loading contribution data...</div>';

      // Fetch user's PRs
      const prs = await this.fetchUserPRs();

      if (prs.length === 0) {
        this.container.innerHTML = '<div style="padding: 40px; text-align: center;">No contributions found for this user.</div>';
        return;
      }

      // Fetch PR details (commits, branches)
      await this.enrichPRData(prs);

      // Render the Sankey diagram
      await this.renderSankey(prs);

    } catch (error) {
      console.error('Error rendering Sankey:', error);
      this.container.innerHTML = `<div style="padding: 40px; color: red;">Error loading data: ${(error as Error).message}</div>`;
    }
  }

  /**
   * Fetch all PRs by the user across specified organization
   */
  private async fetchUserPRs(): Promise<PR[]> {
    const org = this.options.organization || 'ModelEarth';
    const url = `https://api.github.com/search/issues?q=author:${encodeURIComponent(this.options.username)}+org:${org}+type:pr&per_page=100&sort=created&order=desc`;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (this.githubToken) {
      headers['Authorization'] = `token ${this.githubToken}`;
    }

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PRs: ${response.statusText}`);
    }

    const data = await response.json();
    
    return (data.items || []).map((pr: any) => {
      const repoMatch = pr.repository_url?.match(/repos\/([^\/]+)\/([^\/]+)$/);
      const isMerged = pr.pull_request?.merged_at;
      const isOpen = pr.state === 'open';
      
      return {
        number: pr.number,
        title: pr.title,
        state: isMerged ? 'merged' : (isOpen ? 'open' : 'closed'),
        created_at: pr.created_at,
        merged_at: pr.pull_request?.merged_at,
        html_url: pr.html_url,
        commits: 0,
        repo_owner: repoMatch ? repoMatch[1] : '',
        repo_name: repoMatch ? repoMatch[2] : '',
      };
    });
  }

  /**
   * Enrich PR data with commit and branch information
   */
  private async enrichPRData(prs: PR[]): Promise<void> {
    // Fetch details for each PR
    const batchSize = 10;
    
    for (let i = 0; i < prs.length; i += batchSize) {
      const batch = prs.slice(i, i + batchSize);
      const promises = batch.map(pr => this.fetchPRDetails(pr));
      
      await Promise.all(promises);
      
      // Wait between batches to avoid rate limiting
      if (i + batchSize < prs.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Group PRs by repo
    prs.forEach(pr => {
      const repoKey = (pr as any).repo_name;
      if (!this.data.repos[repoKey]) {
        this.data.repos[repoKey] = [];
      }
      this.data.repos[repoKey].push(pr);
    });
  }

  /**
   * Fetch details for a single PR (commits, branch, etc.)
   */
  private async fetchPRDetails(pr: any): Promise<void> {
    try {
      const url = `https://api.github.com/repos/${pr.repo_owner}/${pr.repo_name}/pulls/${pr.number}`;
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json'
      };
      
      if (this.githubToken) {
        headers['Authorization'] = `token ${this.githubToken}`;
      }

      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      
      pr.commits = data.commits || 0;
      pr.branch = data.head?.ref || 'unknown';
      
    } catch (error) {
      console.error(`Error fetching PR ${pr.number}:`, error);
    }
  }

  /**
   * Render the Sankey diagram
   */
  private async renderSankey(prs: PR[]): Promise<void> {
    const html = this.generateSankeyHTML(prs);
    this.container.innerHTML = html;

    // Add event listeners after rendering
    this.attachEventListeners();

    // Load commit details asynchronously
    setTimeout(() => {
      this.loadCommitDetails();
    }, 100);
  }

  /**
   * Generate HTML for the Sankey diagram
   */
  private generateSankeyHTML(prs: PR[]): string {
    // This is a simplified version - in production, you'd import the full sankey.html styling and structure
    return `
      <div class="sankey-container" style="max-width: ${this.options.maxWidth}px; margin: 0 auto; padding: 20px;">
        <div class="sankey-card" style="background: white; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden;">
          <div class="sankey-header" style="padding: 20px 24px; border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
            <h1 style="margin: 0; font-size: 24px; color: #111;">Contribution Tree - ${this.options.username}</h1>
          </div>
          <div class="sankey-content" style="padding: 24px;">
            <p style="color: #666; margin-bottom: 20px;">${prs.length} PRs across ${Object.keys(this.data.repos).length} repositories</p>
            
            <div class="contribution-tree" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div class="tree-horizontal" style="padding: 40px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; overflow-x: auto; min-height: 500px;">
                <svg class="tree-svg-connectors" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;"></svg>
                ${this.generateTreeNodes(prs)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generate tree nodes for repos, branches, and PRs
   */
  private generateTreeNodes(prs: PR[]): string {
    let html = '';

    // Root node
    html += `
      <div style="display: flex; align-items: center; gap: 8px; padding: 12px 18px; background: #2c3e50; color: white; border: 1px solid #34495e; border-radius: 4px; font-weight: 600; font-size: 14px; flex-shrink: 0; cursor: pointer; position: relative; z-index: 1; min-width: 100px; text-align: center; font-family: inherit;">
        ${this.options.username}
      </div>
    `;

    // Repos
    const repos = Object.keys(this.data.repos);
    repos.forEach(repoName => {
      const repoPRs = this.data.repos[repoName];
      html += `
        <div style="display: flex; flex-direction: column; gap: 40px; margin-left: 100px;">
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px; background: #5a6c7d; color: white; border: 1px solid #4a5c6d; border-radius: 4px; font-weight: 500; font-size: 13px; cursor: pointer;">
            ${repoName}
            <span style="font-size: 11px; padding: 2px 6px; background: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.5); border-radius: 3px;">${repoPRs.length}</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 12px; margin-left: 150px;">
            ${this.generateBranchNodes(repoPRs)}
          </div>
        </div>
      `;
    });

    return html;
  }

  /**
   * Generate branch nodes
   */
  private generateBranchNodes(repoPRs: PR[]): string {
    const branchGroups: { [key: string]: PR[] } = {};
    
    repoPRs.forEach(pr => {
      const branch = (pr as any).branch || 'unknown';
      if (!branchGroups[branch]) {
        branchGroups[branch] = [];
      }
      branchGroups[branch].push(pr);
    });

    let html = '';
    Object.entries(branchGroups).forEach(([branchName, branchPRs]) => {
      html += `
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; background: #16a085; color: white; border: 1px solid #138d75; border-radius: 4px; font-weight: 400; font-size: 12px; cursor: pointer;">
          ${branchName.substring(0, 40)}${branchName.length > 40 ? '...' : ''}
          <span style="font-size: 11px; padding: 2px 6px; background: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.5); border-radius: 3px;">${branchPRs.length}</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 8px; margin-left: 100px;">
          ${this.generatePRNodes(branchPRs)}
        </div>
      `;
    });

    return html;
  }

  /**
   * Generate PR nodes
   */
  private generatePRNodes(prs: PR[]): string {
    return prs.map(pr => {
      const statusClass = (pr as any).state;
      const statusColors: { [key: string]: string } = {
        merged: '#6f42c1',
        open: '#1e8449',
        closed: '#c0392b'
      };

      return `
        <div style="display: inline-flex; flex-direction: row; align-items: center; gap: 6px; padding: 6px 12px; background: ${statusColors[statusClass] || '#2980b9'}; color: white; border: 1px solid rgba(0,0,0,0.2); border-radius: 4px; font-size: 11px; text-decoration: none; cursor: pointer; font-family: inherit;">
          <a href="${pr.html_url}" target="_blank" style="color: white; text-decoration: none;">#${pr.number}</a>
          <span style="font-size: 10px;">(${(pr as any).commits || 0} commits)</span>
        </div>
      `;
    }).join('');
  }

  /**
   * Attach event listeners
   */
  private attachEventListeners(): void {
    // Add click handlers, hover effects, etc.
    console.log('Event listeners attached');
  }

  /**
   * Load commit details asynchronously
   */
  private loadCommitDetails(): void {
    // Fetch and display commit details
    console.log('Loading commit details');
  }
}

export default GitHubContributionSankey;
