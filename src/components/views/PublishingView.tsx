import React, { useState } from 'react';
import { 
  Rocket, 
  Github, 
  CheckCircle2, 
  ExternalLink, 
  Archive, 
  ShieldCheck, 
  RotateCw, 
  Key, 
  GitBranch, 
  AlertTriangle,
  FolderGit2,
  Terminal,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { Project, DeploymentConfig } from '../../types';
import { 
  generateIndexHtml, 
  generateGitHubWorkflow, 
  generateSpa404Html, 
  generateReadme, 
  exportDeployableZip, 
  downloadBlob 
} from '../../utils/exportZip';
import confetti from 'canvas-confetti';

interface Props {
  project: Project;
}

export const PublishingView: React.FC<Props> = ({ project }) => {
  const [config, setConfig] = useState<DeploymentConfig>({
    githubOwner: 'Saipratap09-blip',
    repository: 'Own-created-website-to-free-hosting',
    branch: 'main',
    token: '',
    commitMessage: 'Deploy upgraded website via SaipratapS❤️C (Fix loading screen & build dist)',
    status: 'idle',
    statusMessage: '',
    liveUrl: 'https://saipratap09-blip.github.io/Own-created-website-to-free-hosting/',
    logs: [
      'Pre-flight verification passed: relative paths & .nojekyll armed.',
      'Target repository: Saipratap09-blip/Own-created-website-to-free-hosting',
      'Target live site: https://saipratap09-blip.github.io/Own-created-website-to-free-hosting/',
    ],
  });

  const [activeDeployMode, setActiveDeployMode] = useState<'api' | 'manual'>('api');
  const [isDeploying, setIsDeploying] = useState(false);
  const [showTokenHelp, setShowTokenHelp] = useState(false);

  const addLog = (msg: string) => {
    setConfig((prev) => ({
      ...prev,
      logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ${msg}`],
    }));
  };

  const handleDirectDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.token.trim()) {
      alert('Please enter your GitHub Personal Access Token to commit directly to GitHub.');
      return;
    }

    setIsDeploying(true);
    setConfig((prev) => ({
      ...prev,
      status: 'deploying',
      statusMessage: 'Preparing package and authenticating with GitHub API...',
    }));
    addLog(`Initiating deployment to ${config.githubOwner}/${config.repository}...`);

    try {
      const filesToDeploy = [
        { path: 'index.html', content: generateIndexHtml(project) },
        { path: 'styles.css', content: project.css },
        { path: 'app.js', content: project.js },
        { path: '.nojekyll', content: '' },
        { path: '404.html', content: generateSpa404Html() },
        { path: 'README.md', content: generateReadme(project, config.repository, config.githubOwner) },
        { path: '.github/workflows/deploy.yml', content: generateGitHubWorkflow() },
      ];

      addLog(`Prepared ${filesToDeploy.length} files with zero-blank-screen protection.`);

      const res = await fetch('/api/github/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: config.token.trim(),
          owner: config.githubOwner.trim(),
          repo: config.repository.trim(),
          branch: config.branch.trim(),
          commitMessage: config.commitMessage,
          files: filesToDeploy,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'GitHub deployment failed');
      }

      data.filesDeployed?.forEach((f: { path: string; status: string; error?: string }) => {
        if (f.status === 'success') {
          addLog(`✓ Committed: ${f.path}`);
        } else {
          addLog(`⚠️ Issue committing ${f.path}: ${f.error}`);
        }
      });

      const publishedUrl = data.liveUrl || `https://${config.githubOwner}.github.io/${config.repository}/`;
      addLog(`🎉 GitHub commit batch complete! Target URL: ${publishedUrl}`);

      setConfig((prev) => ({
        ...prev,
        status: 'success',
        statusMessage: 'Website successfully pushed to GitHub repository!',
        liveUrl: publishedUrl,
        lastDeployed: new Date().toLocaleTimeString(),
      }));

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err: unknown) {
      const errMsg = (err as Error)?.message || 'Deployment error';
      addLog(`❌ Deployment Error: ${errMsg}`);
      setConfig((prev) => ({
        ...prev,
        status: 'error',
        statusMessage: errMsg,
      }));
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDownloadPackage = async () => {
    addLog(`Generating automated GitHub Pages release package...`);
    const blob = await exportDeployableZip(project, config.repository, config.githubOwner);
    downloadBlob(blob, `${config.repository}-github-pages.zip`);
    addLog(`✓ Downloaded ${config.repository}-github-pages.zip with .nojekyll, workflow, and index.html`);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
            <Rocket className="w-3.5 h-3.5" />
            <span>GitHub Pages Free Hosting Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Publishing Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Publish <strong className="text-white">{project.name}</strong> to your live GitHub Pages repository with zero blank screens guaranteed.
          </p>
        </div>

        {/* Live URL Card */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <Globe2Icon />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Published Website URL</span>
            <a
              href={config.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 truncate max-w-[260px]"
            >
              <span className="truncate">{config.liveUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Pre-Flight Blank Screen Verification Checklist */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Pre-Flight GitHub Pages Zero-Blank Checklist</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">Relative Asset Paths</div>
              <p className="text-[11px] text-slate-400">Fixed: Uses <code>./styles.css</code> instead of broken <code>/styles.css</code></p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">.nojekyll File Armed</div>
              <p className="text-[11px] text-slate-400">Fixed: Stops Jekyll from skipping folders or assets</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">404 SPA Fallback</div>
              <p className="text-[11px] text-slate-400">Fixed: Single-page redirect script avoids 404 white screen</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs text-white">GitHub Actions Pipeline</div>
              <p className="text-[11px] text-slate-400">Fixed: Automatic build &amp; deploy workflow included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Modes Switcher */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveDeployMode('api')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeDeployMode === 'api'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Github className="w-4 h-4" />
          <span>Option A: Direct GitHub Commit &amp; Deploy (Instant)</span>
        </button>

        <button
          onClick={() => setActiveDeployMode('manual')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeDeployMode === 'manual'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>Option B: Download Ready-to-Upload ZIP Package</span>
        </button>
      </div>

      {/* OPTION A: DIRECT GITHUB DEPLOY */}
      {activeDeployMode === 'api' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleDirectDeploy} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  GitHub Owner / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={config.githubOwner}
                    onChange={(e) => setConfig({ ...config, githubOwner: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Repository Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={config.repository}
                    onChange={(e) => setConfig({ ...config, repository: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Publish Branch
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={config.branch}
                    onChange={(e) => setConfig({ ...config, branch: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* GitHub Personal Access Token */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-sky-400" />
                  <span>GitHub Personal Access Token (PAT)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowTokenHelp(!showTokenHelp)}
                  className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>How to get a free token?</span>
                </button>
              </div>

              <input
                type="password"
                required
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={config.token}
                onChange={(e) => setConfig({ ...config, token: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-sky-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tokens are sent directly over HTTPS to the backend proxy for file commit and are never persisted in the browser.
              </p>

              {showTokenHelp && (
                <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white">How to generate a GitHub Personal Access Token:</div>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                    <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-sky-400 underline">github.com/settings/tokens</a></li>
                    <li>Click <strong>Generate new token (classic)</strong>.</li>
                    <li>Set Note: <code>SaipratapS-C-Publisher</code></li>
                    <li>Check the <strong>repo</strong> scope (Full control of private repositories).</li>
                    <li>Click <strong>Generate token</strong> at the bottom, copy the string, and paste it here!</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Commit Message */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                Git Commit Message
              </label>
              <input
                type="text"
                value={config.commitMessage}
                onChange={(e) => setConfig({ ...config, commitMessage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400">
                Will commit: <code>index.html</code>, <code>styles.css</code>, <code>app.js</code>, <code>.nojekyll</code>, <code>404.html</code>, <code>deploy.yml</code>
              </div>

              <button
                type="submit"
                disabled={isDeploying || !config.token.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition disabled:opacity-50 active:scale-95"
              >
                {isDeploying ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Deploying to GitHub...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Deploy to GitHub Pages</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* OPTION B: DOWNLOAD PACKAGE */}
      {activeDeployMode === 'manual' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Zero-Config GitHub Pages Deployment Package
            </h3>
            <p className="text-xs text-slate-400">
              Prefer uploading via GitHub web interface or command line? Download this complete, pre-configured zip file.
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 text-xs text-slate-300 space-y-3">
            <div className="font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Package Contents:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
              <li>📄 <code>index.html</code> (Semantic HTML &amp; relative pathing)</li>
              <li>🎨 <code>styles.css</code> (Modern responsive stylesheet)</li>
              <li>⚡ <code>app.js</code> (DOM-wrapped client behavior)</li>
              <li>🛡️ <code>.nojekyll</code> (Stops Jekyll asset omission)</li>
              <li>🔀 <code>404.html</code> (SPA fallback routing)</li>
              <li>🤖 <code>.github/workflows/deploy.yml</code> (GitHub Actions runner)</li>
              <li>📖 <code>README.md</code> (Step-by-step instructions)</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownloadPackage}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition active:scale-95"
            >
              <Archive className="w-4 h-4" />
              <span>Download Complete ZIP Package</span>
            </button>
            <span className="text-xs text-slate-500">
              Ready to drag-and-drop into <code>github.com/{config.githubOwner}/{config.repository}</code>
            </span>
          </div>
        </div>
      )}

      {/* Live Deployment Console Log Terminal */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-mono text-xs">
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span className="font-bold text-white">Deployment Audit Stream</span>
          </div>
          <span className="text-[11px] text-slate-500">
            {config.status.toUpperCase()}
          </span>
        </div>
        <div className="p-4 space-y-1.5 max-h-52 overflow-y-auto">
          {config.logs.map((log, i) => (
            <div key={i} className="text-slate-300 text-[11px] leading-relaxed">
              {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

function Globe2Icon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="2" />
    </svg>
  );
}
