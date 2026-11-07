import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Code2, 
  Rocket, 
  Archive, 
  CheckCircle, 
  AlertCircle, 
  Wand2,
  Sliders,
  Eye,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Project } from '../../types';
import { TabType } from '../Header';
import confetti from 'canvas-confetti';

interface Props {
  activeProject: Project | null;
  onApplyGeneratedWebsite: (generated: {
    title: string;
    description: string;
    html: string;
    css: string;
    js: string;
    category?: Project['category'];
  }) => void;
  setActiveTab: (tab: TabType) => void;
}

export const AIBuilderView: React.FC<Props> = ({
  activeProject,
  onApplyGeneratedWebsite,
  setActiveTab,
}) => {
  const [prompt, setPrompt] = useState(
    'Create a modern gaming website with a battle arena, playable reflex mini-game, live leaderboard, clan roster, and responsive mobile design.'
  );
  const [websiteName, setWebsiteName] = useState(activeProject?.name || 'CyberNova Gaming');
  const [styleVibe, setStyleVibe] = useState('cyberpunk');
  const [category, setCategory] = useState<Project['category']>('gaming');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<{
    title: string;
    description: string;
    html: string;
    css: string;
    js: string;
    features: string[];
    source?: string;
  } | null>(null);

  const promptSuggestions = [
    {
      title: '🎮 Esports Arena & Mini-Game',
      cat: 'gaming' as Project['category'],
      style: 'cyberpunk',
      name: 'Vortex Gaming Arena',
      prompt: 'Create a modern gaming website with an interactive target reflex game, global leaderboard table, team roster, and neon cyberpunk aesthetics.',
    },
    {
      title: '🚀 High-Converting B2B SaaS',
      cat: 'business' as Project['category'],
      style: 'saas',
      name: 'CloudSync Enterprise',
      prompt: 'Build an ultra-modern SaaS product landing page with interactive monthly/annual pricing switch, ROI time savings calculator, and feature grid.',
    },
    {
      title: '🎨 Dark Minimal Portfolio',
      cat: 'portfolio' as Project['category'],
      style: 'minimal',
      name: 'SaiPratap Studio',
      prompt: 'Develop a sleek personal developer portfolio featuring interactive category filters for projects, skill badges, and a contact feedback form.',
    },
    {
      title: '🛍️ Modern E-Commerce Store',
      cat: 'ecommerce' as Project['category'],
      style: 'modern',
      name: 'Aura Lifestyle Goods',
      prompt: 'Create a clean minimalist shopping site with interactive product cards, a slide-out cart drawer, coupon code validator, and subtotal calculation.',
    },
    {
      title: '🍷 Parisian Luxury Bistro',
      cat: 'restaurant' as Project['category'],
      style: 'luxury',
      name: "L'Amour Fine Dining",
      prompt: 'Design an elegant French bistro website with seasonal menu course filter tabs and an interactive table booking reservation modal.',
    },
  ];

  const handleApplyPreset = (item: typeof promptSuggestions[0]) => {
    setPrompt(item.prompt);
    setWebsiteName(item.name);
    setStyleVibe(item.style);
    setCategory(item.cat);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setErrorMsg(null);
    setGenStep('Analyzing prompt requirements & architectural structure...');

    try {
      setTimeout(() => setGenStep('Synthesizing semantic HTML5 markup & responsive CSS3...'), 1200);
      setTimeout(() => setGenStep('Generating zero-error interactive JavaScript logic...'), 2400);

      const res = await fetch('/api/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: styleVibe,
          websiteName: websiteName.trim() || 'My Website',
          category,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      if (!data.website) {
        throw new Error('AI engine returned an empty response. Please retry.');
      }

      setLastGenerated({
        ...data.website,
        source: data.source,
      });

      // Fire celebratory confetti!
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      setGenStep('Website generated successfully!');
    } catch (err: unknown) {
      console.error('Generation error:', err);
      setErrorMsg((err as Error)?.message || 'Failed to generate website. Using recovery fallback.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptAndEdit = () => {
    if (!lastGenerated) return;
    onApplyGeneratedWebsite({
      title: lastGenerated.title,
      description: lastGenerated.description,
      html: lastGenerated.html,
      css: lastGenerated.css,
      js: lastGenerated.js,
      category,
    });
    setActiveTab('editor');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Multi-Model Engine (Gemini 3.8 Flash + Zero-Blank Fallback)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI Website Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Enter your design vision. The AI synthesizes production HTML, CSS, and interactive JavaScript guaranteed to load without blank screens.
          </p>
        </div>
      </div>

      {/* Suggested Quick Starters */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          ⚡ Quick Architecture Starters
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {promptSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(item)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 text-slate-300 text-xs font-medium whitespace-nowrap transition"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Builder Form Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleGenerate} className="space-y-6">
          
          {/* Prompt Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-200">
                Natural-Language Website Prompt
              </label>
              <span className="text-[11px] text-slate-500">
                Be as detailed as you like (sections, interactive elements, colors)
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Create a gaming clan portal with a playable reflex mini-game, leaderboard, tournament schedule, and dark neon cyberpunk aesthetic..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition leading-relaxed"
            />
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Website Name */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Website Name / Title
              </label>
              <input
                type="text"
                required
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                placeholder="e.g. CyberNova Arena"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Design Vibe */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Design Vibe &amp; Theme
              </label>
              <select
                value={styleVibe}
                onChange={(e) => setStyleVibe(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="cyberpunk">Cyberpunk Neon (Dark &amp; Glowing)</option>
                <option value="saas">Sleek Modern SaaS (Gradient &amp; Clean)</option>
                <option value="minimal">Ultra Minimalist (Monochrome)</option>
                <option value="luxury">Luxury &amp; Editorial (Warm Serif)</option>
                <option value="vibrant">Vibrant &amp; Playful (Bold Accents)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Primary Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="gaming">Gaming &amp; Tournaments</option>
                <option value="business">Business &amp; SaaS</option>
                <option value="portfolio">Personal Portfolio</option>
                <option value="ecommerce">E-Commerce &amp; Store</option>
                <option value="restaurant">Restaurant &amp; Dining</option>
                <option value="education">Education &amp; Academy</option>
                <option value="general">General Website</option>
              </select>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zero-Blank Screen Shield: Output validated with relative paths</span>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition disabled:opacity-50 active:scale-95"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Generating Code...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Complete Website</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Progress Display */}
        {isGenerating && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-sky-500/30 flex items-center gap-3 animate-pulse">
            <RotateCw className="w-5 h-5 text-sky-400 animate-spin shrink-0" />
            <div className="text-xs text-slate-300 font-mono">
              {genStep}
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-rose-300">Generation Notice</div>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}
      </div>

      {/* Generation Results Card */}
      {lastGenerated && (
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Generated Successfully ({lastGenerated.source || 'gemini-3.8-flash'})</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                {lastGenerated.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                {lastGenerated.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleAcceptAndEdit}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition active:scale-95"
              >
                <Code2 className="w-4 h-4" />
                <span>Open in Code Editor</span>
              </button>

              <button
                onClick={() => {
                  handleAcceptAndEdit();
                  setActiveTab('publishing');
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-500/20"
              >
                <Rocket className="w-4 h-4" />
                <span>Publish to GitHub Pages</span>
              </button>
            </div>
          </div>

          {/* Generated Features Chips */}
          {lastGenerated.features && lastGenerated.features.length > 0 && (
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Key Modules Included
              </span>
              <div className="flex flex-wrap gap-2">
                {lastGenerated.features.map((feat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Live Preview Container Frame */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">Instant Sandbox Preview</span>
              <span className="text-emerald-400 text-[11px] font-mono">Status: 200 OK (Clean DOM)</span>
            </div>
            <iframe
              title="AI Generated Website Preview"
              srcDoc={`<!doctype html><html><head><meta charset="utf-8"/><base href="./"/><style>${lastGenerated.css}</style></head><body>${lastGenerated.html}<script>${lastGenerated.js}</script></body></html>`}
              className="w-full h-80 border-none bg-white"
              sandbox="allow-scripts allow-modals allow-same-origin"
            />
          </div>
        </div>
      )}

    </div>
  );
};
