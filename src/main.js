import './style.css'
import i18next from './i18n.js';
import { initTheme, toggleTheme, setIsDarkMode } from './theme.js';
import Homepage from './Homepage.js';
import Recipe, { initRecipeModal } from './Recipe.js';
import { getRecipe } from './recipes.js';
import Header, { addHeaderListeners } from './Header.js';

initTheme();

const updateTitle = () => {
  document.title = i18next.t('recipes_title');
};

const renderHeader = () => {
  const header = document.querySelector('header');
  const isHomePage = window.location.hash === '';
  header.innerHTML = Header(isHomePage);
  addHeaderListeners();
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

window.addEventListener('hashchange', () => {
  render();
  renderHeader();
});

renderHeader();
render();
updateTitle();

window.addEventListener('themeToggleRequest', handleThemeToggle);

window.addEventListener('themeChanged', () => {
  render();
  renderHeader();
});

i18next.on('languageChanged', () => {
  render();
  renderHeader();
  updateTitle();
});
