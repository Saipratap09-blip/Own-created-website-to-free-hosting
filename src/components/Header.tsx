import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Code2, 
  Palette, 
  Rocket, 
  ShieldCheck, 
  Archive,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { Project } from '../types';

export type TabType = 'dashboard' | 'ai-builder' | 'editor' | 'templates' | 'publishing' | 'blank-screen-fixer';

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeProject: Project | null;
  projects: Project[];
  onSelectProject: (id: string) => void;
  onQuickExport: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  activeProject,
  projects,
  onSelectProject,
  onQuickExport,
}) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-builder' as TabType, label: 'AI Builder', icon: Sparkles, badge: 'AI' },
    { id: 'editor' as TabType, label: 'Code Editor', icon: Code2 },
    { id: 'templates' as TabType, label: 'Templates', icon: Palette, count: '6' },
    { id: 'publishing' as TabType, label: 'Publishing', icon: Rocket, badge: 'GitHub' },
    { id: 'blank-screen-fixer' as TabType, label: 'Blank-Screen Fixer', icon: ShieldCheck, badge: 'Shield' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-rose-500 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-sm text-sky-400">
                S<span className="text-rose-500 animate-pulse text-xs">❤️</span>C
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-sky-400 transition">
                  SaipratapS<span className="text-rose-500">❤️</span>C
                </span>
                <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold border border-sky-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Free Hosting &amp; Website Creation
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition relative ${
                    isActive
                      ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      tab.badge === 'Shield' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-sky-500/20 text-sky-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.count && (
                    <span className="text-[10px] text-slate-500">
                      ({tab.count})
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Project Selector */}
            {projects.length > 0 && (
              <div className="hidden lg:flex items-center gap-2 bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs">
                <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                <select
                  value={activeProject?.id || ''}
                  onChange={(e) => onSelectProject(e.target.value)}
                  className="bg-transparent text-slate-300 font-medium text-xs focus:outline-none cursor-pointer max-w-[140px] truncate"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Zero-Blank Screen Shield Indicator */}
            <div 
              onClick={() => setActiveTab('blank-screen-fixer')}
              title="Blank-Screen Prevention System Active: Relative asset paths, .nojekyll &amp; Error Boundary verified"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold cursor-pointer hover:bg-emerald-500/20 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Blank Shield</span>
            </div>

            {/* Quick Export ZIP */}
            {activeProject && (
              <button
                onClick={onQuickExport}
                title="Download complete ready-to-deploy GitHub Pages package (.zip)"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Archive className="w-3.5 h-3.5 text-sky-400" />
                <span>Export ZIP</span>
              </button>
            )}

            {/* In-App PWA Install */}
            <PWAInstallButton />
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-800/80 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
