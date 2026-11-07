export type ProjectCategory = 
  | 'gaming'
  | 'business'
  | 'portfolio'
  | 'ecommerce'
  | 'restaurant'
  | 'education'
  | 'general';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  html: string;
  css: string;
  js: string;
  createdAt: number;
  updatedAt: number;
  publishedUrl?: string;
  version: number;
}

export interface Template {
  id: string;
  title: string;
  category: ProjectCategory;
  badge: string;
  description: string;
  features: string[];
  tags: string[];
  html: string;
  css: string;
  js: string;
}

export interface DeploymentConfig {
  githubOwner: string;
  repository: string;
  branch: string;
  token: string;
  commitMessage: string;
  status: 'idle' | 'testing' | 'deploying' | 'success' | 'error';
  statusMessage: string;
  liveUrl?: string;
  lastDeployed?: string;
  logs: string[];
}

export interface BlankScreenCheckItem {
  id: string;
  title: string;
  category: 'Critical' | 'High' | 'Medium';
  cause: string;
  solution: string;
  codeSnippet?: string;
  status: 'pass' | 'fail' | 'warning' | 'checking';
  details: string;
}
