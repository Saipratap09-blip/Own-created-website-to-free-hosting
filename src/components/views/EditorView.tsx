import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCw, 
  Save, 
  Download, 
  Archive, 
  Rocket, 
  Maximize2, 
  Minimize2, 
  Terminal, 
  Undo2, 
  Redo2, 
  Code, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Settings2,
  FileCode2,
  Layers
} from 'lucide-react';
import { Project } from '../../types';
import { exportSingleHtmlFile, exportDeployableZip, downloadBlob } from '../../utils/exportZip';
import { TabType } from '../Header';

interface Props {
  project: Project;
  onUpdateProject: (updated: Partial<Project>) => void;
  setActiveTab: (tab: TabType) => void;
}

type EditorTab = 'html' | 'css' | 'js';
type ViewportSize = 'desktop' | 'tablet' | 'mobile';

interface HistoryState {
  html: string;
  css: string;
  js: string;
}

export const EditorView: React.FC<Props> = ({
  project,
  onUpdateProject,
  setActiveTab,
}) => {
  const [editorTab, setEditorTab] = useState<EditorTab>('html');
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<{ type: 'log' | 'error' | 'warn'; text: string; time: string }[]>([]);
  
  // History for Undo / Redo
  const [history, setHistory] = useState<HistoryState[]>([
    { html: project.html, css: project.css, js: project.js }
  ]);
  const [historyIdx, setHistoryIdx] = useState(0);

  // Local state for instant typing response
  const [htmlCode, setHtmlCode] = useState(project.html);
  const [cssCode, setCssCode] = useState(project.css);
  const [jsCode, setJsCode] = useState(project.js);
  const [isSaved, setIsSaved] = useState(true);
  const [saveToast, setSaveToast] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync when project changes from external selection
  useEffect(() => {
    setHtmlCode(project.html);
    setCssCode(project.css);
    setJsCode(project.js);
    setHistory([{ html: project.html, css: project.css, js: project.js }]);
    setHistoryIdx(0);
    setIsSaved(true);
  }, [project.id]);

  // Push history on changes with debounce
  const pushHistory = (newHtml: string, newCss: string, newJs: string) => {
    const nextHistory = history.slice(0, historyIdx + 1);
    nextHistory.push({ html: newHtml, css: newCss, js: newJs });
    if (nextHistory.length > 30) nextHistory.shift();
    setHistory(nextHistory);
    setHistoryIdx(nextHistory.length - 1);
  };

  const handleHtmlChange = (val: string) => {
    setHtmlCode(val);
    setIsSaved(false);
    pushHistory(val, cssCode, jsCode);
  };

  const handleCssChange = (val: string) => {
    setCssCode(val);
    setIsSaved(false);
    pushHistory(htmlCode, val, jsCode);
  };

  const handleJsChange = (val: string) => {
    setJsCode(val);
    setIsSaved(false);
    pushHistory(htmlCode, cssCode, val);
  };

  const handleUndo = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setHtmlCode(prev.html);
      setCssCode(prev.css);
      setJsCode(prev.js);
      setHistoryIdx(historyIdx - 1);
      setIsSaved(false);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setHtmlCode(next.html);
      setCssCode(next.css);
      setJsCode(next.js);
      setHistoryIdx(historyIdx + 1);
      setIsSaved(false);
    }
  };

  const handleManualSave = () => {
    onUpdateProject({
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      updatedAt: Date.now(),
    });
    setIsSaved(true);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExportZip = async () => {
    handleManualSave();
    const updatedProj: Project = { ...project, html: htmlCode, css: cssCode, js: jsCode };
    const blob = await exportDeployableZip(updatedProj, 'OWN-Free-hosting-and-create-website', 'saipratap-ux');
    downloadBlob(blob, `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-github-pages.zip`);
  };

  const handleExportHtml = () => {
    handleManualSave();
    const updatedProj: Project = { ...project, html: htmlCode, css: cssCode, js: jsCode };
    exportSingleHtmlFile(updatedProj);
  };

  const handleRefreshPreview = () => {
    setPreviewKey((k) => k + 1);
    setConsoleLogs([]);
  };

  // Compile full iframe HTML with console-capturing interceptor
  const assembledPreviewDoc = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <base href="./" />
  <style>
    ${cssCode}
  </style>
  <script>
    // Intercept console messages and forward to parent window
    (function() {
      var origLog = console.log;
      var origErr = console.error;
      var origWarn = console.warn;

      function sendToParent(type, args) {
        try {
          var msg = Array.from(args).map(function(a) {
            return typeof a === 'object' ? JSON.stringify(a) : String(a);
          }).join(' ');
          window.parent.postMessage({ type: 'SAI_PREVIEW_CONSOLE', level: type, text: msg }, '*');
        } catch(e) {}
      }

      console.log = function() {
        sendToParent('log', arguments);
        origLog.apply(console, arguments);
      };
      console.error = function() {
        sendToParent('error', arguments);
        origErr.apply(console, arguments);
      };
      console.warn = function() {
        sendToParent('warn', arguments);
        origWarn.apply(console, arguments);
      };

      window.onerror = function(msg, url, line) {
        sendToParent('error', ['Script error on line ' + line + ': ' + msg]);
      };
    })();
  </script>
</head>
<body>
  ${htmlCode}
  <script>
    try {
      ${jsCode}
    } catch(err) {
      console.error('Runtime script execution error:', err.message);
    }
  </script>
</body>
</html>`;

  // Listen for iframe console messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'SAI_PREVIEW_CONSOLE') {
        setConsoleLogs((prev) => [
          ...prev.slice(-40),
          {
            type: e.data.level,
            text: e.data.text,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={`space-y-4 pb-12 animate-in fade-in duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4' : ''}`}>
      
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
        
        {/* Project Name & Save Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">{project.name}</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {isSaved ? (
              <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span>Autosaved</span>
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Unsaved Edits</span>
              </span>
            )}
          </div>
        </div>

        {/* Viewport & Refresh Switchers */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium transition ${
              viewport === 'desktop' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium transition ${
              viewport === 'tablet' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium transition ${
              viewport === 'mobile' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-slate-800 my-auto mx-1" />
          <button
            onClick={handleRefreshPreview}
            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition"
            title="Reload Preview Frame"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`p-1.5 rounded-lg text-xs transition ${
              showConsole ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Live Console Logs"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handleUndo}
              disabled={historyIdx <= 0}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition"
              title="Undo edit (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIdx >= history.length - 1}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition"
              title="Redo edit"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleManualSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Save className="w-3.5 h-3.5 text-sky-400" />
            <span>Save</span>
          </button>

          <button
            onClick={handleExportHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            title="Download Standalone HTML file"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">HTML</span>
          </button>

          <button
            onClick={handleExportZip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold transition shadow-md shadow-sky-500/20"
            title="Export complete deployment ZIP with .nojekyll & workflow"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Export ZIP</span>
          </button>

          <button
            onClick={() => {
              handleManualSave();
              setActiveTab('publishing');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20"
            title="Deploy directly to GitHub Pages"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Publish</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split Grid: Code Editor (Left) & Live Preview (Right) */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${isFullscreen ? 'h-[calc(100vh-100px)]' : 'h-[640px]'}`}>
        
        {/* LEFT COLUMN: Code Editor Tabs */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Editor Tab Navigation */}
          <div className="flex items-center justify-between bg-slate-950 px-3 py-2 border-b border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditorTab('html')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  editorTab === 'html'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-rose-400" />
                <span>HTML</span>
              </button>

              <button
                onClick={() => setEditorTab('css')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  editorTab === 'css'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>CSS</span>
              </button>

              <button
                onClick={() => setEditorTab('js')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  editorTab === 'js'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5 text-amber-400" />
                <span>JavaScript</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              {editorTab === 'html' && 'index.html (Semantic Markup)'}
              {editorTab === 'css' && 'styles.css (Responsive Rules)'}
              {editorTab === 'js' && 'app.js (Zero-Error Interactivity)'}
            </div>
          </div>

          {/* Text Editor Area */}
          <div className="flex-1 relative bg-slate-950 font-mono text-xs">
            {editorTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => handleHtmlChange(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-rose-500/30"
                placeholder="<!-- Paste or edit HTML markup here -->"
              />
            )}

            {editorTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => handleCssChange(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 bg-transparent text-sky-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-sky-500/30"
                placeholder="/* CSS styling rules */"
              />
            )}

            {editorTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => handleJsChange(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 bg-transparent text-amber-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-amber-500/30"
                placeholder="// Interactive client-side JavaScript"
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Sandboxed Preview */}
        <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Preview Header Address Bar */}
          <div className="flex items-center justify-between bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <div className="ml-2 font-mono text-[11px] text-slate-400 bg-slate-900 px-3 py-0.5 rounded-md border border-slate-800 flex items-center gap-1.5">
                <span className="text-emerald-400">https://</span>
                <span>saipratap-ux.github.io/OWN-Free-hosting-and-create-website/</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              Viewport: <strong className="text-slate-300 capitalize">{viewport}</strong>
            </div>
          </div>

          {/* Preview Iframe Container */}
          <div className="flex-1 bg-slate-950/80 p-2 overflow-auto flex justify-center items-start">
            <div
              className={`h-full transition-all duration-300 bg-white rounded-lg shadow-2xl overflow-hidden ${
                viewport === 'desktop'
                  ? 'w-full'
                  : viewport === 'tablet'
                  ? 'w-[768px] border-x border-slate-700'
                  : 'w-[375px] border-x border-slate-700'
              }`}
            >
              <iframe
                key={previewKey}
                ref={iframeRef}
                title="SaipratapS❤️C Sandbox Live Preview"
                srcDoc={assembledPreviewDoc}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              />
            </div>
          </div>

          {/* Optional Live Console Output Drawer */}
          {showConsole && (
            <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col font-mono text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  Preview Runtime Console ({consoleLogs.length} events)
                </span>
                <button
                  onClick={() => setConsoleLogs([])}
                  className="hover:text-white transition"
                >
                  Clear Logs
                </button>
              </div>
              <div className="flex-1 p-2 overflow-y-auto space-y-1">
                {consoleLogs.length === 0 ? (
                  <div className="text-slate-600 italic">No console logs captured yet. Trigger actions in the preview!</div>
                ) : (
                  consoleLogs.map((log, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 text-[11px] ${
                        log.type === 'error'
                          ? 'text-rose-400'
                          : log.type === 'warn'
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      <span className="text-slate-600 text-[10px]">{log.time}</span>
                      <span className="font-semibold uppercase text-[9px] px-1 rounded bg-slate-900">
                        {log.type}
                      </span>
                      <span className="break-all">{log.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-in slide-in-from-bottom">
          <Check className="w-4 h-4" />
          <span>Project saved successfully!</span>
        </div>
      )}

    </div>
  );
};
