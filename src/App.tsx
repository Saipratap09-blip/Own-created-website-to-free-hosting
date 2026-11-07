import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { DashboardView } from './components/views/DashboardView';
import { AIBuilderView } from './components/views/AIBuilderView';
import { EditorView } from './components/views/EditorView';
import { TemplatesView } from './components/views/TemplatesView';
import { PublishingView } from './components/views/PublishingView';
import { BlankScreenFixer } from './components/views/BlankScreenFixer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Project, Template } from './types';
import { 
  getStoredProjects, 
  saveProjects, 
  getActiveProjectId, 
  setActiveProjectId 
} from './utils/storage';
import { exportDeployableZip, downloadBlob } from './utils/exportZip';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [activeProjectId, setActiveId] = useState<string>(() => getActiveProjectId(projects));
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Persist projects whenever they change
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  // Persist active ID whenever it changes
  useEffect(() => {
    setActiveProjectId(activeProjectId);
  }, [activeProjectId]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || null;

  const handleSelectProject = (id: string) => {
    setActiveId(id);
  };

  const handleCreateNewProject = (name: string, category: Project['category']) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      description: `Custom ${category} website created with SaipratapS❤️C.`,
      category,
      html: `<header style="text-align:center;padding:4rem 1rem;background:#0f172a;color:#f8fafc;">
  <h1>Welcome to ${name}</h1>
  <p style="color:#94a3b8;margin-top:0.5rem;">Created with SaipratapS❤️C • Hosted free on GitHub Pages</p>
  <button id="ctaBtn" style="margin-top:1.5rem;padding:0.75rem 1.5rem;background:#0284c7;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Get Started</button>
</header>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
body { background: #090b10; color: #f1f5f9; line-height: 1.6; }`,
      js: `document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('ctaBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('🚀 Congratulations on launching ${name} with SaipratapS❤️C!');
    });
  }
});`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    const nextProjects = [newProject, ...projects];
    setProjects(nextProjects);
    setActiveId(newProject.id);
    setActiveTab('editor');
  };

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) {
      alert('Cannot delete the last remaining project.');
      return;
    }
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    if (activeProjectId === id) {
      setActiveId(filtered[0]?.id || '');
    }
  };

  const handleUpdateActiveProject = (updated: Partial<Project>) => {
    if (!activeProject) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, ...updated, updatedAt: Date.now() } : p))
    );
  };

  const handleApplyGeneratedWebsite = (generated: {
    title: string;
    description: string;
    html: string;
    css: string;
    js: string;
    category?: Project['category'];
  }) => {
    const updatedProj: Project = {
      id: `ai-gen-${Date.now()}`,
      name: generated.title,
      description: generated.description,
      category: generated.category || 'general',
      html: generated.html,
      css: generated.css,
      js: generated.js,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    setProjects((prev) => [updatedProj, ...prev]);
    setActiveId(updatedProj.id);
  };

  const handleApplyTemplate = (template: Template) => {
    const fromTemplate: Project = {
      id: `template-${template.id}-${Date.now()}`,
      name: template.title,
      description: template.description,
      category: template.category,
      html: template.html,
      css: template.css,
      js: template.js,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    setProjects((prev) => [fromTemplate, ...prev]);
    setActiveId(fromTemplate.id);
  };

  const handleQuickExport = async () => {
    if (!activeProject) return;
    const blob = await exportDeployableZip(activeProject, 'OWN-Free-hosting-and-create-website', 'saipratap-ux');
    downloadBlob(blob, `${activeProject.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-github-pages.zip`);
  };

  return (
    <ErrorBoundary fallbackTitle="SaipratapS❤️C Zero-Blank Recovery Shield">
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeProject={activeProject}
          projects={projects}
          onSelectProject={handleSelectProject}
          onQuickExport={handleQuickExport}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              projects={projects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onCreateNewProject={handleCreateNewProject}
              onDeleteProject={handleDeleteProject}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'ai-builder' && (
            <AIBuilderView
              activeProject={activeProject}
              onApplyGeneratedWebsite={handleApplyGeneratedWebsite}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'editor' && activeProject && (
            <EditorView
              project={activeProject}
              onUpdateProject={handleUpdateActiveProject}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'templates' && (
            <TemplatesView
              onApplyTemplate={handleApplyTemplate}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'publishing' && activeProject && (
            <PublishingView project={activeProject} />
          )}

          {activeTab === 'blank-screen-fixer' && activeProject && (
            <BlankScreenFixer project={activeProject} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800 bg-slate-900/60 text-slate-400 py-6 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white">
                SaipratapS<span className="text-rose-500">❤️</span>C
              </span>
              <span>•</span>
              <span>Website Recovery &amp; Free Hosting Platform v2.0</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Zero-Blank Protected
              </span>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('blank-screen-fixer')} 
                className="hover:text-sky-400 transition"
              >
                Diagnostic Center
              </button>
              <span>•</span>
              <a 
                href="https://saipratap-ux.github.io/OWN-Free-hosting-and-create-website/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-sky-400 transition"
              >
                GitHub Pages Site
              </a>
            </div>
          </div>
        </footer>

        {/* Offline Status Toast */}
        <OfflineIndicator />

      </div>
    </ErrorBoundary>
  );
}
