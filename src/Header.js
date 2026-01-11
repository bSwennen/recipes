import i18next from './i18n.js';
import { getIsDarkMode } from './theme.js';

function Header(isHomePage) {
  const currentIsDarkMode = getIsDarkMode();
  return `
    <div class="w-full max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <button id="home" class="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-300 ${isHomePage ? 'invisible' : ''}">
        ${i18next.t('home')}
      </button>
      <div class="flex items-center gap-4">
        <button id="lang-nl" class="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-300">
          NL
        </button>
        <button id="lang-en" class="text-lg font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-300">
          EN
        </button>
        <button id="theme-toggle" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" aria-label="Toggle theme">
          ${currentIsDarkMode ? `
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          ` : `
            <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          `}
        </button>
      </div>
    </div>
  `;
}

export default Header;
