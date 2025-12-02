import { expect, test } from 'vitest';
import getRecipes, { getRecipe } from './recipes.js';

// Mock i18next for testing purposes
const mockI18next = {
  t: (key, options) => {
    const translations = {
      'recipes_title': 'Recipes',
      'recipes.borscht.title': 'Borscht',
      'recipes.borscht.description': 'A classic beet soup',
      'recipes.borscht.image': './borscht.jpg',
      'recipes.borscht.recipe.ingredients': ['beets', 'cabbage'],
      'recipes.borscht.recipe.instructions': ['boil', 'serve'],
      'recipes.borscht.recipe.servingSuggestion': 'with sour cream',
      'recipes.borscht.recipe.proTip': 'add dill',
      'recipes.progret.title': 'Progret',
      'recipes.progret.description': 'A delicious stew',
      'recipes.progret.image': './progret.png',
      'recipes.progret.recipe.ingredients': ['meat', 'potatoes'],
      'recipes.progret.recipe.instructions': ['chop', 'cook'],
      'recipes.progret.recipe.servingSuggestion': 'with bread',
      'recipes.progret.recipe.proTip': 'slow cook',
    };

    if (options && options.returnObjects) {
      const parts = key.split('.');
      let current = translations;
      for (const part of parts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return {};
        }
      }
      return current;
    }
    return translations[key] || key;
  },
};

// Manually inject the mock into the module that uses i18next
// This is a simplified approach; for more complex scenarios, consider a dedicated mocking library
import * as recipesModule from './recipes.js';
recipesModule.i18next = mockI18next;

test('getRecipes returns a list of recipes', () => {
  const recipes = getRecipes();
  expect(recipes).toHaveLength(2);
  expect(recipes[0].id).toBe('borscht');
  expect(recipes[1].id).toBe('progret');
});

test('getRecipe returns a single recipe by id', () => {
  const recipe = getRecipe('borscht');
  expect(recipe.id).toBe('borscht');
  expect(recipe.title).toBe('Borsjt');
});
