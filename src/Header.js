import i18next from './i18n.js';

function Header(isHomePage) {
  return `
    <div class="w-full max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <button id="home" class="text-lg font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300 ${isHomePage ? 'invisible' : ''}">
        ${i18next.t('home')}
      </button>
      <div class="flex items-center gap-4">
        <button id="lang-nl" class="text-lg font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
          NL
        </button>
        <button id="lang-en" class="text-lg font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">
          EN
        </button>
      </div>
    </div>
  `;
}

function setActiveButton(lng) {
  const nlButton = document.getElementById('lang-nl');
  const enButton = document.getElementById('lang-en');

  if (lng === 'nl') {
    nlButton.classList.add('font-bold', 'text-gray-900');
    enButton.classList.remove('font-bold', 'text-gray-900');
  } else {
    enButton.classList.add('font-bold', 'text-gray-900');
    nlButton.classList.remove('font-bold', 'text-gray-900');
  }
}

let languageListenerAdded = false;

export function addHeaderListeners() {
  document.getElementById('home').addEventListener('click', () => {
    window.location.hash = '';
  });

  document.getElementById('lang-nl').addEventListener('click', () => {
    i18next.changeLanguage('nl');
  });

  document.getElementById('lang-en').addEventListener('click', () => {
    i18next.changeLanguage('en');
  });

  if (!languageListenerAdded) {
    i18next.on('languageChanged', (lng) => {
      setActiveButton(lng);
    });
    languageListenerAdded = true;
  }

  setActiveButton(i18next.language);
}

export default Header;
