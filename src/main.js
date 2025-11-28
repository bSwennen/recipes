import './style.css'
import i18next from './i18n.js';
import Homepage from './Homepage.js';
import Recipe from './Recipe.js';
import { getRecipe } from './recipes.js';

const render = () => {
  const hash = window.location.hash.substring(1);
  const app = document.querySelector('#app');

  if (hash) {
    const recipe = getRecipe(hash);
    app.innerHTML = Recipe(recipe);
  } else {
    app.innerHTML = Homepage();
  }
};

window.addEventListener('hashchange', render);

const enButton = document.getElementById('lang-en');
const nlButton = document.getElementById('lang-nl');

const setActiveButton = (lang) => {
  const buttons = {
    en: enButton,
    nl: nlButton,
  };

  const updateButtonStyles = (button, isActive) => {
    const activeClasses = ['text-gray-900', 'font-semibold'];
    const inactiveClasses = ['text-gray-500', 'hover:text-gray-900'];

    if (isActive) {
      button.classList.add(...activeClasses);
      button.classList.remove(...inactiveClasses);
    } else {
      button.classList.remove(...activeClasses);
      button.classList.add(...inactiveClasses);
    }
  };

  Object.entries(buttons).forEach(([key, button]) => {
    updateButtonStyles(button, key === lang);
  });
};


enButton.addEventListener('click', () => i18next.changeLanguage('en'));
nlButton.addEventListener('click', () => i18next.changeLanguage('nl'));

render();
setActiveButton(i18next.language);

i18next.on('languageChanged', (lng) => {
  setActiveButton(lng);
  render();
});
