import i18next from './i18n.js';
import getRecipes from './recipes.js';

function Homepage() {
  const recipes = getRecipes();
  const recipeLinks = recipes.map(recipe => `
    <a href="#${recipe.id}" class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
      <div class="h-56 overflow-hidden">
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">${recipe.title}</h2>
        <p class="mt-2 text-gray-600">${recipe.description}</p>
      </div>
    </a>
  `).join('');

  return `
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
          ${i18next.t('homepage.title')}
        </h1>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl md:mt-6 md:text-2xl">
          ${i18next.t('homepage.description')}
        </p>
      </div>
      <div>
        <h2 class="text-4xl font-bold text-gray-800 mb-8">${i18next.t('recipes_title')}</h2>
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          ${recipeLinks}
        </div>
      </div>
    </div>
  `;
}

export default Homepage;
