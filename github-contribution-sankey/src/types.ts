/**
 * TypeScript type definitions for GitHub Contribution Sankey
 */

export interface GitHubSankeyConfig {
  username: string;
  container: string | HTMLElement;
  token?: string;
  organization?: string;
  theme?: 'light' | 'dark';
  maxWidth?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: string;
  url: string;
  html_url: string;
  description?: string;
  updated_at: string;
}

export interface Branch {
  name: string;
  repository: Repository;
  commit: {
    sha: string;
    url: string;
    date: string;
  };
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  merged: boolean;
  merged_at?: string;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  html_url: string;
  head: {
    ref: string;
    sha: string;
    repo: Repository;
  };
  base: {
    ref: string;
    repo: Repository;
  };
  commits: number;
  files_changed?: number;
}

export interface Commit {
  sha: string;
  shortSha?: string;
  message: string;
  url: string;
  html_url: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  files?: number;
  additions?: number;
  deletions?: number;
}

export interface TreeNode {
  id: string;
  type: 'root' | 'repository' | 'branch' | 'pr' | 'commit';
  label: string;
  value?: any;
  parent?: TreeNode;
  children?: TreeNode[];
  metadata?: {
    lastUpdate?: string;
    count?: number;
    status?: string;
  };
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export interface SankeyData {
  user: string;
  repositories: Map<string, Repository>;
  branches: Map<string, Branch>;
  pullRequests: PullRequest[];
  commits: Map<string, Commit>;
  links: SankeyLink[];
}

export interface ThemeConfig {
  name: 'light' | 'dark';
  colors: {
    root: string;
    repository: string;
    branch: string;
    prOpen: string;
    prMerged: string;
    prClosed: string;
    commitOpen: string;
    commitMerged: string;
    commitClosed: string;
    text: string;
    border: string;
    background: string;
    surface: string;
  };
}

export interface APIError {
  message: string;
  documentation_url?: string;
  status?: number;
}

export interface FetchOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
}
