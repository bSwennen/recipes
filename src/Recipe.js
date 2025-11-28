import i18next from './i18n.js';

function Recipe(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
  const instructions = recipe.instructions.map((step, index) => `
    <li>
      <h3 class="text-lg font-bold text-[#87A96B] mb-1">${i18next.t('step', { count: index + 1 })}</h3>
      <p class="text-gray-700">${step}</p>
    </li>
  `).join('');

  return `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-64 object-cover rounded-t-lg mb-6" />
      <h1 class="text-4xl font-bold text-center mb-6 text-gray-800">${recipe.title}</h1>
      <p class="text-center text-gray-600 mb-8">${recipe.description}</p>

      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider pb-2 border-b-2 border-gray-300">${i18next.t('ingredients')}</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-600 text-left ingredients-list">
            ${ingredients}
          </ul>
        </div>

        <div class="md:w-2/3">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wider pb-2 border-b-2 border-gray-300">${i18next.t('instructions')}</h2>
          <ul class="space-y-6">
            ${instructions}
          </ul>
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-xl font-semibold mb-3 text-gray-700">${i18next.t('servingSuggestion')}</h3>
        <p class="text-gray-600">${recipe.servingSuggestion}</p>
      </div>

      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-3 text-gray-700">${i18next.t('proTip')}</h3>
        <p class="text-gray-600">${recipe.proTip}</p>
      </div>
    </div>
  `;
}

export default Recipe;
