import React, { useState } from 'react';
import { 
  Palette, 
  Eye, 
  Code2, 
  Archive, 
  CheckCircle, 
  Sparkles, 
  Gamepad2, 
  Briefcase, 
  User, 
  ShoppingBag, 
  UtensilsCrossed, 
  GraduationCap,
  X
} from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { Template, Project } from '../../types';
import { exportDeployableZip, downloadBlob } from '../../utils/exportZip';
import { TabType } from '../Header';

interface Props {
  onApplyTemplate: (template: Template) => void;
  setActiveTab: (tab: TabType) => void;
}

export const TemplatesView: React.FC<Props> = ({
  onApplyTemplate,
  setActiveTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'gaming', label: '🎮 Gaming & Esports', icon: Gamepad2 },
    { id: 'business', label: '💼 SaaS & Business', icon: Briefcase },
    { id: 'portfolio', label: '🎨 Creative Portfolio', icon: User },
    { id: 'ecommerce', label: '🛍️ E-Commerce', icon: ShoppingBag },
    { id: 'restaurant', label: '🍽️ Restaurant', icon: UtensilsCrossed },
    { id: 'education', label: '📚 EdTech & Courses', icon: GraduationCap },
  ];

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const handleUseTemplate = (template: Template) => {
    onApplyTemplate(template);
    setActiveTab('editor');
  };

  const handleExportTemplateZip = async (template: Template) => {
    const mockProj: Project = {
      id: template.id,
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
    const blob = await exportDeployableZip(mockProj, 'OWN-Free-hosting-and-create-website', 'saipratap-ux');
    downloadBlob(blob, `${template.id}-github-pages.zip`);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Interactive Zero-Blank Website Blueprints</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Production Template Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Fully interactive, responsive templates engineered specifically for GitHub Pages free hosting with zero dependencies.
          </p>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="flex flex-col bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 shadow-xl transition hover:-translate-y-1 duration-200 group"
          >
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-bold">
                {template.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                {template.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition">
              {template.title}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">
              {template.description}
            </p>

            {/* Feature bullets */}
            <div className="space-y-1.5 mb-6 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                Included Features
              </div>
              {template.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {template.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setPreviewTemplate(template)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>

              <button
                onClick={() => handleUseTemplate(template)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-md shadow-sky-500/20"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Use Template</span>
              </button>

              <button
                onClick={() => handleExportTemplateZip(template)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                title="Download complete ZIP"
              >
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in">
          <div className="w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {previewTemplate.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Live interactive sandbox with zero external dependencies
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleUseTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition shadow-md shadow-sky-500/20"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Use This Template</span>
                </button>

                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Iframe */}
            <div className="flex-1 bg-white">
              <iframe
                title="Template Preview"
                srcDoc={`<!doctype html><html><head><meta charset="utf-8"/><base href="./"/><style>${previewTemplate.css}</style></head><body>${previewTemplate.html}<script>${previewTemplate.js}</script></body></html>`}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
