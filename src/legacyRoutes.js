import homeHtml from '../dvdrod.com/index.html?raw';
import caixabankHtml from '../dvdrod.com/caixabank?raw';
import gymondoPremiumHtml from '../dvdrod.com/gymondo-premium?raw';
import gymondoChallengesHtml from '../dvdrod.com/gymondo-challenges?raw';
import zattooHtml from '../dvdrod.com/zattoo?raw';
import neotasteOnboardingHtml from '../dvdrod.com/neotaste-onboarding?raw';
import neotasteQuestsHtml from '../dvdrod.com/neotaste-quests?raw';

const pages = [
  { path: '/', html: homeHtml },
  { path: '/caixabank', html: caixabankHtml },
  { path: '/gymondo-premium', html: gymondoPremiumHtml },
  { path: '/gymondo-challenges', html: gymondoChallengesHtml },
  { path: '/zattoo', html: zattooHtml },
  { path: '/neotaste-onboarding', html: neotasteOnboardingHtml },
  { path: '/neotaste-quests', html: neotasteQuestsHtml },
];

function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') {
    return '/';
  }

  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

export function getPageByPath(pathname) {
  const normalized = normalizePath(pathname);
  return pages.find((page) => page.path === normalized) ?? null;
}

