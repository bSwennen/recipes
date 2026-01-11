import { expect, test, vi } from 'vitest';

vi.mock('./i18n.js', () => ({
  default: {
    t: (key, options) => {
      const translations = {
        'recipes_title': 'Recipes',
        'recipes.borscht.title': 'Borsjt',
        'recipes.borscht.description': 'A classic beet soup',
        'recipes.borscht.image': '/borscht.jpg',
        'recipes.borscht.recipe': {
          ingredients: ['beets', 'cabbage'],
          instructions: ['boil', 'serve'],
          servingSuggestion: 'with sour cream',
          proTip: 'add dill'
        },
        'recipes.progret.title': 'Progret',
        'recipes.progret.description': 'A delicious stew',
        'recipes.progret.image': '/progret.png',
        'recipes.progret.recipe': {
          ingredients: ['meat', 'potatoes'],
          instructions: ['chop', 'cook'],
          servingSuggestion: 'with bread',
          proTip: 'slow cook'
        },
        'recipes': {
          borscht: {
            title: 'Borsjt',
            description: 'A classic beet soup',
            image: '/borscht.jpg',
            recipe: {
              ingredients: ['beets', 'cabbage'],
              instructions: ['boil', 'serve'],
              servingSuggestion: 'with sour cream',
              proTip: 'add dill'
            }
          },
          progret: {
            title: 'Progret',
            description: 'A delicious stew',
            image: '/progret.png',
            recipe: {
              ingredients: ['meat', 'potatoes'],
              instructions: ['chop', 'cook'],
              servingSuggestion: 'with bread',
              proTip: 'slow cook'
            }
          }
        }
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
    language: 'nl',
    on: vi.fn()
  }
}));

import getRecipes, { getRecipe } from './recipes.js';

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
