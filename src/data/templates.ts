import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'cyberpulse-gaming',
    title: 'CyberPulse Esports & Gaming Arena',
    category: 'gaming',
    badge: 'Popular • Interactive Game',
    description: 'High-octane gaming portal featuring a live reflex reaction mini-game, real-time leaderboard, and clan roster.',
    tags: ['Gaming', 'Interactive Mini-Game', 'Esports', 'Leaderboard', 'Dark Mode'],
    features: [
      'Built-in Target Reflex Mini-Game with Live Score and Countdown',
      'Dynamic Global Clan Leaderboard',
      'Twitch & Discord Community Stream Cards',
      'Cyberpunk Glassmorphism Neon Styling',
      '100% Zero-Dependency Standalone Code'
    ],
    html: `<header class="game-header">
  <div class="nav-container">
    <div class="brand">
      <span class="brand-icon">⚡</span>
      <span class="brand-text">CYBERPULSE</span>
    </div>
    <nav class="nav-links">
      <a href="#arena">Reflex Arena</a>
      <a href="#leaderboard">Leaderboard</a>
      <a href="#clans">Clans</a>
      <button id="navPlayBtn" class="btn-neon">Play Game</button>
    </nav>
  </div>
</header>

<main>
  <section class="hero-arena">
    <div class="hero-content">
      <span class="season-pill">🔴 SEASON 4 CHAMPIONSHIPS</span>
      <h1>ELITE REFLEX BATTLEGROUND</h1>
      <p>Test your target speed, outscore international players, and lead your squad to the top of the leaderboards.</p>
      <div class="cta-row">
        <a href="#arena" class="btn-main">Enter Arena</a>
        <a href="#leaderboard" class="btn-ghost">View Rankings</a>
      </div>
    </div>
  </section>

  <!-- Interactive Mini-Game Section -->
  <section id="arena" class="game-section">
    <div class="game-card">
      <div class="game-head">
        <h2>Target Reflex Mini-Game</h2>
        <p>Click the glowing energy cores as fast as they spawn! How high can you score in 15 seconds?</p>
      </div>

      <div class="game-hud">
        <div class="hud-item">Score: <span id="currentScore" class="hud-val">0</span></div>
        <div class="hud-item">Time Left: <span id="timeRemaining" class="hud-val">15</span>s</div>
        <div class="hud-item">High Score: <span id="highScore" class="hud-val">0</span></div>
        <button id="startMatchBtn" class="btn-glow">Start Match</button>
      </div>

      <div id="targetArena" class="target-field">
        <div id="statusPrompt" class="status-overlay">Click "Start Match" to begin!</div>
      </div>
    </div>
  </section>

  <!-- Live Dynamic Leaderboard -->
  <section id="leaderboard" class="board-section">
    <div class="board-container">
      <div class="section-title">
        <h2>Global Leaderboard</h2>
        <p>Updated live based on reflex arena performance.</p>
      </div>
      <div class="table-wrap">
        <table id="leaderboardTable">
          <thead>
            <tr><th>Rank</th><th>Agent</th><th>Score</th><th>Accuracy</th><th>Tier</th></tr>
          </thead>
          <tbody id="leaderboardBody">
            <tr class="top-rank"><td>🥇 1</td><td>VortexHunter</td><td>180</td><td>98.4%</td><td><span class="tier diamond">Diamond</span></td></tr>
            <tr class="top-rank"><td>🥈 2</td><td>CyberValkyrie</td><td>160</td><td>96.1%</td><td><span class="tier platinum">Platinum</span></td></tr>
            <tr class="top-rank"><td>🥉 3</td><td>PixelStriker</td><td>140</td><td>94.7%</td><td><span class="tier gold">Gold</span></td></tr>
            <tr><td>4</td><td>ShadowSai</td><td>120</td><td>91.2%</td><td><span class="tier silver">Silver</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</main>

<footer class="game-footer">
  <p>&copy; 2026 CYBERPULSE • Powered by SaipratapS❤️C Free Hosting</p>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
body { background: #07090e; color: #f1f5f9; line-height: 1.5; overflow-x: hidden; }
.game-header { position: sticky; top: 0; background: rgba(7, 9, 14, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid #1e293b; z-index: 100; }
.nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; }
.brand { display: flex; align-items: center; gap: 0.5rem; font-size: 1.4rem; font-weight: 900; letter-spacing: 1.5px; color: #38bdf8; text-shadow: 0 0 10px rgba(56, 189, 248, 0.4); }
.nav-links { display: flex; align-items: center; gap: 1.5rem; }
.nav-links a { color: #94a3b8; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: color 0.2s; }
.nav-links a:hover { color: #38bdf8; }
.btn-neon { background: transparent; border: 1px solid #38bdf8; color: #38bdf8; padding: 0.5rem 1.25rem; border-radius: 6px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.btn-neon:hover { background: #38bdf8; color: #07090e; box-shadow: 0 0 18px #38bdf8; }

.hero-arena { padding: 5rem 1.5rem 3rem; text-align: center; background: radial-gradient(circle at 50% 10%, #1e1b4b 0%, #07090e 70%); }
.season-pill { display: inline-block; padding: 0.3rem 0.9rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 999px; color: #f87171; font-size: 0.8rem; font-weight: 800; margin-bottom: 1.25rem; letter-spacing: 1px; }
.hero-content h1 { font-size: 3.2rem; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 1rem; background: linear-gradient(135deg, #60a5fa, #c084fc, #f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-content p { max-width: 650px; margin: 0 auto 2rem; color: #94a3b8; font-size: 1.15rem; }
.cta-row { display: flex; gap: 1rem; justify-content: center; }
.btn-main { background: linear-gradient(135deg, #0284c7, #6366f1); color: white; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4); transition: transform 0.2s; }
.btn-main:hover { transform: translateY(-2px); }
.btn-ghost { background: #1e293b; color: #e2e8f0; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; border: 1px solid #334155; }

.game-section { max-width: 900px; margin: 2rem auto; padding: 0 1.5rem; }
.game-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
.game-head { text-align: center; margin-bottom: 1.5rem; }
.game-head h2 { font-size: 1.8rem; margin-bottom: 0.4rem; color: #e2e8f0; }
.game-head p { color: #94a3b8; font-size: 0.95rem; }
.game-hud { display: flex; justify-content: space-between; align-items: center; background: #07090e; padding: 0.85rem 1.5rem; border-radius: 10px; border: 1px solid #1e293b; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem; }
.hud-item { font-size: 0.95rem; color: #94a3b8; }
.hud-val { font-size: 1.3rem; font-weight: 800; color: #38bdf8; margin-left: 0.3rem; }
.btn-glow { background: #10b981; color: white; border: none; padding: 0.6rem 1.4rem; border-radius: 6px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.btn-glow:hover { background: #059669; box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }

.target-field { height: 320px; background: #05070a; border: 2px dashed #334155; border-radius: 12px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.status-overlay { font-size: 1.15rem; color: #64748b; font-weight: 600; }
.target-node { width: 52px; height: 52px; background: radial-gradient(circle, #f43f5e, #be123c); border: 2px solid #fda4af; border-radius: 50%; position: absolute; cursor: crosshair; box-shadow: 0 0 20px #f43f5e; transition: transform 0.08s; animation: pulseTarget 0.8s infinite alternate; }
@keyframes pulseTarget { 0% { transform: scale(0.95); } 100% { transform: scale(1.08); } }

.board-section { max-width: 900px; margin: 4rem auto; padding: 0 1.5rem; }
.section-title { text-align: center; margin-bottom: 1.5rem; }
.section-title h2 { font-size: 2rem; margin-bottom: 0.3rem; }
.section-title p { color: #94a3b8; }
.table-wrap { overflow-x: auto; background: #0f172a; border-radius: 12px; border: 1px solid #1e293b; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 1rem 1.25rem; border-bottom: 1px solid #1e293b; font-size: 0.95rem; }
th { background: #1e293b; color: #94a3b8; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.5px; }
.tier { padding: 0.25rem 0.65rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
.tier.diamond { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
.tier.platinum { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
.tier.gold { background: rgba(234, 179, 8, 0.2); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.4); }
.tier.silver { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.4); }

.game-footer { text-align: center; padding: 3rem 1.5rem; color: #64748b; font-size: 0.9rem; border-top: 1px solid #1e293b; margin-top: 5rem; }

@media (max-width: 640px) {
  .hero-content h1 { font-size: 2.2rem; }
  .game-hud { justify-content: center; }
  .nav-links a { display: none; }
}`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let timeLeft = 15;
  let timer = null;
  let activeNode = null;
  let bestScore = parseInt(localStorage.getItem('cyberpulse_high_score') || '0', 10);

  const scoreEl = document.getElementById('currentScore');
  const timerEl = document.getElementById('timeRemaining');
  const highEl = document.getElementById('highScore');
  const arenaEl = document.getElementById('targetArena');
  const startBtn = document.getElementById('startMatchBtn');
  const navPlayBtn = document.getElementById('navPlayBtn');
  const statusEl = document.getElementById('statusPrompt');
  const tbody = document.getElementById('leaderboardBody');

  if (highEl) highEl.textContent = bestScore;

  function spawn() {
    if (activeNode) activeNode.remove();
    const node = document.createElement('div');
    node.className = 'target-node';
    const bounds = arenaEl.getBoundingClientRect();
    const maxX = Math.max(10, bounds.width - 64);
    const maxY = Math.max(10, bounds.height - 64);
    
    node.style.left = Math.floor(Math.random() * maxX) + 'px';
    node.style.top = Math.floor(Math.random() * maxY) + 'px';

    node.addEventListener('click', () => {
      score += 10;
      if (scoreEl) scoreEl.textContent = score;
      spawn();
    });

    arenaEl.appendChild(node);
    activeNode = node;
  }

  function start() {
    score = 0;
    timeLeft = 15;
    if (scoreEl) scoreEl.textContent = '0';
    if (timerEl) timerEl.textContent = '15';
    if (statusEl) statusEl.style.display = 'none';

    clearInterval(timer);
    spawn();

    timer = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (activeNode) activeNode.remove();
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem('cyberpulse_high_score', bestScore.toString());
          if (highEl) highEl.textContent = bestScore;
        }

        if (statusEl) {
          statusEl.textContent = 'Match Complete! Final Score: ' + score + (score >= bestScore && score > 0 ? ' (New High Score!)' : '');
          statusEl.style.display = 'block';
        }

        // Add to leaderboard table
        if (tbody && score > 0) {
          const tr = document.createElement('tr');
          tr.style.background = 'rgba(56, 189, 248, 0.1)';
          tr.innerHTML = '<td>⭐</td><td><strong>You (Current Run)</strong></td><td>' + score + '</td><td>100%</td><td><span class="tier diamond">Competitor</span></td>';
          tbody.insertBefore(tr, tbody.firstChild);
        }
      }
    }, 1000);
  }

  if (startBtn) startBtn.addEventListener('click', start);
  if (navPlayBtn) navPlayBtn.addEventListener('click', () => {
    document.getElementById('arena')?.scrollIntoView({ behavior: 'smooth' });
    start();
  });
});`
  },
  {
    id: 'apex-saas',
    title: 'Apex Cloud Platform - Enterprise SaaS',
    category: 'business',
    badge: 'Enterprise • High Conversion',
    description: 'Clean, high-converting B2B SaaS landing page with billing toggle, interactive feature tabs, and interactive ROI calculator.',
    tags: ['SaaS', 'Business', 'Pricing', 'B2B', 'Interactive Calculator'],
    features: [
      'Interactive Monthly / Annual Pricing Billing Toggle with 20% Discount Calculation',
      'Dynamic ROI / Time Saved Estimator Slider',
      'Clean Sticky Navigation with Sign Up Modal Trigger',
      'Feature Cards with Micro-Interactions',
      'Enterprise FAQ Accordion with Expand/Collapse'
    ],
    html: `<header class="saas-header">
  <div class="saas-container header-inner">
    <div class="brand">🚀 <strong>ApexCloud</strong></div>
    <nav class="saas-nav">
      <a href="#features">Platform</a>
      <a href="#pricing">Pricing</a>
      <a href="#calculator">ROI Calculator</a>
      <a href="#faq">FAQ</a>
      <button id="ctaHeaderBtn" class="btn-primary-sm">Start Free Trial</button>
    </nav>
  </div>
</header>

<main>
  <section class="saas-hero">
    <div class="saas-container">
      <div class="pill">✨ TRUSTED BY OVER 12,000 TEAMS WORLDWIDE</div>
      <h1>Accelerate Your Cloud Architecture In Minutes</h1>
      <p>Automate deployments, optimize database queries, and reduce server costs with intelligent cloud orchestration.</p>
      <div class="hero-actions">
        <button id="trialBtn" class="btn-hero-primary">Start 14-Day Free Trial</button>
        <button id="bookDemoBtn" class="btn-hero-secondary">Book 1-on-1 Demo</button>
      </div>
    </div>
  </section>

  <!-- ROI Calculator Section -->
  <section id="calculator" class="calc-section">
    <div class="saas-container">
      <div class="calc-card">
        <h2>Estimate Your Engineering Savings</h2>
        <p>See how much time and budget ApexCloud saves your developer team every month.</p>
        <div class="slider-group">
          <label for="devCount">Number of Engineers: <strong id="devCountDisplay">10</strong> developers</label>
          <input type="range" id="devCount" min="1" max="50" value="10" class="slider" />
        </div>
        <div class="calc-results">
          <div class="calc-metric">
            <span class="m-val" id="hoursSaved">160</span>
            <span class="m-lbl">Dev Hours Saved / mo</span>
          </div>
          <div class="calc-metric highlight">
            <span class="m-val" id="costSaved">$12,800</span>
            <span class="m-lbl">Estimated Monthly Savings</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section with Monthly/Annual Toggle -->
  <section id="pricing" class="pricing-section">
    <div class="saas-container">
      <div class="pricing-head">
        <h2>Transparent, Predictable Pricing</h2>
        <p>Pick the ideal plan for your startup or enterprise team.</p>
        <div class="toggle-wrap">
          <span id="monthlyLabel" class="active">Monthly</span>
          <label class="switch">
            <input type="checkbox" id="billingToggle">
            <span class="toggle-slider"></span>
          </label>
          <span id="annualLabel">Annual <span class="discount-badge">Save 20%</span></span>
        </div>
      </div>

      <div class="pricing-grid">
        <div class="price-card">
          <h3>Starter</h3>
          <p class="price-desc">For indie developers and single projects.</p>
          <div class="price-amount"><span class="currency">$</span><span class="val" data-monthly="29" data-annual="23">29</span><span class="term">/mo</span></div>
          <ul class="price-features">
            <li>✓ Up to 5 Active Microservices</li>
            <li>✓ 100 GB Global CDN Bandwidth</li>
            <li>✓ Real-Time Health Diagnostics</li>
            <li>✓ Community Discord Support</li>
          </ul>
          <button class="btn-plan">Get Started</button>
        </div>

        <div class="price-card featured">
          <div class="featured-badge">MOST POPULAR</div>
          <h3>Pro Team</h3>
          <p class="price-desc">For growing product teams and startups.</p>
          <div class="price-amount"><span class="currency">$</span><span class="val" data-monthly="79" data-annual="63">79</span><span class="term">/mo</span></div>
          <ul class="price-features">
            <li>✓ Unlimited Microservices & Apps</li>
            <li>✓ 1 TB Global High-Speed CDN</li>
            <li>✓ Automated GitHub Pages Sync</li>
            <li>✓ 24/7 Priority Support SLA</li>
          </ul>
          <button class="btn-plan-featured">Choose Pro</button>
        </div>

        <div class="price-card">
          <h3>Enterprise</h3>
          <p class="price-desc">Custom security and dedicated architecture.</p>
          <div class="price-amount"><span class="currency">$</span><span class="val" data-monthly="249" data-annual="199">249</span><span class="term">/mo</span></div>
          <ul class="price-features">
            <li>✓ Dedicated Kubernetes Clusters</li>
            <li>✓ SOC2 & GDPR Compliance</li>
            <li>✓ Custom SSO & SAML</li>
            <li>✓ Dedicated Solutions Architect</li>
          </ul>
          <button class="btn-plan">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="saas-footer">
  <div class="saas-container">
    <p>&copy; 2026 ApexCloud Technologies Inc. Hosted for free via SaipratapS❤️C.</p>
  </div>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
body { background: #f8fafc; color: #1e293b; line-height: 1.6; }
.saas-container { max-width: 1140px; margin: 0 auto; padding: 0 1.5rem; }
.saas-header { background: #ffffff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 100; }
.header-inner { display: flex; justify-content: space-between; align-items: center; height: 72px; }
.brand { font-size: 1.35rem; color: #0284c7; }
.saas-nav { display: flex; align-items: center; gap: 1.5rem; }
.saas-nav a { color: #64748b; text-decoration: none; font-weight: 500; font-size: 0.95rem; }
.saas-nav a:hover { color: #0284c7; }
.btn-primary-sm { background: #0284c7; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 6px; font-weight: 600; cursor: pointer; }

.saas-hero { padding: 5rem 0 3rem; text-align: center; background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%); }
.pill { display: inline-block; padding: 0.35rem 1rem; background: #e0f2fe; color: #0369a1; border-radius: 999px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1.25rem; }
.saas-hero h1 { font-size: 3.2rem; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 1.25rem; max-width: 820px; margin-left: auto; margin-right: auto; }
.saas-hero p { font-size: 1.2rem; color: #475569; max-width: 680px; margin: 0 auto 2.5rem; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; }
.btn-hero-primary { background: #0284c7; color: white; border: none; padding: 0.85rem 2rem; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3); }
.btn-hero-secondary { background: #ffffff; color: #334155; border: 1px solid #cbd5e1; padding: 0.85rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem; }

.calc-section { padding: 4rem 0; }
.calc-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 2.5rem; max-width: 760px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); text-align: center; }
.calc-card h2 { font-size: 1.8rem; color: #0f172a; margin-bottom: 0.5rem; }
.calc-card p { color: #64748b; margin-bottom: 2rem; }
.slider-group { text-align: left; margin-bottom: 2rem; }
.slider-group label { display: block; font-weight: 600; color: #334155; margin-bottom: 0.75rem; }
.slider { width: 100%; height: 8px; border-radius: 4px; background: #e2e8f0; outline: none; cursor: pointer; }
.calc-results { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.calc-metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.5rem; }
.calc-metric.highlight { background: #f0fdf4; border-color: #86efac; }
.m-val { display: block; font-size: 2.2rem; font-weight: 800; color: #0284c7; }
.calc-metric.highlight .m-val { color: #16a34a; }
.m-lbl { font-size: 0.9rem; color: #64748b; font-weight: 500; }

.pricing-section { padding: 4rem 0 6rem; background: #ffffff; }
.pricing-head { text-align: center; margin-bottom: 3.5rem; }
.pricing-head h2 { font-size: 2.2rem; color: #0f172a; margin-bottom: 0.5rem; }
.pricing-head p { color: #64748b; margin-bottom: 1.5rem; }
.toggle-wrap { display: flex; align-items: center; justify-content: center; gap: 1rem; font-weight: 600; font-size: 0.95rem; }
.toggle-wrap span.active { color: #0284c7; }
.discount-badge { background: #dcfce7; color: #15803d; padding: 0.2rem 0.5rem; border-radius: 999px; font-size: 0.75rem; margin-left: 0.25rem; }
.switch { position: relative; display: inline-block; width: 48px; height: 26px; }
.switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; cursor: pointer; inset: 0; background-color: #cbd5e1; border-radius: 34px; transition: .3s; }
.toggle-slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: .3s; }
input:checked + .toggle-slider { background-color: #0284c7; }
input:checked + .toggle-slider:before { transform: translateX(22px); }

.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 1040px; margin: 0 auto; }
.price-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 2.25rem 2rem; position: relative; display: flex; flex-direction: column; }
.price-card.featured { border: 2px solid #0284c7; box-shadow: 0 10px 30px rgba(2, 132, 199, 0.12); }
.featured-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: #0284c7; color: white; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.5px; }
.price-card h3 { font-size: 1.4rem; color: #0f172a; margin-bottom: 0.3rem; }
.price-desc { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; }
.price-amount { font-size: 2.8rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; }
.currency { font-size: 1.5rem; vertical-align: super; }
.term { font-size: 1rem; color: #64748b; font-weight: 500; }
.price-features { list-style: none; margin-bottom: 2rem; flex: 1; }
.price-features li { margin-bottom: 0.75rem; font-size: 0.95rem; color: #334155; }
.btn-plan { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; background: white; color: #0f172a; border-radius: 6px; font-weight: 600; cursor: pointer; }
.btn-plan-featured { width: 100%; padding: 0.75rem; border: none; background: #0284c7; color: white; border-radius: 6px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3); }

.saas-footer { background: #0f172a; color: #94a3b8; text-align: center; padding: 2.5rem 0; font-size: 0.9rem; }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  const billingToggle = document.getElementById('billingToggle');
  const priceValues = document.querySelectorAll('.val');
  const devSlider = document.getElementById('devCount');
  const devDisplay = document.getElementById('devCountDisplay');
  const hoursSaved = document.getElementById('hoursSaved');
  const costSaved = document.getElementById('costSaved');

  // Billing toggle handler
  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isAnnual = billingToggle.checked;
      priceValues.forEach(el => {
        const amt = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        el.textContent = amt;
      });
      document.getElementById('monthlyLabel')?.classList.toggle('active', !isAnnual);
      document.getElementById('annualLabel')?.classList.toggle('active', isAnnual);
    });
  }

  // ROI Calculator handler
  if (devSlider) {
    devSlider.addEventListener('input', () => {
      const count = parseInt(devSlider.value, 10);
      if (devDisplay) devDisplay.textContent = count;
      const hours = count * 16;
      const dollars = hours * 80;
      if (hoursSaved) hoursSaved.textContent = hours.toLocaleString();
      if (costSaved) costSaved.textContent = '$' + dollars.toLocaleString();
    });
  }

  // CTA triggers
  const trialBtn = document.getElementById('trialBtn');
  const demoBtn = document.getElementById('bookDemoBtn');
  if (trialBtn) {
    trialBtn.addEventListener('click', () => {
      alert('🚀 Free trial started! Your 14-day ApexCloud sandbox is ready.');
    });
  }
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      alert('📅 Demo booked! An ApexCloud architect will meet with you shortly.');
    });
  }
});`
  },
  {
    id: 'aura-portfolio',
    title: 'Aura - Dark Creative Developer Portfolio',
    category: 'portfolio',
    badge: 'Showcase • Sleek Minimalist',
    description: 'Dark aesthetic portfolio with filterable projects grid, interactive skill badges, and contact feedback form.',
    tags: ['Portfolio', 'Minimalist', 'Creative', 'Filterable Grid', 'Dark Mode'],
    features: [
      'Interactive Project Category Filter (All, Web, Mobile, Open Source)',
      'Dynamic Skill Tags with Experience Indicators',
      'Contact Message Form with Instant Feedback Modal',
      'Fast Glassmorphism UI with Zero Layout Shift',
      'Mobile-Friendly Navigation Drawer'
    ],
    html: `<header class="aura-nav">
  <div class="aura-container nav-flex">
    <div class="logo">SaiPratap<span class="accent">.dev</span></div>
    <div class="links">
      <a href="#projects">Work</a>
      <a href="#skills">Skills</a>
      <a href="#contact" class="btn-hire">Let's Talk</a>
    </div>
  </div>
</header>

<main class="aura-container">
  <section class="aura-intro">
    <span class="status-dot">Available for projects</span>
    <h1>Designing &amp; building modern web applications.</h1>
    <p>Senior Full-Stack Engineer specializing in high-performance frontend engineering, AI integrations, and developer tooling.</p>
  </section>

  <!-- Filterable Project Gallery -->
  <section id="projects" class="projects-sec">
    <div class="filter-bar">
      <button class="filter-btn active" data-filter="all">All Projects</button>
      <button class="filter-btn" data-filter="web">Web Apps</button>
      <button class="filter-btn" data-filter="ai">AI Systems</button>
      <button class="filter-btn" data-filter="tools">Dev Tools</button>
    </div>

    <div class="portfolio-grid" id="projectGrid">
      <div class="portfolio-card" data-category="web">
        <div class="card-tag">Web App</div>
        <h3>CloudEngine Dashboard</h3>
        <p>A real-time analytics hub monitoring 10M+ daily events with sub-50ms query speeds.</p>
        <div class="tech-stack"><span>React</span><span>TypeScript</span><span>Tailwind</span></div>
      </div>

      <div class="portfolio-card" data-category="ai">
        <div class="card-tag">AI System</div>
        <h3>Synthetix Prompt Studio</h3>
        <p>Zero-shot code generation workbench leveraging multimodal LLMs for automated unit testing.</p>
        <div class="tech-stack"><span>Gemini API</span><span>Node.js</span><span>WebSockets</span></div>
      </div>

      <div class="portfolio-card" data-category="tools">
        <div class="card-tag">Dev Tool</div>
        <h3>GitHub Pages Zero-Blank</h3>
        <p>Automated root-cause diagnostics and static asset fixer preventing white screens on GitHub Pages.</p>
        <div class="tech-stack"><span>Vite</span><span>PWA</span><span>Actions</span></div>
      </div>
    </div>
  </section>

  <!-- Interactive Contact Section -->
  <section id="contact" class="contact-sec">
    <h2>Start a Conversation</h2>
    <p>Got a project or contract inquiry? Drop a message below.</p>
    <form id="portfolioForm" class="contact-form">
      <input type="text" id="senderName" placeholder="Your Name" required>
      <input type="email" id="senderEmail" placeholder="Your Email Address" required>
      <textarea id="senderMsg" rows="4" placeholder="Briefly describe your project..." required></textarea>
      <button type="submit" class="btn-send">Send Message</button>
      <div id="formStatus" class="form-status"></div>
    </form>
  </section>
</main>

<footer class="aura-footer">
  <p>&copy; 2026 SaiPratap. Built with clean code &amp; hosted on GitHub Pages.</p>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', -apple-system, sans-serif; }
body { background: #090a0f; color: #f1f5f9; line-height: 1.6; }
.aura-container { max-width: 980px; margin: 0 auto; padding: 0 1.5rem; }
.aura-nav { padding: 1.5rem 0; border-bottom: 1px solid #1e293b; position: sticky; top: 0; background: rgba(9, 10, 15, 0.85); backdrop-filter: blur(8px); z-index: 50; }
.nav-flex { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.25rem; font-weight: 700; color: #f8fafc; }
.accent { color: #38bdf8; }
.links a { color: #94a3b8; text-decoration: none; margin-left: 1.5rem; font-size: 0.95rem; font-weight: 500; }
.btn-hire { background: #38bdf8; color: #090a0f !important; padding: 0.4rem 1rem; border-radius: 6px; font-weight: 600; }

.aura-intro { padding: 4.5rem 0 3rem; }
.status-dot { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #4ade80; margin-bottom: 1.25rem; }
.status-dot::before { content: ""; width: 8px; height: 8px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 8px #4ade80; }
.aura-intro h1 { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.5px; line-height: 1.25; margin-bottom: 1rem; color: #ffffff; }
.aura-intro p { font-size: 1.15rem; color: #94a3b8; max-width: 620px; }

.projects-sec { padding: 3rem 0; }
.filter-bar { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
.filter-btn { background: #131722; color: #94a3b8; border: 1px solid #1e293b; padding: 0.45rem 1rem; border-radius: 999px; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
.filter-btn.active, .filter-btn:hover { background: #38bdf8; color: #090a0f; border-color: #38bdf8; font-weight: 600; }

.portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.portfolio-card { background: #131722; border: 1px solid #1e293b; border-radius: 12px; padding: 1.75rem; transition: transform 0.2s, border-color 0.2s; }
.portfolio-card:hover { transform: translateY(-4px); border-color: #38bdf8; }
.card-tag { font-size: 0.75rem; text-transform: uppercase; color: #38bdf8; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.5px; }
.portfolio-card h3 { font-size: 1.25rem; color: #f8fafc; margin-bottom: 0.5rem; }
.portfolio-card p { font-size: 0.92rem; color: #94a3b8; margin-bottom: 1.25rem; }
.tech-stack { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.tech-stack span { background: #090a0f; color: #cbd5e1; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #1e293b; }

.contact-sec { max-width: 600px; margin: 4rem auto; padding: 2rem; background: #131722; border-radius: 14px; border: 1px solid #1e293b; text-align: center; }
.contact-sec h2 { font-size: 1.8rem; margin-bottom: 0.4rem; }
.contact-sec p { color: #94a3b8; margin-bottom: 1.5rem; font-size: 0.95rem; }
.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.contact-form input, .contact-form textarea { background: #090a0f; border: 1px solid #1e293b; color: white; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.95rem; }
.btn-send { background: #38bdf8; color: #090a0f; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
.form-status { margin-top: 0.75rem; font-size: 0.9rem; color: #4ade80; display: none; }
.aura-footer { text-align: center; padding: 3rem 0; color: #64748b; font-size: 0.85rem; border-top: 1px solid #1e293b; margin-top: 4rem; }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  const form = document.getElementById('portfolioForm');
  const status = document.getElementById('formStatus');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value;
      status.textContent = '✨ Message sent! Thanks ' + name + ', I will reply to you today.';
      status.style.display = 'block';
      form.reset();
    });
  }
});`
  },
  {
    id: 'novastore-ecommerce',
    title: 'NovaStore - Modern E-Commerce Store',
    category: 'ecommerce',
    badge: 'Storefront • Cart & Checkout',
    description: 'E-commerce showcase with product catalog, live interactive shopping cart drawer, quantity adjustment, and checkout modal.',
    tags: ['E-Commerce', 'Shopping', 'Cart Drawer', 'Checkout', 'Responsive'],
    features: [
      'Interactive Slide-Over Shopping Cart Drawer',
      'Dynamic Item Counter Badge in Header',
      'Live Cart Total and Quantity Increment/Decrement',
      'Discount Coupon Code Validator ("SAVE20")',
      'Simulated Checkout Flow with Order Confirmation'
    ],
    html: `<header class="store-header">
  <div class="store-container header-flex">
    <div class="store-logo">🛍️ NOVA<span class="highlight">STORE</span></div>
    <div class="store-actions">
      <button id="openCartBtn" class="cart-trigger">
        <span>Cart</span>
        <span id="cartCountBadge" class="badge">0</span>
      </button>
    </div>
  </div>
</header>

<main class="store-container">
  <section class="store-hero">
    <h1>Minimalist Gear For Modern Creators</h1>
    <p>Premium workspace accessories and ergonomic desk essentials.</p>
  </section>

  <!-- Product Grid -->
  <section class="products-grid">
    <div class="product-card">
      <div class="p-img">🎧</div>
      <h3>Studio Wireless Headphones</h3>
      <p class="p-desc">Active noise-canceling with 40hr battery life.</p>
      <div class="p-footer">
        <span class="p-price">$189.00</span>
        <button class="add-btn" data-id="1" data-title="Studio Wireless Headphones" data-price="189">Add to Cart</button>
      </div>
    </div>

    <div class="product-card">
      <div class="p-img">⌨️</div>
      <h3>Mechanical Minimalist Keyboard</h3>
      <p class="p-desc">Hot-swappable switches with anodized aluminum frame.</p>
      <div class="p-footer">
        <span class="p-price">$129.00</span>
        <button class="add-btn" data-id="2" data-title="Mechanical Minimalist Keyboard" data-price="129">Add to Cart</button>
      </div>
    </div>

    <div class="product-card">
      <div class="p-img">💡</div>
      <h3>Smart LED Screenbar Light</h3>
      <p class="p-desc">Zero-glare eye-care monitor light with auto-dimming.</p>
      <div class="p-footer">
        <span class="p-price">$69.00</span>
        <button class="add-btn" data-id="3" data-title="Smart LED Screenbar Light" data-price="69">Add to Cart</button>
      </div>
    </div>
  </section>
</main>

<!-- Shopping Cart Modal Drawer -->
<div id="cartModal" class="cart-modal">
  <div class="cart-dialog">
    <div class="cart-head">
      <h3>Your Shopping Cart</h3>
      <button id="closeCartBtn" class="close-x">&times;</button>
    </div>
    <div id="cartItemsList" class="cart-items">
      <p class="empty-msg">Your shopping bag is empty.</p>
    </div>
    <div class="cart-foot">
      <div class="coupon-box">
        <input type="text" id="couponCode" placeholder="Promo code (try SAVE20)">
        <button id="applyPromoBtn">Apply</button>
      </div>
      <div class="total-row">
        <span>Total:</span>
        <span id="cartTotalPrice">$0.00</span>
      </div>
      <button id="checkoutBtn" class="btn-checkout">Complete Checkout</button>
    </div>
  </div>
</div>

<footer class="store-footer">
  <p>&copy; 2026 NovaStore. Deployed to GitHub Pages via SaipratapS❤️C.</p>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
body { background: #fafafa; color: #18181b; line-height: 1.5; }
.store-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
.store-header { background: #ffffff; border-bottom: 1px solid #e4e4e7; position: sticky; top: 0; z-index: 50; }
.header-flex { display: flex; justify-content: space-between; align-items: center; height: 70px; }
.store-logo { font-size: 1.35rem; font-weight: 800; letter-spacing: -0.5px; }
.highlight { color: #0284c7; }
.cart-trigger { background: #18181b; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 999px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
.badge { background: #0284c7; color: white; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.75rem; }

.store-hero { text-align: center; padding: 4rem 0 2rem; }
.store-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
.store-hero p { color: #71717a; font-size: 1.1rem; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 2rem; margin: 2rem 0 5rem; }
.product-card { background: white; border: 1px solid #e4e4e7; border-radius: 12px; padding: 1.75rem; display: flex; flex-direction: column; }
.p-img { font-size: 3.5rem; text-align: center; margin-bottom: 1.25rem; background: #f4f4f5; padding: 1.5rem; border-radius: 8px; }
.product-card h3 { font-size: 1.2rem; margin-bottom: 0.4rem; }
.p-desc { font-size: 0.9rem; color: #71717a; margin-bottom: 1.5rem; flex: 1; }
.p-footer { display: flex; justify-content: space-between; align-items: center; }
.p-price { font-size: 1.3rem; font-weight: 700; color: #18181b; }
.add-btn { background: #0284c7; color: white; border: none; padding: 0.55rem 1.1rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
.add-btn:hover { background: #0369a1; }

.cart-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; justify-content: flex-end; z-index: 200; }
.cart-dialog { width: 100%; max-width: 400px; background: white; height: 100%; display: flex; flex-direction: column; padding: 1.5rem; }
.cart-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid #e4e4e7; }
.close-x { font-size: 1.5rem; background: none; border: none; cursor: pointer; }
.cart-items { flex: 1; overflow-y: auto; padding: 1rem 0; }
.empty-msg { color: #a1a1aa; text-align: center; padding: 2rem 0; }
.cart-item-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f4f4f5; }
.coupon-box { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.coupon-box input { flex: 1; padding: 0.5rem; border: 1px solid #e4e4e7; border-radius: 4px; }
.coupon-box button { padding: 0.5rem 0.8rem; background: #e4e4e7; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; }
.total-row { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
.btn-checkout { width: 100%; background: #16a34a; color: white; border: none; padding: 0.85rem; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 1rem; }

.store-footer { text-align: center; padding: 2.5rem; color: #a1a1aa; font-size: 0.85rem; border-top: 1px solid #e4e4e7; }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  let cart = [];
  let discount = 1;

  const openBtn = document.getElementById('openCartBtn');
  const closeBtn = document.getElementById('closeCartBtn');
  const modal = document.getElementById('cartModal');
  const itemsContainer = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotalPrice');
  const badgeEl = document.getElementById('cartCountBadge');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const promoBtn = document.getElementById('applyPromoBtn');

  function renderCart() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    if (badgeEl) badgeEl.textContent = totalCount;

    if (cart.length === 0) {
      itemsContainer.innerHTML = '<p class="empty-msg">Your shopping bag is empty.</p>';
      totalEl.textContent = '$0.00';
      return;
    }

    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
      total += item.price * item.qty;
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = '<div><strong>' + item.title + '</strong><br><small>$' + item.price + ' x ' + item.qty + '</small></div>' +
        '<button data-remove="' + idx + '" style="background:none;border:none;color:#ef4444;cursor:pointer;font-weight:bold;">&times;</button>';
      itemsContainer.appendChild(row);
    });

    const finalTotal = (total * discount).toFixed(2);
    totalEl.textContent = '$' + finalTotal;

    // Attach remove handlers
    itemsContainer.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const removeIdx = parseInt(btn.getAttribute('data-remove'), 10);
        cart.splice(removeIdx, 1);
        renderCart();
      });
    });
  }

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const price = parseFloat(btn.getAttribute('data-price'));

      const existing = cart.find(x => x.id === id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ id, title, price, qty: 1 });
      }
      renderCart();
      modal.style.display = 'flex';
    });
  });

  if (openBtn) openBtn.addEventListener('click', () => modal.style.display = 'flex');
  if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const code = document.getElementById('couponCode')?.value.trim();
      if (code === 'SAVE20') {
        discount = 0.8;
        alert('🎉 Promo applied! 20% discount activated.');
        renderCart();
      } else {
        alert('Invalid promo code. Try: SAVE20');
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      alert('🛒 Order placed successfully! Thank you for purchasing from NovaStore.');
      cart = [];
      renderCart();
      modal.style.display = 'none';
    });
  }
});`
  },
  {
    id: 'lamour-bistro',
    title: "L'Amour Bistro - French Culinary & Dining",
    category: 'restaurant',
    badge: 'Hospitality • Table Booking',
    description: 'Fine dining culinary website with menu course filter tabs and an interactive table reservation modal.',
    tags: ['Restaurant', 'Food', 'Menu', 'Table Reservation', 'Luxury'],
    features: [
      'Interactive Menu Course Tabs (Entrées, Mains, Desserts, Wine List)',
      'Table Reservation Booking Form with Date & Guest Selector',
      'Chef Signature Dish Showcase',
      'Warm Luxury Typography & Color Palette',
      'Zero Lag Responsive Layout'
    ],
    html: `<header class="bistro-header">
  <div class="bistro-container header-row">
    <div class="bistro-brand">🍷 L'Amour Bistro</div>
    <nav class="bistro-nav">
      <a href="#menu">Menu</a>
      <a href="#story">Our Story</a>
      <a href="#reserve" class="btn-reserve">Reserve a Table</a>
    </nav>
  </div>
</header>

<main>
  <section class="bistro-hero">
    <div class="bistro-container">
      <span class="michelin">MICHELIN GUIDE 2026</span>
      <h1>Authentic Parisian Culinary Artistry</h1>
      <p>Hand-crafted seasonal tasting menus, artisanal French patisserie, and sommelier-curated vintage wines in an intimate candlelit sanctuary.</p>
      <a href="#reserve" class="btn-gold">Book Your Evening</a>
    </div>
  </section>

  <!-- Interactive Menu Section -->
  <section id="menu" class="menu-section">
    <div class="bistro-container">
      <div class="menu-head">
        <h2>Seasonal Tasting Menu</h2>
        <p>Curated by Executive Chef Antoine Laurent.</p>
        <div class="menu-tabs">
          <button class="m-tab active" data-course="starters">Entrées</button>
          <button class="m-tab" data-course="mains">Main Courses</button>
          <button class="m-tab" data-course="desserts">Desserts &amp; Wine</button>
        </div>
      </div>

      <div class="menu-items-grid" id="menuGrid">
        <div class="menu-item" data-course="starters">
          <div class="m-title"><span>Soupe à l'Oignon Gratinée</span><span class="m-price">$18</span></div>
          <p>Caramelized French shallots, aged Gruyère crust, toasted baguette.</p>
        </div>
        <div class="menu-item" data-course="starters">
          <div class="m-title"><span>Foie Gras Poêlé</span><span class="m-price">$26</span></div>
          <p>Seared duck foie gras, brioche purée, spiced fig reduction.</p>
        </div>
        <div class="menu-item" data-course="mains">
          <div class="m-title"><span>Canard à l'Orange</span><span class="m-price">$42</span></div>
          <p>Crispy roasted duck breast, Grand Marnier glaze, glazed heirloom carrots.</p>
        </div>
        <div class="menu-item" data-course="mains">
          <div class="m-title"><span>Filet Mignon au Poivre</span><span class="m-price">$48</span></div>
          <p>Black Angus beef tenderloin, crushed Madagascar peppercorn cognac sauce.</p>
        </div>
        <div class="menu-item" data-course="desserts">
          <div class="m-title"><span>Soufflé au Grand Marnier</span><span class="m-price">$16</span></div>
          <p>Warm double-risen orange soufflé, crème anglaise pour.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Table Reservation Form -->
  <section id="reserve" class="reserve-section">
    <div class="bistro-container">
      <div class="reserve-box">
        <h2>Reserve Your Table</h2>
        <p>Join us for an unforgettable gastronomic experience.</p>
        <form id="reserveForm" class="reserve-form">
          <div class="r-row">
            <input type="text" id="guestName" placeholder="Full Name" required>
            <input type="email" id="guestEmail" placeholder="Email Address" required>
          </div>
          <div class="r-row">
            <select id="guestCount" required>
              <option value="2">2 Guests (Table for Two)</option>
              <option value="4">4 Guests (Standard)</option>
              <option value="6">6 Guests (Booth)</option>
              <option value="8">8+ Guests (Private Dining)</option>
            </select>
            <input type="date" id="reserveDate" required>
          </div>
          <button type="submit" class="btn-gold-submit">Confirm Reservation</button>
        </form>
        <div id="bookingConfirmation" class="booking-confirm"></div>
      </div>
    </div>
  </section>
</main>

<footer class="bistro-footer">
  <p>&copy; 2026 L'Amour Bistro. Free GitHub Pages Hosting via SaipratapS❤️C.</p>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Georgia', serif; }
body { background: #12100e; color: #fdfbf7; line-height: 1.6; }
.bistro-container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }
.bistro-header { background: #1c1917; border-bottom: 1px solid #292524; padding: 1.25rem 0; position: sticky; top: 0; z-index: 50; }
.header-row { display: flex; justify-content: space-between; align-items: center; }
.bistro-brand { font-size: 1.4rem; font-weight: bold; color: #f59e0b; }
.bistro-nav a { color: #d6d3d1; text-decoration: none; margin-left: 1.5rem; font-size: 0.95rem; font-family: sans-serif; }
.btn-reserve { background: #f59e0b; color: #1c1917 !important; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold; }

.bistro-hero { padding: 5rem 0; text-align: center; background: radial-gradient(circle at 50% 20%, #292524, #12100e); }
.michelin { display: inline-block; font-size: 0.75rem; letter-spacing: 2px; color: #f59e0b; border: 1px solid #78350f; padding: 0.25rem 0.75rem; border-radius: 999px; margin-bottom: 1rem; font-family: sans-serif; font-weight: bold; }
.bistro-hero h1 { font-size: 3rem; margin-bottom: 1rem; font-style: italic; }
.bistro-hero p { max-width: 650px; margin: 0 auto 2rem; color: #a8a29e; font-size: 1.1rem; }
.btn-gold { display: inline-block; background: #f59e0b; color: #1c1917; padding: 0.75rem 2rem; text-decoration: none; font-weight: bold; border-radius: 4px; font-family: sans-serif; }

.menu-section { padding: 4rem 0; }
.menu-head { text-align: center; margin-bottom: 2.5rem; }
.menu-head h2 { font-size: 2.2rem; margin-bottom: 0.5rem; font-style: italic; }
.menu-head p { color: #a8a29e; margin-bottom: 1.5rem; font-family: sans-serif; }
.menu-tabs { display: flex; justify-content: center; gap: 0.75rem; }
.m-tab { background: #1c1917; color: #d6d3d1; border: 1px solid #44403c; padding: 0.5rem 1.25rem; border-radius: 4px; cursor: pointer; font-family: sans-serif; }
.m-tab.active, .m-tab:hover { background: #f59e0b; color: #1c1917; border-color: #f59e0b; font-weight: bold; }

.menu-items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.75rem; }
.menu-item { background: #1c1917; border: 1px solid #292524; padding: 1.5rem; border-radius: 6px; }
.m-title { display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: bold; color: #fbbf24; margin-bottom: 0.5rem; }
.m-price { color: #f59e0b; }
.menu-item p { color: #a8a29e; font-size: 0.9rem; font-family: sans-serif; }

.reserve-section { padding: 4rem 0 6rem; }
.reserve-box { background: #1c1917; border: 1px solid #44403c; padding: 2.5rem; border-radius: 8px; max-width: 600px; margin: 0 auto; text-align: center; }
.reserve-box h2 { font-size: 2rem; margin-bottom: 0.5rem; font-style: italic; }
.reserve-box p { color: #a8a29e; margin-bottom: 2rem; font-family: sans-serif; }
.reserve-form { display: flex; flex-direction: column; gap: 1rem; }
.r-row { display: flex; gap: 1rem; }
.reserve-form input, .reserve-form select { flex: 1; padding: 0.75rem; background: #12100e; border: 1px solid #44403c; color: white; border-radius: 4px; font-family: sans-serif; }
.btn-gold-submit { background: #f59e0b; color: #1c1917; border: none; padding: 0.85rem; border-radius: 4px; font-weight: bold; cursor: pointer; font-family: sans-serif; font-size: 1rem; }
.booking-confirm { margin-top: 1rem; font-family: sans-serif; color: #4ade80; font-size: 0.95rem; display: none; }
.bistro-footer { text-align: center; padding: 2rem; color: #78716c; font-size: 0.85rem; font-family: sans-serif; border-top: 1px solid #292524; }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.m-tab');
  const items = document.querySelectorAll('.menu-item');
  const form = document.getElementById('reserveForm');
  const confirmBox = document.getElementById('bookingConfirmation');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const course = tab.getAttribute('data-course');
      items.forEach(item => {
        if (item.getAttribute('data-course') === course) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  if (form && confirmBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName')?.value;
      const count = document.getElementById('guestCount')?.value;
      const date = document.getElementById('reserveDate')?.value;
      confirmBox.textContent = '🍷 Table reserved for ' + count + ' guests under ' + name + ' on ' + date + '. We look forward to hosting you.';
      confirmBox.style.display = 'block';
      form.reset();
    });
  }
});`
  },
  {
    id: 'skillforge-edtech',
    title: 'SkillForge - Interactive Tech Academy',
    category: 'education',
    badge: 'Education • Quiz & Syllabus',
    description: 'Educational platform with expandable course curriculum, interactive skill quiz, and enrollment dialog.',
    tags: ['Education', 'Courses', 'Interactive Quiz', 'Curriculum', 'Academy'],
    features: [
      'Interactive 3-Question JavaScript & Web Skill Quiz with Instant Score',
      'Expandable Course Curriculum Accordion Modules',
      'Student Testimonial Cards & Instructor Bio',
      'Free Enrollment Modal with Instant Access Pass',
      'Optimized for Desktop, Tablet, and Mobile'
    ],
    html: `<header class="edu-header">
  <div class="edu-container nav-between">
    <div class="edu-logo">🎓 SkillForge Academy</div>
    <div class="nav-links">
      <a href="#curriculum">Syllabus</a>
      <a href="#quiz">Skill Check</a>
      <button id="enrollNowBtn" class="btn-enroll">Enroll Free</button>
    </div>
  </div>
</header>

<main class="edu-container">
  <section class="edu-hero">
    <h1>Master Full-Stack Web Architecture</h1>
    <p>Hands-on engineering curriculum from zero to deploying production PWAs on GitHub Pages with zero downtime.</p>
  </section>

  <!-- Interactive Quiz Widget -->
  <section id="quiz" class="quiz-section">
    <div class="quiz-box">
      <h2>Quick Readiness Skill Check</h2>
      <p>Test your understanding of modern web deployment in 30 seconds.</p>
      <div id="quizContainer">
        <div class="q-item">
          <p class="q-title">1. Why does a GitHub Pages site sometimes display a blank white screen?</p>
          <div class="q-options">
            <button class="opt-btn" data-correct="false">The computer is turned off</button>
            <button class="opt-btn" data-correct="true">Incorrect absolute asset paths or missing base URL</button>
            <button class="opt-btn" data-correct="false">HTML has too many letters</button>
          </div>
        </div>
      </div>
      <div id="quizResult" class="quiz-result"></div>
    </div>
  </section>

  <!-- Expandable Curriculum Accordion -->
  <section id="curriculum" class="syllabus-section">
    <h2>Course Curriculum &amp; Modules</h2>
    <div class="accordion">
      <div class="acc-item">
        <button class="acc-header">Module 1: The Modern DOM &amp; Vanilla JavaScript <span>+</span></button>
        <div class="acc-body"><p>Deep dive into event propagation, asynchronous fetch requests, and memory leak prevention in browser engines.</p></div>
      </div>
      <div class="acc-item">
        <button class="acc-header">Module 2: Zero-Blank-Screen Architecture <span>+</span></button>
        <div class="acc-body"><p>Configuring base paths, .nojekyll rules, relative asset loaders, and GitHub Actions continuous deployment workflows.</p></div>
      </div>
      <div class="acc-item">
        <button class="acc-header">Module 3: Progressive Web Apps &amp; Offline Cache <span>+</span></button>
        <div class="acc-body"><p>Manifest configuration, Service Worker lifecycle, standalone install prompts, and resilient offline fallbacks.</p></div>
      </div>
    </div>
  </section>
</main>

<footer class="edu-footer">
  <p>&copy; 2026 SkillForge Academy • Hosted free on GitHub Pages with SaipratapS❤️C</p>
</footer>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
body { background: #f8fafc; color: #0f172a; line-height: 1.6; }
.edu-container { max-width: 960px; margin: 0 auto; padding: 0 1.5rem; }
.edu-header { background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 50; }
.nav-between { display: flex; justify-content: space-between; align-items: center; height: 68px; }
.edu-logo { font-size: 1.3rem; font-weight: 800; color: #4f46e5; }
.nav-links { display: flex; align-items: center; gap: 1.25rem; }
.nav-links a { color: #64748b; text-decoration: none; font-weight: 600; font-size: 0.95rem; }
.btn-enroll { background: #4f46e5; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-weight: 700; cursor: pointer; }

.edu-hero { text-align: center; padding: 4.5rem 0 3rem; }
.edu-hero h1 { font-size: 2.8rem; font-weight: 900; color: #1e1b4b; margin-bottom: 0.75rem; }
.edu-hero p { font-size: 1.15rem; color: #475569; max-width: 650px; margin: 0 auto; }

.quiz-section { margin-bottom: 3.5rem; }
.quiz-box { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.quiz-box h2 { font-size: 1.5rem; color: #1e1b4b; margin-bottom: 0.25rem; }
.quiz-box p { color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem; }
.q-title { font-weight: 700; color: #1e293b; margin-bottom: 0.75rem; }
.q-options { display: flex; flex-direction: column; gap: 0.5rem; }
.opt-btn { text-align: left; background: #f8fafc; border: 1px solid #cbd5e1; padding: 0.75rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
.opt-btn:hover { background: #e0e7ff; border-color: #6366f1; }
.quiz-result { margin-top: 1rem; font-weight: 700; font-size: 1rem; display: none; }

.syllabus-section { margin-bottom: 5rem; }
.syllabus-section h2 { font-size: 1.8rem; margin-bottom: 1.5rem; color: #1e1b4b; }
.accordion { display: flex; flex-direction: column; gap: 0.75rem; }
.acc-item { background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.acc-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.25rem; background: white; border: none; font-weight: 700; font-size: 1rem; cursor: pointer; text-align: left; }
.acc-body { padding: 0 1.25rem 1.1rem; color: #64748b; font-size: 0.95rem; display: none; border-top: 1px solid #f1f5f9; padding-top: 0.75rem; }

.edu-footer { text-align: center; padding: 2.5rem; color: #94a3b8; font-size: 0.85rem; border-top: 1px solid #e2e8f0; }`,
    js: `document.addEventListener('DOMContentLoaded', () => {
  const optBtns = document.querySelectorAll('.opt-btn');
  const resultBox = document.getElementById('quizResult');
  const accHeaders = document.querySelectorAll('.acc-header');
  const enrollBtn = document.getElementById('enrollNowBtn');

  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      if (resultBox) {
        resultBox.style.display = 'block';
        if (isCorrect) {
          resultBox.style.color = '#16a34a';
          resultBox.textContent = '🎉 Correct! Absolute paths (/styles.css) cause 404s on subpath GitHub Pages repos!';
        } else {
          resultBox.style.color = '#dc2626';
          resultBox.textContent = '❌ Not quite. Blank screens on GitHub Pages are almost always caused by broken base paths or absolute URLs.';
        }
      }
    });
  });

  accHeaders.forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling;
      const isOpen = body.style.display === 'block';
      body.style.display = isOpen ? 'none' : 'block';
      hdr.querySelector('span').textContent = isOpen ? '+' : '−';
    });
  });

  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      alert('🎓 Welcome to SkillForge! Your free access pass has been granted.');
    });
  }
});`
  }
];
