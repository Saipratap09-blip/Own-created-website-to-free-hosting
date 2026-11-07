import { Project } from '../types';
import { TEMPLATES } from '../data/templates';

const STORAGE_KEY = 'saipratap_sc_projects_v2';
const ACTIVE_ID_KEY = 'saipratap_sc_active_id';

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored projects:', err);
  }

  // Initial projects if storage is empty
  const defaultProject: Project = {
    id: 'own-free-hosting-main',
    name: 'OWN Free Hosting Portal',
    description: 'Fixed & upgraded edition of saipratap09-blip.github.io/Own-created-website-to-free-hosting with zero-blank shield.',
    category: 'business',
    html: TEMPLATES[0].html,
    css: TEMPLATES[0].css,
    js: TEMPLATES[0].js,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now(),
    publishedUrl: 'https://saipratap09-blip.github.io/Own-created-website-to-free-hosting/',
    version: 2,
  };

  const backupProject: Project = {
    id: 'cyberpulse-arena-v1',
    name: 'CyberPulse Gaming & Reflex Arena',
    description: 'High-speed esport reflex game and tournament leaderboard.',
    category: 'gaming',
    html: TEMPLATES[0].html,
    css: TEMPLATES[0].css,
    js: TEMPLATES[0].js,
    createdAt: Date.now() - 43200000,
    updatedAt: Date.now(),
    publishedUrl: 'https://saipratap-ux.github.io/OWN-Free-hosting-and-create-website/game/',
    version: 1,
  };

  const starterProjects = [defaultProject, backupProject];
  saveProjects(starterProjects);
  return starterProjects;
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('Failed to save projects to localStorage:', err);
  }
}

export function getActiveProjectId(projects: Project[]): string {
  if (typeof window === 'undefined') return projects[0]?.id || '';
  const storedId = localStorage.getItem(ACTIVE_ID_KEY);
  if (storedId && projects.some(p => p.id === storedId)) {
    return storedId;
  }
  return projects[0]?.id || '';
}

export function setActiveProjectId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_ID_KEY, id);
}
