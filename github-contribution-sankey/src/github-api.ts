/**
 * GitHub API wrapper for Contribution Sankey
 * Handles all API calls with rate limiting and error handling
 */

import { Repository, PullRequest, Commit, APIError } from './types';

export class GitHubAPI {
  private baseUrl = 'https://api.github.com';
  private token: string;
  private rateLimitRemaining = 60;
  private rateLimitReset = 0;

  constructor(token?: string) {
    this.token = token || localStorage.getItem('github_token') || '';
  }

  /**
   * Get authenticated headers
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    return headers;
  }

  /**
   * Make API request with rate limit handling
   */
  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    // Check rate limit
    if (this.rateLimitRemaining === 0) {
      const waitTime = Math.max(0, this.rateLimitReset * 1000 - Date.now());
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, Math.min(waitTime, 5000)));
      }
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders()
    });

    // Update rate limit info
    const remaining = response.headers.get('x-ratelimit-remaining');
    const reset = response.headers.get('x-ratelimit-reset');
    
    if (remaining !== null) this.rateLimitRemaining = parseInt(remaining, 10);
    if (reset !== null) this.rateLimitReset = parseInt(reset, 10);

    if (!response.ok) {
      const error: APIError = {
        message: `GitHub API error: ${response.statusText}`,
        status: response.status,
        documentation_url: response.headers.get('x-github-request-id') || undefined
      };
      throw new Error(error.message);
    }

    return response.json();
  }

  /**
   * Search for PRs by author in organization
   */
  async searchUserPRs(username: string, organization: string): Promise<PullRequest[]> {
    const query = `author:${encodeURIComponent(username)}+org:${organization}+type:pr`;
    const endpoint = `/search/issues?q=${encodeURIComponent(query)}&per_page=100&sort=created&order=desc`;

    const data = await this.request<any>(endpoint);
    
    return (data.items || []).map((item: any) => this.parsePR(item));
  }

  /**
   * Get PR details including commit count
   */
  async getPRDetails(owner: string, repo: string, prNumber: number): Promise<PullRequest> {
    const endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}`;
    return this.request<PullRequest>(endpoint);
  }

  /**
   * Get commits for a specific PR
   */
  async getPRCommits(owner: string, repo: string, prNumber: number): Promise<Commit[]> {
    const endpoint = `/repos/${owner}/${repo}/pulls/${prNumber}/commits`;
    const commits = await this.request<any[]>(endpoint);
    
    return commits.map(commit => ({
      sha: commit.sha,
      shortSha: commit.sha.substring(0, 7),
      message: commit.commit.message,
      url: commit.url,
      html_url: commit.html_url,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date
      }
    }));
  }

  /**
   * Get full commit details including file changes
   */
  async getCommitDetails(owner: string, repo: string, sha: string): Promise<Commit> {
    const endpoint = `/repos/${owner}/${repo}/commits/${sha}`;
    const commit = await this.request<any>(endpoint);
    
    return {
      sha: commit.sha,
      shortSha: commit.sha.substring(0, 7),
      message: commit.commit.message,
      url: commit.url,
      html_url: commit.html_url,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date
      },
      files: commit.files?.length || 0,
      additions: commit.stats?.additions || 0,
      deletions: commit.stats?.deletions || 0
    };
  }

  /**
   * Get repository details
   */
  async getRepository(owner: string, repo: string): Promise<Repository> {
    const endpoint = `/repos/${owner}/${repo}`;
    return this.request<Repository>(endpoint);
  }

  /**
   * Get branch details
   */
  async getBranch(owner: string, repo: string, branchName: string): Promise<any> {
    const endpoint = `/repos/${owner}/${repo}/branches/${encodeURIComponent(branchName)}`;
    return this.request<any>(endpoint);
  }

  /**
   * Get all commits on a branch
   */
  async getBranchCommits(owner: string, repo: string, branchName: string): Promise<Commit[]> {
    const endpoint = `/repos/${owner}/${repo}/commits?sha=${encodeURIComponent(branchName)}&per_page=1`;
    const commits = await this.request<any[]>(endpoint);
    
    return commits.map(commit => ({
      sha: commit.sha,
      shortSha: commit.sha.substring(0, 7),
      message: commit.commit.message,
      url: commit.url,
      html_url: commit.html_url,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date
      }
    }));
  }

  /**
   * Parse PR data from search results
   */
  private parsePR(item: any): PullRequest {
    const repoMatch = item.repository_url?.match(/repos\/([^\/]+)\/([^\/]+)$/);
    const merged = item.pull_request?.merged_at !== null && item.pull_request?.merged_at !== undefined;

    return {
      id: item.id,
      number: item.number,
      title: item.title,
      body: item.body,
      state: item.state,
      merged,
      merged_at: item.pull_request?.merged_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
      closed_at: item.closed_at,
      html_url: item.html_url,
      head: {
        ref: item.head?.ref || 'unknown',
        sha: item.head?.sha || '',
        repo: {
          id: 0,
          name: repoMatch ? repoMatch[2] : '',
          full_name: '',
          owner: repoMatch ? repoMatch[1] : '',
          url: item.repository_url,
          html_url: '',
          updated_at: new Date().toISOString()
        }
      },
      base: {
        ref: item.base?.ref || 'main',
        repo: {
          id: 0,
          name: repoMatch ? repoMatch[2] : '',
          full_name: '',
          owner: repoMatch ? repoMatch[1] : '',
          url: item.repository_url,
          html_url: '',
          updated_at: new Date().toISOString()
        }
      },
      commits: 0
    };
  }

  /**
   * Get rate limit status
   */
  getRateLimitStatus(): { remaining: number; reset: number } {
    return {
      remaining: this.rateLimitRemaining,
      reset: this.rateLimitReset
    };
  }

  /**
   * Set GitHub token
   */
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('github_token', token);
  }
}

export default GitHubAPI;
