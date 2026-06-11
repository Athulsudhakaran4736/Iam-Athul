import LegacyPage from './LegacyPage.jsx';
import { getPageByPath } from './legacyRoutes.js';

function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__eyebrow">404</p>
      <h1 className="not-found__title">Page not found</h1>
      <a className="not-found__link" href="/">
        Back to home
      </a>
    </main>
  );
}

export default function App() {
  const page = getPageByPath(window.location.pathname);

  if (!page) {
    return <NotFound />;
  }

  return <LegacyPage page={page} />;
}

