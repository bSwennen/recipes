import i18next from './i18n.js';

function Recipe(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
  const instructions = recipe.instructions.map((step, index) => `
    <li class="flex items-start">
      <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold text-lg">${index + 1}</div>
      <p class="ml-4 text-lg leading-relaxed">${step}</p>
    </li>
  `).join('');

  return `
    <div class="bg-white rounded-2xl shadow-2xl max-w-5xl mx-auto my-8 overflow-hidden">
      <div class="h-96 overflow-hidden">
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-full object-cover" />
      </div>
      <div class="p-8 md:p-12">
        <h1 class="text-5xl font-extrabold text-center mb-4 text-gray-900">${recipe.title}</h1>
        <p class="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">${recipe.description}</p>

        <div class="grid md:grid-cols-3 gap-12">
          <div class="md:col-span-1">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">${i18next.t('ingredients')}</h2>
            <ul class="space-y-3 text-lg text-gray-700">
              ${ingredients}
            </ul>
          </div>

          <div class="md:col-span-2">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">${i18next.t('instructions')}</h2>
            <ul class="space-y-8">
              ${instructions}
            </ul>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200 space-y-8">
          <div>
            <h3 class="text-2xl font-semibold mb-3 text-gray-800">${i18next.t('servingSuggestion')}</h3>
            <p class="text-lg text-gray-700">${recipe.servingSuggestion}</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3 text-gray-800">${i18next.t('proTip')}</h3>
            <p class="text-lg text-gray-700">${recipe.proTip}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default Recipe;
