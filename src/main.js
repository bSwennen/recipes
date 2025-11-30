import './style.css'
import i18next from './i18n.js';
import Homepage from './Homepage.js';
import Recipe from './Recipe.js';
import { getRecipe } from './recipes.js';
import Header, { addHeaderListeners } from './Header.js';

const renderHeader = () => {
  const header = document.querySelector('header');
  const isHomePage = window.location.hash === '';
  header.innerHTML = Header(isHomePage);
  addHeaderListeners();
}

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

window.addEventListener('hashchange', () => {
  render();
  renderHeader();
});

renderHeader();
render();

i18next.on('languageChanged', (lng) => {
  render();
});
