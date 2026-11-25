import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer, loadEnv } from 'vite';
import { archivePaths, getRoute, publicPaths } from './src/content.js';

const template = await readFile('dist/index.html', 'utf8');
const { VITE_SITE_URL } = loadEnv('production', process.cwd());
const origin = VITE_SITE_URL ? new URL(VITE_SITE_URL).origin : '';
const server = await createServer({ mode: 'production', server: { middlewareMode: true, hmr: false }, appType: 'custom' });

function escape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

async function output(file, html) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  for (const path of [...publicPaths, '/404']) {
    const route = getRoute(path);
    const title = escape(route.title);
    const description = escape(route.description);
    const head = route.page === 'missing'
      ? '<meta name="robots" content="noindex" />'
      : origin ? '<link rel="canonical" href="' + escape(origin + path) + '" />\n    <meta property="og:url" content="' + escape(origin + path) + '" />' : '';
    const html = template
      .replace(/<title>.*?<\/title>/, () => '<title>' + title + '</title>')
      .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/, (_, prefix) => prefix + description)
      .replace(/(<meta property="og:title" content=")[^"]*/, (_, prefix) => prefix + title)
      .replace('</head>', () => head + '\n  </head>')
      .replace('<div id="root"></div>', () => '<div id="root" data-rendered="' + path + '">' + renderToString(createElement(App, { route })) + '</div>');
    await output(path === '/404' ? 'dist/404.html' : join('dist', path.slice(1), 'index.html'), html);
  }
  for (const path of archivePaths) {
    await output(join('dist', path.slice(1), 'index.html'), template.replace('</head>', '<meta name="robots" content="noindex" /></head>'));
  }
  if (origin) {
    const urls = publicPaths.map((path) => '<url><loc>' + escape(origin + path) + '</loc></url>').join('');
    await output('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>\n');
    await output('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n');
  }
} finally {
  await server.close();
}
