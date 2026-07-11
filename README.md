# Sheqlee Admin Panel

A modern React-based admin panel built with Vite, providing a fast and responsive user interface for managing operations.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Rich Text Editor:** Quill
- **Date/Time Picker:** React Datetime
- **Icons:** React Icons
- **Linting:** ESLint

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:

```bash
npm install
```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs ESLint to check for any linting errors in the source code.

### `npm run preview`

Boots up a local static web server that serves the files from the `dist` folder, allowing you to preview the production build locally.

## Project Structure

```text
sheqlee-admin-panel/
├── public/               # Static assets
├── src/                  # Source code
│   ├── authentication/   # Authentication logic and components
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── images/           # Image assets
│   ├── login/            # Login page and components
│   ├── pages/            # Application pages
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   ├── SvgIcons.jsx      # SVG icon components
│   ├── index.css         # Global styling
│   └── variables.css     # CSS variables
├── eslint.config.js      # ESLint configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```
