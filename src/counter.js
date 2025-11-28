import i18next from './i18n.js';

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = i18next.t('countIs', { count });
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
