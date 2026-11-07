import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Plus, 
  ExternalLink, 
  Download, 
  Archive, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Activity,
  Layers,
  FileCode,
  Globe2
} from 'lucide-react';
import { Project } from '../../types';
import { exportSingleHtmlFile, exportDeployableZip, downloadBlob } from '../../utils/exportZip';
import { TabType } from '../Header';

interface Props {
  projects: Project[];
  activeProject: Project | null;
  onSelectProject: (id: string) => void;
  onCreateNewProject: (name: string, category: Project['category']) => void;
  onDeleteProject: (id: string) => void;
  setActiveTab: (tab: TabType) => void;
}

export const DashboardView: React.FC<Props> = ({
  projects,
  activeProject,
  onSelectProject,
  onCreateNewProject,
  onDeleteProject,
  setActiveTab,
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<Project['category']>('business');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    onCreateNewProject(newProjectName.trim(), newProjectCategory);
    setNewProjectName('');
    setShowNewModal(false);
  };

  const handleExportZip = async (project: Project) => {
    const blob = await exportDeployableZip(project, 'OWN-Free-hosting-and-create-website', 'saipratap-ux');
    downloadBlob(blob, `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-github-pages.zip`);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>SaipratapS❤️C Platform • Version 2.0 Recovery Edition</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Create, Edit &amp; Host Websites for Free.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Design with modern AI, start from interactive templates, fine-tune with the live code editor, and publish directly to GitHub Pages with guaranteed blank-screen protection.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                Target: <code className="text-sky-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">saipratap-ux.github.io/OWN-Free-hosting-and-create-website/</code>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('ai-builder')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate with AI</span>
            </button>
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Empty Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics / System Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Websites</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{projects.length}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">100% saved</span> locally &amp; exportable
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Blank-Screen Shield</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">Secured</div>
          <div className="text-xs text-slate-400 mt-1">
            Relative paths &amp; .nojekyll active
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Interactive Templates</span>
            <Palette className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">6 Ready</div>
          <div className="text-xs text-slate-400 mt-1">
            Gaming, SaaS, Portfolio &amp; Shop
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">PWA &amp; Hosting</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">Free</div>
          <div className="text-xs text-slate-400 mt-1">
            Zero cost on GitHub Pages
          </div>
        </div>
      </div>

      {/* Quick Launchpad Action Cards */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Workspace Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => setActiveTab('ai-builder')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 rounded-2xl p-5 transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">AI Website Builder</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Describe your dream website in plain English and generate working code instantly.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition">
              Launch AI Builder →
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('templates')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">Template Gallery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                6 responsive templates including CyberPulse gaming arena with reflex mini-game.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition">
              Explore Templates →
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('editor')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">Live Code Editor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect and modify HTML, CSS &amp; JavaScript with real-time responsive sandboxed preview.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition">
              Open Code Editor →
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('blank-screen-fixer')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-5 transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">Blank-Screen Fixer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Diagnose GitHub Pages repository subpaths, asset 404s, base hrefs, and missing files.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition">
              Run Diagnostics →
            </div>
          </div>

        </div>
      </div>

      {/* Recent Websites Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Your Website Projects</h2>
            <p className="text-xs text-slate-400">All projects are auto-saved, versioned, and exportable.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Website</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <th className="pb-3 pl-2">Project Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Last Modified</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((project) => {
                const isActive = activeProject?.id === project.id;
                return (
                  <tr 
                    key={project.id}
                    className={`group hover:bg-slate-800/40 transition ${
                      isActive ? 'bg-sky-500/5' : ''
                    }`}
                  >
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isActive 
                            ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          <FileCode className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-200 group-hover:text-sky-400 flex items-center gap-1.5 transition">
                            <span>{project.name}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[280px]">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium capitalize">
                        {project.category}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Zero-Blank Ready
                      </span>
                    </td>

                    <td className="py-3.5 text-slate-400 font-mono text-[11px]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-3.5 text-right pr-2">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            onSelectProject(project.id);
                            setActiveTab('editor');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
                          title="Open in Code Editor"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            onSelectProject(project.id);
                            setActiveTab('editor');
                          }}
                          className="p-1 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition"
                          title="Preview Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => exportSingleHtmlFile(project)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition"
                          title="Download Standalone HTML"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleExportZip(project)}
                          className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition"
                          title="Export Deployable ZIP (with .nojekyll & workflow)"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            onSelectProject(project.id);
                            setActiveTab('publishing');
                          }}
                          className="p-1 rounded text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition"
                          title="Publish to GitHub Pages"
                        >
                          <Rocket className="w-3.5 h-3.5" />
                        </button>

                        {projects.length > 1 && (
                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-white mb-1">Create New Website Project</h3>
            <p className="text-xs text-slate-400 mb-4">
              Start with clean, optimized HTML5, CSS3, and JavaScript templates.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Website / Project Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Next-Gen Gaming Portal"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newProjectCategory}
                  onChange={(e) => setNewProjectCategory(e.target.value as Project['category'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="business">Business / SaaS</option>
                  <option value="gaming">Gaming &amp; Esports</option>
                  <option value="portfolio">Personal Portfolio</option>
                  <option value="ecommerce">E-Commerce Store</option>
                  <option value="restaurant">Restaurant &amp; Dining</option>
                  <option value="education">Education &amp; Courses</option>
                  <option value="general">General Website</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-md shadow-sky-500/20"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl relative text-left">
            <h3 className="text-base font-bold text-white mb-2">Delete Website Project?</h3>
            <p className="text-xs text-slate-400 mb-5">
              Are you sure you want to delete this project? This action cannot be undone unless you have exported a ZIP backup.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Keep Project
              </button>
              <button
                onClick={() => {
                  onDeleteProject(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
