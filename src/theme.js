let isDarkMode = false;

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getSavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    return saved === 'dark';
  }
  return null;
}

function initTheme() {
  const savedTheme = getSavedTheme();
  if (savedTheme !== null) {
    isDarkMode = savedTheme;
  } else {
    isDarkMode = getSystemTheme();
  }
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  applyTheme();
  window.dispatchEvent(new CustomEvent('themeChanged'));
}

function setIsDarkMode(value) {
  isDarkMode = value;
}

function getIsDarkMode() {
  return isDarkMode;
}

export { isDarkMode, initTheme, toggleTheme, setIsDarkMode, getIsDarkMode };
