// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import JSZip from "jszip";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
app.use(express.json({ limit: "15mb" }));
var ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    platform: "SaipratapS\u2764\uFE0FC Free Hosting & Website Builder",
    version: "2.0.0",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    githubPagesTarget: "Saipratap09-blip/Own-created-website-to-free-hosting"
  });
});
app.post("/api/generate-website", async (req, res) => {
  const { prompt, style = "modern", websiteName = "My Awesome Website", category = "general" } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are an elite, modern frontend web architect for "SaipratapS\u2764\uFE0FC".
You generate complete, production-ready, fully responsive, zero-error static websites.
The website must be standalone HTML, CSS, and JavaScript.
CRITICAL RULES for GitHub Pages compatibility:
1. Do not use absolute paths (e.g. NEVER "/styles.css" or "/app.js"). Only relative paths or embed them cleanly.
2. In the HTML, provide clean semantic markup, engaging visual design, modern responsive layout, interactive sections, accessible tags, and dynamic UI elements.
3. In CSS, use modern styling: flexbox, grid, gradients, CSS custom properties, smooth transitions, glassmorphism, responsive breakpoints (@media).
4. In JavaScript, add real interactive behavior (mobile menu toggles, modal dialogs, interactive tabs/cards, counter animations, search filter or mini action, and event listeners wrapped in DOMContentLoaded). Ensure NO syntax errors or undefined variables.
5. Provide pure valid JSON matching the schema.`;
      const promptMessage = `Generate a complete, high-quality, fully functional website based on the following requirements:
Category: ${category}
Design Vibe/Style: ${style}
Website Name: ${websiteName}
User Prompt: ${prompt}

Return:
- title: clear title
- description: concise summary
- html: full HTML body content (semantic <header>, <main>, <section>s, <footer>)
- css: rich modern CSS styles
- js: client-side JavaScript for interactivity
- features: list of 4-6 key features generated`;
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("AI request timed out, switching to smart synthesis")), 7e3)
      );
      const response = await Promise.race([
        ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: promptMessage,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                html: { type: Type.STRING, description: "Semantic HTML markup" },
                css: { type: Type.STRING, description: "Complete CSS rules" },
                js: { type: Type.STRING, description: "Interactive JavaScript" },
                features: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of features implemented"
                }
              },
              required: ["title", "description", "html", "css", "js", "features"]
            }
          }
        }),
        timeoutPromise
      ]);
      const responseText = response.text;
      if (responseText) {
        try {
          const parsed = JSON.parse(responseText);
          return res.json({ success: true, website: parsed, source: "gemini-3.8-flash" });
        } catch {
        }
      }
    } catch (err) {
      console.warn("Gemini generation notice:", err?.message || err);
    }
  }
  const synthesized = synthesizeWebsite(prompt, style, websiteName, category);
  return res.json({
    success: true,
    website: synthesized,
    source: "intelligent-engine",
    note: process.env.GEMINI_API_KEY ? "Generated with offline recovery engine" : "Generated with smart built-in template synthesizer (Gemini API key not configured in secrets)"
  });
});
app.post("/api/github/deploy", async (req, res) => {
  const { token, owner, repo, branch = "main", files, commitMessage = "Deploy website via SaipratapS\u2764\uFE0FC" } = req.body;
  if (!token) {
    return res.status(400).json({ error: "GitHub Personal Access Token is required for direct deployment." });
  }
  if (!owner || !repo) {
    return res.status(400).json({ error: "Repository owner and repo name are required." });
  }
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "At least one file is required for deployment." });
  }
  try {
    const results = [];
    const headers = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "SaipratapS-C-Website-Builder"
    };
    const userRes = await fetch("https://api.github.com/user", { headers });
    if (!userRes.ok) {
      return res.status(401).json({ error: "Invalid GitHub token or insufficient scope. Ensure `repo` scope is granted." });
    }
    for (const file of files) {
      const filePath = file.path.replace(/^\//, "");
      const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
      let sha;
      const existingRes = await fetch(getFileUrl, { headers });
      if (existingRes.ok) {
        const existingData = await existingRes.json();
        sha = existingData.sha;
      }
      const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      const base64Content = Buffer.from(file.content, "utf-8").toString("base64");
      const commitRes = await fetch(putUrl, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: `${commitMessage}: ${filePath}`,
          content: base64Content,
          branch,
          ...sha ? { sha } : {}
        })
      });
      if (!commitRes.ok) {
        const errData = await commitRes.json();
        results.push({ path: filePath, status: "error", error: errData.message });
      } else {
        results.push({ path: filePath, status: "success" });
      }
    }
    let pagesUrl = `https://${owner}.github.io/${repo}/`;
    try {
      const pagesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, { headers });
      if (pagesRes.ok) {
        const pagesData = await pagesRes.json();
        if (pagesData.html_url) {
          pagesUrl = pagesData.html_url;
        }
      }
    } catch {
    }
    res.json({
      success: true,
      owner,
      repo,
      branch,
      liveUrl: pagesUrl,
      filesDeployed: results
    });
  } catch (err) {
    res.status(500).json({ error: "GitHub deployment failed: " + (err?.message || "Unknown error") });
  }
});
app.get("/api/download-production-bundle", async (req, res) => {
  try {
    const distPath = path.resolve(__dirname, "dist");
    if (!fs.existsSync(distPath)) {
      return res.status(404).json({ error: "Production dist directory not found. Please build first." });
    }
    const zip = new JSZip();
    async function addDirToZip(dir, zipFolder) {
      const entries = await fs.promises.readdir(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = await fs.promises.stat(fullPath);
        if (stat.isDirectory()) {
          const subFolder = zipFolder.folder(entry);
          if (subFolder) await addDirToZip(fullPath, subFolder);
        } else {
          const content = await fs.promises.readFile(fullPath);
          zipFolder.file(entry, content);
        }
      }
    }
    await addDirToZip(distPath, zip);
    zip.file(".nojekyll", "");
    if (fs.existsSync(path.join(distPath, "index.html"))) {
      const indexContent = await fs.promises.readFile(path.join(distPath, "index.html"));
      zip.file("404.html", indexContent);
    }
    zip.file(
      "DEPLOYMENT-INSTRUCTIONS.txt",
      `========================================================================
SaipratapS\u2764\uFE0FC \u2014 Pre-Compiled Production Release for GitHub Pages
Target: https://saipratap09-blip.github.io/Own-created-website-to-free-hosting/
========================================================================

WHY THIS FIXES THE BLANK WHITE SCREEN:
In your original repository, index.html referenced:
  <script type="module" src="/src/main.tsx"></script>
Browsers cannot run uncompiled .tsx TypeScript files directly.
This package contains the pre-compiled production JavaScript and CSS
with RELATIVE paths (./assets/...) that load seamlessly anywhere!

HOW TO DEPLOY (takes 30 seconds):
1. Extract all files from this zip.
2. In your GitHub repository:
   https://github.com/Saipratap09-blip/Own-created-website-to-free-hosting
3. Drag and drop all extracted files (index.html, assets/, .nojekyll, 404.html)
   directly into the root of the "main" branch.
4. Go to: Settings > Pages.
   - Source: Deploy from a branch
   - Branch: main, Folder: / (root)
   - Click Save.
5. Visit your live site:
   https://saipratap09-blip.github.io/Own-created-website-to-free-hosting/
========================================================================
`
    );
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="Own-created-website-to-free-hosting-dist.zip"');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate production bundle: " + (err?.message || "Unknown error") });
  }
});
function synthesizeWebsite(prompt, style, name, category) {
  const cleanName = name || "Saipratap Studio";
  const isGaming = prompt.toLowerCase().includes("game") || category === "gaming";
  const isEcommerce = prompt.toLowerCase().includes("shop") || prompt.toLowerCase().includes("store") || category === "ecommerce";
  const isPortfolio = prompt.toLowerCase().includes("portfolio") || prompt.toLowerCase().includes("resume") || category === "portfolio";
  if (isGaming) {
    return {
      title: `${cleanName} - Gaming Portal & Tournaments`,
      description: "Ultra-modern esports arena, tournament leaderboards, and gaming clan hub.",
      features: ["Live Interactive Mini-Game", "Dynamic Leaderboard", "Gamer Clan Roster", "Twitch Stream Showcase", "Dark Neon Aesthetics"],
      html: `<header class="hero-section">
  <div class="nav-bar">
    <div class="logo">\u26A1 ${cleanName}</div>
    <nav class="nav-links">
      <a href="#arena">Battle Arena</a>
      <a href="#leaderboard">Leaderboard</a>
      <a href="#tournaments">Tournaments</a>
      <a href="#join" class="btn-glow">Join Clan</a>
    </nav>
  </div>
  <div class="hero-content">
    <span class="badge">SEASON 4 LIVE</span>
    <h1>Dominate the Digital Arena</h1>
    <p>Join over 45,000 elite competitive players. Test your reflexes, join tournaments, and claim your crown.</p>
    <div class="hero-actions">
      <button id="playBtn" class="btn-primary">Play Reflex Game</button>
      <a href="#leaderboard" class="btn-secondary">View Rankings</a>
    </div>
  </div>
</header>

<section id="arena" class="arena-section">
  <h2>Target Reflex Arena</h2>
  <p>Click targets as fast as they appear! Score points before the timer runs out.</p>
  <div class="game-dashboard">
    <div class="stat-box">Score: <span id="gameScore">0</span></div>
    <div class="stat-box">Time Left: <span id="gameTimer">15</span>s</div>
    <button id="startGameBtn" class="btn-accent">Start Match</button>
  </div>
  <div id="targetBox" class="target-field">
    <div id="gameNotice" class="game-notice">Press "Start Match" to begin!</div>
  </div>
</section>

<section id="leaderboard" class="leaderboard-section">
  <h2>Global Clan Leaderboard</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Rank</th><th>Player</th><th>Matches</th><th>Win Rate</th><th>Rating</th></tr>
      </thead>
      <tbody>
        <tr><td>\u{1F947} 1</td><td><strong>VortexGhost</strong></td><td>384</td><td>79.4%</td><td>2,940</td></tr>
        <tr><td>\u{1F948} 2</td><td><strong>CyberValkyrie</strong></td><td>321</td><td>76.1%</td><td>2,810</td></tr>
        <tr><td>\u{1F949} 3</td><td><strong>PixelStriker</strong></td><td>290</td><td>74.2%</td><td>2,760</td></tr>
        <tr><td>4</td><td><strong>ShadowSai</strong></td><td>245</td><td>71.8%</td><td>2,690</td></tr>
      </tbody>
    </table>
  </div>
</section>

<footer>
  <p>&copy; 2026 ${cleanName}. Hosted for free on GitHub Pages via SaipratapS\u2764\uFE0FC.</p>
</footer>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
body { background: #0a0b10; color: #e2e8f0; line-height: 1.6; }
.nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 2rem; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; border-bottom: 1px solid #1e293b; }
.logo { font-size: 1.4rem; font-weight: 800; color: #38bdf8; letter-spacing: 1px; }
.nav-links a { color: #94a3b8; text-decoration: none; margin-left: 1.5rem; font-size: 0.95rem; transition: color 0.2s; }
.nav-links a:hover { color: #38bdf8; }
.btn-glow { background: #3b82f6; color: white !important; padding: 0.5rem 1.2rem; border-radius: 9999px; font-weight: 600; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
.hero-section { padding: 4rem 2rem; text-align: center; background: radial-gradient(circle at 50% 20%, #1e1b4b, #0a0b10); }
.badge { display: inline-block; padding: 0.25rem 0.8rem; background: #22c55e20; color: #4ade80; border: 1px solid #22c55e40; border-radius: 999px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem; }
.hero-section h1 { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; background: linear-gradient(135deg, #60a5fa, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-section p { font-size: 1.15rem; color: #94a3b8; max-width: 600px; margin: 0 auto 2rem; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; }
.btn-primary { background: linear-gradient(135deg, #3b82f6, #8b5cf6); border: none; color: white; padding: 0.75rem 1.8rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: transform 0.2s; }
.btn-primary:hover { transform: translateY(-2px); }
.btn-secondary { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 0.75rem 1.8rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
.arena-section { max-width: 800px; margin: 3rem auto; padding: 2rem; background: #111827; border-radius: 16px; border: 1px solid #1f2937; text-align: center; }
.game-dashboard { display: flex; justify-content: center; gap: 2rem; margin: 1.5rem 0; align-items: center; }
.stat-box { font-size: 1.1rem; font-weight: bold; background: #1f2937; padding: 0.5rem 1.2rem; border-radius: 8px; }
.target-field { height: 260px; background: #030712; border-radius: 12px; position: relative; overflow: hidden; border: 2px dashed #374151; display: flex; align-items: center; justify-content: center; }
.target-item { width: 44px; height: 44px; background: #f43f5e; border-radius: 50%; position: absolute; cursor: crosshair; box-shadow: 0 0 16px #f43f5e; transition: transform 0.1s; }
.btn-accent { background: #10b981; color: white; border: none; padding: 0.6rem 1.4rem; border-radius: 8px; font-weight: bold; cursor: pointer; }
.leaderboard-section { max-width: 900px; margin: 4rem auto; padding: 0 1rem; }
.table-wrap { overflow-x: auto; margin-top: 1.5rem; }
table { width: 100%; border-collapse: collapse; text-align: left; background: #111827; border-radius: 12px; overflow: hidden; }
th, td { padding: 1rem 1.5rem; border-bottom: 1px solid #1f2937; }
th { background: #1f2937; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; }
footer { text-align: center; padding: 3rem; color: #64748b; font-size: 0.9rem; border-top: 1px solid #1e293b; margin-top: 4rem; }`,
      js: `document.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let timeLeft = 15;
  let timerId = null;
  let activeTarget = null;

  const scoreEl = document.getElementById('gameScore');
  const timerEl = document.getElementById('gameTimer');
  const startBtn = document.getElementById('startGameBtn');
  const playBtn = document.getElementById('playBtn');
  const targetBox = document.getElementById('targetBox');
  const gameNotice = document.getElementById('gameNotice');

  function spawnTarget() {
    if (activeTarget) activeTarget.remove();
    const target = document.createElement('div');
    target.className = 'target-item';
    const boxRect = targetBox.getBoundingClientRect();
    const maxX = Math.max(20, boxRect.width - 60);
    const maxY = Math.max(20, boxRect.height - 60);
    target.style.left = Math.floor(Math.random() * maxX) + 'px';
    target.style.top = Math.floor(Math.random() * maxY) + 'px';

    target.addEventListener('click', () => {
      score += 10;
      if (scoreEl) scoreEl.textContent = score;
      spawnTarget();
    });

    targetBox.appendChild(target);
    activeTarget = target;
  }

  function startGame() {
    score = 0;
    timeLeft = 15;
    if (scoreEl) scoreEl.textContent = '0';
    if (timerEl) timerEl.textContent = '15';
    if (gameNotice) gameNotice.style.display = 'none';

    clearInterval(timerId);
    spawnTarget();

    timerId = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        if (activeTarget) activeTarget.remove();
        if (gameNotice) {
          gameNotice.textContent = 'Game Over! Final Score: ' + score;
          gameNotice.style.display = 'block';
        }
      }
    }, 1000);
  }

  if (startBtn) startBtn.addEventListener('click', startGame);
  if (playBtn) playBtn.addEventListener('click', () => {
    document.getElementById('arena')?.scrollIntoView({ behavior: 'smooth' });
    startGame();
  });
});`
    };
  }
  return {
    title: `${cleanName} - Official Website`,
    description: `A fast, responsive, modern digital presence created with SaipratapS\u2764\uFE0FC.`,
    features: ["Responsive Glassmorphism Navigation", "Interactive Hero CTA", "Features Showcase Grid", "Contact & Newsletter Form", "Optimized for GitHub Pages"],
    html: `<header class="site-header">
  <div class="container nav-row">
    <div class="brand">\u2728 ${cleanName}</div>
    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="#get-started" class="btn-cta">Get Started</a>
    </nav>
  </div>
</header>

<main>
  <section class="hero-section">
    <div class="container hero-inner">
      <span class="badge">\u{1F680} LIVE & OPTIMIZED</span>
      <h1>Build Without Limits. Publish With Confidence.</h1>
      <p>Transforming ideas into high-speed, modern websites deployed seamlessly to GitHub Pages with guaranteed uptime and zero blank screens.</p>
      <div class="cta-group">
        <a href="#features" class="btn btn-primary">Explore Features</a>
        <button id="demoActionBtn" class="btn btn-secondary">Interactive Demo</button>
      </div>
    </div>
  </section>

  <section id="features" class="features-section">
    <div class="container">
      <div class="section-heading">
        <h2>Engineered For Peak Performance</h2>
        <p>Everything you need to launch, scale, and captivate your audience.</p>
      </div>
      <div class="card-grid">
        <div class="feature-card">
          <div class="card-icon">\u26A1</div>
          <h3>Ultra Fast Load Times</h3>
          <p>Zero bloat, pure vanilla performance optimized for sub-second page loads across every device.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">\u{1F6E1}\uFE0F</div>
          <h3>Zero Blank-Screen Guard</h3>
          <p>Smart relative asset pathing and robust error boundaries ensure your site renders reliably everywhere.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">\u{1F4F1}</div>
          <h3>Responsive Touch Layouts</h3>
          <p>Pixel-perfect display on iPhones, Android devices, tablets, and wide 4K desktop screens.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="newsletter-section">
    <div class="container">
      <div class="newsletter-box">
        <h2>Stay Connected With ${cleanName}</h2>
        <p>Subscribe for updates, product releases, and exclusive design templates.</p>
        <form id="contactForm" class="subscribe-form">
          <input type="email" id="emailInput" placeholder="Enter your email address..." required>
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
        <div id="formFeedback" class="feedback-msg"></div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <p>&copy; 2026 ${cleanName}. Built with \u2764\uFE0F and hosted for free on GitHub Pages.</p>
  </div>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
body { background: #0f172a; color: #f8fafc; line-height: 1.6; }
.container { max-width: 1140px; margin: 0 auto; padding: 0 1.5rem; }
.site-header { position: sticky; top: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid #1e293b; z-index: 100; }
.nav-row { display: flex; justify-content: space-between; align-items: center; height: 70px; }
.brand { font-size: 1.35rem; font-weight: 800; background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.nav-links a { color: #94a3b8; text-decoration: none; margin-left: 1.5rem; font-weight: 500; font-size: 0.95rem; transition: color 0.2s; }
.nav-links a:hover { color: #38bdf8; }
.btn-cta { background: #0284c7; color: white !important; padding: 0.5rem 1.25rem; border-radius: 999px; }
.hero-section { padding: 5rem 0; text-align: center; background: radial-gradient(circle at 50% 10%, #1e293b, #0f172a); }
.badge { display: inline-block; padding: 0.35rem 1rem; background: #0284c720; color: #38bdf8; border: 1px solid #0284c740; border-radius: 999px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1.25rem; letter-spacing: 0.5px; }
.hero-section h1 { font-size: 3.2rem; font-weight: 900; line-height: 1.2; margin-bottom: 1.25rem; max-width: 800px; margin-left: auto; margin-right: auto; }
.hero-section p { font-size: 1.2rem; color: #94a3b8; max-width: 680px; margin: 0 auto 2rem; }
.cta-group { display: flex; gap: 1rem; justify-content: center; }
.btn { display: inline-block; padding: 0.85rem 1.85rem; border-radius: 8px; font-weight: 600; text-decoration: none; cursor: pointer; transition: all 0.2s; border: none; font-size: 1rem; }
.btn-primary { background: #0284c7; color: #fff; }
.btn-primary:hover { background: #0369a1; transform: translateY(-1px); }
.btn-secondary { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; }
.btn-secondary:hover { background: #334155; }
.features-section { padding: 5rem 0; }
.section-heading { text-align: center; margin-bottom: 3rem; }
.section-heading h2 { font-size: 2.2rem; margin-bottom: 0.5rem; }
.section-heading p { color: #94a3b8; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.feature-card { background: #1e293b50; border: 1px solid #334155; padding: 2rem; border-radius: 12px; transition: transform 0.2s, border-color 0.2s; }
.feature-card:hover { transform: translateY(-4px); border-color: #38bdf8; }
.card-icon { font-size: 2rem; margin-bottom: 1rem; }
.feature-card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: #f1f5f9; }
.feature-card p { color: #94a3b8; font-size: 0.95rem; }
.newsletter-section { padding: 4rem 0; }
.newsletter-box { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155; padding: 3rem; border-radius: 16px; text-align: center; max-width: 700px; margin: 0 auto; }
.newsletter-box h2 { font-size: 1.8rem; margin-bottom: 0.5rem; }
.newsletter-box p { color: #94a3b8; margin-bottom: 1.5rem; }
.subscribe-form { display: flex; gap: 0.75rem; max-width: 450px; margin: 0 auto; }
.subscribe-form input { flex: 1; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: white; font-size: 0.95rem; }
.feedback-msg { margin-top: 1rem; font-size: 0.95rem; color: #34d399; font-weight: 500; display: none; }
.site-footer { padding: 2.5rem 0; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 0.9rem; }
@media (max-width: 768px) {
  .hero-section h1 { font-size: 2.2rem; }
  .subscribe-form { flex-direction: column; }
  .nav-links a:not(.btn-cta) { display: none; }
}`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const demoBtn = document.getElementById('demoActionBtn');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput')?.value;
      feedback.textContent = '\u{1F389} Thank you! ' + email + ' has been registered successfully.';
      feedback.style.display = 'block';
      form.reset();
    });
  }

  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      alert('\u2728 Interactive demo triggered! This website is 100% functional, responsive, and ready for GitHub Pages.');
    });
  }
});`
  };
}
async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SaipratapS\u2764\uFE0FC server running on port ${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Fatal server startup error:", err);
  process.exit(1);
});
