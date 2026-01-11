# Recipes App

![Tests](https://github.com/bSwennen/recipes/actions/workflows/test.yml/badge.svg)

This is a simple, single-page web application for displaying recipes. It is built with vanilla JavaScript, using Vite for the development server and build tooling, and Tailwind CSS for styling. The application now supports dynamic titles and translated "Home" button based on the selected language (English or Dutch).

## Building and Running

1.  **Install Dependencies:**
    Before running the project, install the necessary Node.js dependencies.
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    To start the Vite development server and view the application in your browser:
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    To create a production-ready build of the application in the `dist/` directory:
    ```bash
    npm run build
    ```

4.  **Preview Production Build:**
    To preview the production build locally:
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Modular JavaScript:** The code is structured using ES modules (`import`/`export`).
*   **Component-like Structure:** Although it's vanilla JS, the code separates the rendering logic (`Recipe.js`, `Homepage.js`, `Header.js`) from the main application logic (`main.js`), mimicking a simple component-based architecture.
*   **Styling:** Styling is done exclusively through Tailwind CSS utility classes. The `@import "tailwindcss";` directive is in `src/style.css`.
*   **Data:** Recipe data is currently hardcoded as a JavaScript object in `src/recipes.js` and translated via `src/locales/en.json` and `src/locales/nl.json`. Future development could involve fetching this data from an API or a separate data file.
*   **Internationalization:** The application uses `i18next` for internationalization, allowing for dynamic language switching between English and Dutch for key UI elements like the title and the home button.
