import i18next from './i18n.js';
import getRecipes from './recipes.js';

function Homepage() {
  const recipes = getRecipes();
  const recipeLinks = recipes.map(recipe => `
    <a href="#${recipe.id}" class="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h2 class="text-2xl font-bold text-gray-800">${recipe.title}</h2>
      <p class="text-gray-600">${recipe.description}</p>
    </a>
  `).join('');

  return `
    <div class="bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            ${i18next.t('homepage.title')}
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            ${i18next.t('homepage.description')}
          </p>
        </div>
        <div class="mt-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">${i18next.t('recipes_title')}</h2>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            ${recipeLinks}
          </div>
        </div>
      </div>
    </div>
  `;
}

export default Homepage;
