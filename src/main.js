import './style.css'
import i18next from './i18n.js';
import { initTheme, toggleTheme, setIsDarkMode } from './theme.js';
import Homepage from './Homepage.js';
import Recipe, { initRecipeModal } from './Recipe.js';
import { getRecipe } from './recipes.js';
import Header from './Header.js';

initTheme();

const updateTitle = () => {
  document.title = i18next.t('recipes_title');
};

const setActiveLanguageButton = (lng) => {
  const nlButton = document.getElementById('lang-nl');
  const enButton = document.getElementById('lang-en');
  if (!nlButton || !enButton) return;
  
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  if (lng === 'nl') {
    nlButton.classList.add('font-bold');
    nlButton.classList.add(isDark ? 'text-white' : 'text-gray-900');
    enButton.classList.remove('font-bold', 'text-gray-900', 'text-white');
  } else {
    enButton.classList.add('font-bold');
    enButton.classList.add(isDark ? 'text-white' : 'text-gray-900');
    nlButton.classList.remove('font-bold', 'text-gray-900', 'text-white');
  }
};

const renderHeader = () => {
  const header = document.querySelector('header');
  const isHomePage = window.location.hash === '';
  header.innerHTML = Header(isHomePage);
  setActiveLanguageButton(i18next.language);
};

const handleThemeToggle = () => {
  toggleTheme();
};

const render = () => {
  const hash = window.location.hash.substring(1);
  const app = document.querySelector('#app');

  if (hash) {
    const recipe = getRecipe(hash);
    app.innerHTML = Recipe(recipe);
    setTimeout(initRecipeModal, 0);
  } else {
    app.innerHTML = Homepage();
  }
};

const setupHeaderEventDelegation = () => {
  const header = document.querySelector('header');
  
  header.addEventListener('click', (e) => {
    const target = e.target;
    const button = target.closest('button');
    
    if (!button) return;
    
    const id = button.id;
    
    if (id === 'home') {
      window.location.hash = '';
    } else if (id === 'lang-nl') {
      i18next.changeLanguage('nl');
    } else if (id === 'lang-en') {
      i18next.changeLanguage('en');
    } else if (id === 'theme-toggle') {
      window.dispatchEvent(new CustomEvent('themeToggleRequest'));
    }
  });
};

window.addEventListener('hashchange', () => {
  render();
  renderHeader();
});

renderHeader();
render();
updateTitle();
setupHeaderEventDelegation();

window.addEventListener('themeToggleRequest', handleThemeToggle);

window.addEventListener('themeChanged', () => {
  render();
  renderHeader();
});

i18next.on('languageChanged', (lng) => {
  render();
  renderHeader();
  updateTitle();
});
