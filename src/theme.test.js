import { expect, test, vi, beforeEach, afterEach } from 'vitest';

let isDarkModeModule;

beforeEach(async () => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(),
    setItem: vi.fn(),
  });

  vi.stubGlobal('window', {
    matchMedia: vi.fn(() => ({ matches: false })),
    dispatchEvent: vi.fn(),
  });

  vi.stubGlobal('document', {
    documentElement: {
      setAttribute: vi.fn(),
    },
  });

  isDarkModeModule = await import('./theme.js');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('getIsDarkMode returns current theme state', () => {
  isDarkModeModule.setIsDarkMode(true);
  expect(isDarkModeModule.getIsDarkMode()).toBe(true);

  isDarkModeModule.setIsDarkMode(false);
  expect(isDarkModeModule.getIsDarkMode()).toBe(false);
});

test('setIsDarkMode sets theme state', () => {
  isDarkModeModule.setIsDarkMode(true);
  expect(isDarkModeModule.isDarkMode).toBe(true);

  isDarkModeModule.setIsDarkMode(false);
  expect(isDarkModeModule.isDarkMode).toBe(false);
});

test('toggleTheme switches theme and saves to localStorage', () => {
  isDarkModeModule.setIsDarkMode(false);
  isDarkModeModule.toggleTheme();

  expect(isDarkModeModule.isDarkMode).toBe(true);
  expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

  isDarkModeModule.toggleTheme();

  expect(isDarkModeModule.isDarkMode).toBe(false);
  expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
});

test('toggleTheme applies theme to document', () => {
  isDarkModeModule.toggleTheme();
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');

  isDarkModeModule.toggleTheme();
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
});

test('toggleTheme dispatches themeChanged event', () => {
  isDarkModeModule.toggleTheme();
  expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(CustomEvent));
  const event = window.dispatchEvent.mock.calls[0][0];
  expect(event.type).toBe('themeChanged');
});

test('initTheme loads saved dark theme from localStorage', () => {
  localStorage.getItem.mockReturnValue('dark');
  isDarkModeModule.initTheme();

  expect(isDarkModeModule.isDarkMode).toBe(true);
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
});

test('initTheme loads saved light theme from localStorage', () => {
  localStorage.getItem.mockReturnValue('light');
  isDarkModeModule.initTheme();

  expect(isDarkModeModule.isDarkMode).toBe(false);
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
});

test('initTheme uses system preference when no saved theme', () => {
  localStorage.getItem.mockReturnValue(null);
  window.matchMedia.mockReturnValue({ matches: true });

  isDarkModeModule.initTheme();

  expect(isDarkModeModule.isDarkMode).toBe(true);
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
});

test('initTheme uses system light preference when no saved theme', () => {
  localStorage.getItem.mockReturnValue(null);
  window.matchMedia.mockReturnValue({ matches: false });

  isDarkModeModule.initTheme();

  expect(isDarkModeModule.isDarkMode).toBe(false);
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
});

test('initTheme ignores invalid saved theme', () => {
  localStorage.getItem.mockReturnValue('invalid');
  window.matchMedia.mockReturnValue({ matches: true });

  isDarkModeModule.initTheme();

  expect(isDarkModeModule.isDarkMode).toBe(true);
  expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
});
