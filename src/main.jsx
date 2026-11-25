import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { archivePaths, getRoute } from './content.js';
import './styles.css';

const root = document.getElementById('root');
const route = getRoute(window.location.pathname);

if (archivePaths.includes(route.path)) {
  Promise.all([import('./LegacyPage.jsx'), import('./legacyRoutes.js')]).then(([{ default: LegacyPage }, { getPageByPath }]) => {
    createRoot(root).render(<LegacyPage page={getPageByPath(route.path)} />);
  });
} else {
  document.title = route.title;
  document.querySelector('meta[name="description"]').content = route.description;
  document.querySelector('meta[property="og:title"]').content = route.title;
  document.querySelector('meta[property="og:description"]').content = route.description;
  const app = <App route={route} />;
  if (root.dataset.rendered === route.path) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
