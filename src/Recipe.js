import i18next from './i18n.js';

function ModalCarousel() {
  return `
    <div id="modal" class="fixed inset-0 bg-black bg-opacity-75 hidden z-50 flex items-center justify-center">
      <div class="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <button id="close-modal" class="absolute top-4 right-4 text-white text-4xl z-10 hover:text-gray-300">&times;</button>
        <div class="relative">
          <div id="carousel-container" class="overflow-hidden rounded-lg">
            <div id="carousel-track" class="flex transition-transform duration-300">
              <div class="w-full flex-shrink-0">
                <img src="/progret_recipe1.JPEG" alt="Original Progret Recipe - Page 1" class="w-full h-auto max-h-[80vh] object-contain" />
              </div>
              <div class="w-full flex-shrink-0">
                <img src="/progret_recipe2.JPEG" alt="Original Progret Recipe - Page 2" class="w-full h-auto max-h-[80vh] object-contain" />
              </div>
            </div>
          </div>
          <button id="prev-btn" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 text-gray-800 p-3 rounded-full hover:bg-opacity-90">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button id="next-btn" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 text-gray-800 p-3 rounded-full hover:bg-opacity-90">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          <div class="flex justify-center mt-4 space-x-2">
            <span class="carousel-dot w-3 h-3 rounded-full bg-white opacity-75"></span>
            <span class="carousel-dot w-3 h-3 rounded-full bg-white opacity-50"></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function Recipe(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
  const instructions = recipe.instructions.map((step, index) => `
    <li class="flex items-start">
      <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold text-lg">${index + 1}</div>
      <p class="ml-4 text-lg leading-relaxed">${step}</p>
    </li>
  `).join('');
  
  const isProgret = recipe.id === 'progret';
  const originalRecipeButton = isProgret ? `
    <div class="flex justify-center mb-6">
      <button id="view-original-recipe" class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>${i18next.t('viewOriginalRecipe')}</span>
      </button>
    </div>
  ` : '';

  return `
    ${ModalCarousel()}
    <div class="bg-white rounded-2xl shadow-2xl max-w-5xl mx-auto my-8 overflow-hidden">
      <div class="h-96 overflow-hidden">
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="w-full h-full object-cover" />
      </div>
      <div class="p-8 md:p-12">
        <h1 class="text-5xl font-extrabold text-center mb-4 text-gray-900">${recipe.title}</h1>
        <p class="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">${recipe.description}</p>
        ${originalRecipeButton}

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

export function initRecipeModal() {
  let currentSlide = 0;
  const totalSlides = 2;
  
  const modal = document.getElementById('modal');
  const viewOriginalBtn = document.getElementById('view-original-recipe');
  const closeBtn = document.getElementById('close-modal');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  
  function showSlide(index) {
    if (index < 0) currentSlide = totalSlides - 1;
    else if (index >= totalSlides) currentSlide = 0;
    else currentSlide = index;
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.style.opacity = i === currentSlide ? '0.75' : '0.5';
    });
  }
  
  if (viewOriginalBtn) {
    viewOriginalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      showSlide(0);
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        modal.classList.add('hidden');
      } else if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
      }
    }
  });
}
