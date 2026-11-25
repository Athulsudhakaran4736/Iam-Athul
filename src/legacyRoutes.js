import caixabankHtml from '../dvdrod.com/caixabank?raw';
import gymondoPremiumHtml from '../dvdrod.com/gymondo-premium?raw';
import gymondoChallengesHtml from '../dvdrod.com/gymondo-challenges?raw';
import zattooHtml from '../dvdrod.com/zattoo?raw';
import neotasteOnboardingHtml from '../dvdrod.com/neotaste-onboarding?raw';
import neotasteQuestsHtml from '../dvdrod.com/neotaste-quests?raw';

const pages = {
  '/caixabank': caixabankHtml,
  '/gymondo-premium': gymondoPremiumHtml,
  '/gymondo-challenges': gymondoChallengesHtml,
  '/zattoo': zattooHtml,
  '/neotaste-onboarding': neotasteOnboardingHtml,
  '/neotaste-quests': neotasteQuestsHtml,
};

export function getPageByPath(path) {
  return { path, html: pages[path] };
}
