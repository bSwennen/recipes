# Agent Guidelines for the Recipes Project

This document outlines the essential commands and code style guidelines for agents working on this JavaScript project.

## 1. Build, Lint, and Test Commands

*   **Development Server:** `npm run dev`
*   **Build Project:** `npm run build`
*   **Preview Build:** `npm run preview`
*   **Linting:** No explicit linting command is configured.
*   **Testing:** No explicit testing framework is configured.

## 2. Code Style Guidelines

*   **Imports:** Use ES6 import syntax. Relative paths for local modules (e.g., `./module.js`), absolute for node modules.
*   **Formatting:**
    *   Indentation: 2 spaces.
    *   Semicolons: Used at the end of statements.
    *   HTML: Use template literals for HTML string generation.
    *   Functions: Arrow functions for simple callbacks, `function` keyword for components and exported utilities.
*   **Types:** This project uses untyped JavaScript.
*   **Naming Conventions:**
    *   Variables/Functions: `camelCase`.
    *   Components: `PascalCase` (e.g., `Header`, `Homepage`).
*   **Error Handling:** Basic error handling is not explicitly implemented; rely on browser defaults for simple cases.

## 3. Cursor/Copilot Rules
No specific Cursor or Copilot rules were found in this repository.