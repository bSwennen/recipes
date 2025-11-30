import i18next from './i18n.js';

const getRecipes = () => {
  const recipeIds = Object.keys(i18next.t('recipes', { returnObjects: true }));
  return recipeIds.map(id => ({
    id,
    title: i18next.t(`recipes.${id}.title`),
    description: i18next.t(`recipes.${id}.description`),
    imageUrl: i18next.t(`recipes.${id}.image`),
    ...i18next.t(`recipes.${id}.recipe`, { returnObjects: true }),
  }));
};

export const getRecipe = (id) => {
  return {
    id,
    title: i18next.t(`recipes.${id}.title`),
    description: i18next.t(`recipes.${id}.description`),
    imageUrl: i18next.t(`recipes.${id}.image`),
    ...i18next.t(`recipes.${id}.recipe`, { returnObjects: true }),
  };
};

export default getRecipes;