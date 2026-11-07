import JSZip from 'jszip';
import { Project } from '../types';

export function generateIndexHtml(project: Project): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.name} | SaipratapS❤️C</title>
    <!-- CRITICAL BLANK-SCREEN PREVENTION FIX: Relative base URL for GitHub Pages subpath -->
    <base href="./" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <!-- Rendered content generated via SaipratapS❤️C -->
    ${project.html}

    <!-- Bundled client-side JavaScript -->
    <script src="./app.js" defer></script>
  </body>
</html>`;
}

export function generateGitHubWorkflow(): string {
  return `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v4

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
}

export function generateSpa404Html(): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting to SaipratapS❤️C...</title>
    <script>
      // Single Page Application SPA router fallback for GitHub Pages
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
    <meta http-equiv="refresh" content="0;URL='./'">
  </head>
  <body>
    <p style="font-family:sans-serif;text-align:center;margin-top:20vh;color:#64748b;">
      Redirecting to homepage...
    </p>
  </body>
</html>`;
}

export function generateReadme(project: Project, repoName = 'OWN-Free-hosting-and-create-website', owner = 'saipratap-ux'): string {
  return `# ${project.name}

> Built & Recovered via **SaipratapS❤️C Free Hosting & Website Creation Platform**

## 🌐 Live Website URL
Once pushed to your GitHub repository, your website will be live at:
\`https://${owner}.github.io/${repoName}/\`

---

## 🛠️ Included Zero-Blank-Screen Files
This package has been pre-configured with the 6 critical fixes to prevent blank white screens on GitHub Pages:

1. **\`index.html\`**: Semantic HTML markup with \`<base href="./">\` and relative asset paths (\`./styles.css\` and \`./app.js\`).
2. **\`styles.css\`**: Modern, responsive styling rules.
3. **\`app.js\`**: Interactive client-side behavior with DOMContentLoaded listener.
4. **\`.nojekyll\`**: Essential marker that instructs GitHub Pages not to run Jekyll, preventing underscore files from returning 404.
5. **\`404.html\`**: SPA fallback router for clean GitHub Pages redirection.
6. **\`.github/workflows/deploy.yml\`**: Automated GitHub Actions continuous deployment pipeline.

---

## 🚀 How to Deploy to GitHub Pages

### Method 1: Using GitHub Web Interface (Easiest)
1. Go to your repository: \`https://github.com/${owner}/${repoName}\`
2. Click **Add file** > **Upload files**.
3. Drag and drop all the files from this unzipped folder (\`index.html\`, \`styles.css\`, \`app.js\`, \`.nojekyll\`, \`404.html\`, and the \`.github\` folder).
4. Commit the changes to the \`main\` branch.
5. Navigate to **Settings** > **Pages**.
6. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select \`main\` and \`/ (root)\`
   - Click **Save**.
7. Wait 30-60 seconds and refresh \`https://${owner}.github.io/${repoName}/\`.

### Method 2: Using Git Command Line
\`\`\`bash
git clone https://github.com/${owner}/${repoName}.git
cd ${repoName}
# Copy all files from this package into the folder
git add .
git commit -m "Deploy upgraded website via SaipratapS❤️C"
git push origin main
\`\`\`
`;
}

export async function exportDeployableZip(project: Project, repoName = 'OWN-Free-hosting-and-create-website', owner = 'saipratap-ux'): Promise<Blob> {
  const zip = new JSZip();

  // Root files
  zip.file('index.html', generateIndexHtml(project));
  zip.file('styles.css', project.css);
  zip.file('app.js', project.js);
  zip.file('.nojekyll', ''); // Critical fix for GitHub Pages
  zip.file('404.html', generateSpa404Html());
  zip.file('README.md', generateReadme(project, repoName, owner));

  // GitHub Actions workflow
  const githubFolder = zip.folder('.github');
  const workflowsFolder = githubFolder?.folder('workflows');
  workflowsFolder?.file('deploy.yml', generateGitHubWorkflow());

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportSingleHtmlFile(project: Project): void {
  const fullHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${project.name}</title>
    <style>
${project.css}
    </style>
  </head>
  <body>
${project.html}
    <script>
${project.js}
    </script>
  </body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  downloadBlob(blob, `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-standalone.html`);
}
