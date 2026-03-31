# Agri-Smart Frontend

A modern, role-based React dashboard for the **Agri-Smart** agricultural management platform. Built with React 19, TypeScript, Vite, and Tailwind CSS v4 — designed for three distinct user roles: **Farmers**, **Agricultural Advisors**, and **System Administrators**.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [User Roles & Routes](#user-roles--routes)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool        | Minimum Version    | Download                            |
| ----------- | ------------------ | ----------------------------------- |
| **Node.js** | v18.0.0+           | [nodejs.org](https://nodejs.org/)   |
| **npm**     | v9.0.0+            | Comes with Node.js                  |
| **Git**     | Any recent version | [git-scm.com](https://git-scm.com/) |

To verify your installations, run:

```bash
node --version
npm --version
git --version
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/M-arnold-tech/Agri-Smart_frontend.git
cd Agri-Smart_frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`, including React 19, React Router, React Hook Form, Lucide icons, and Tailwind CSS.

> **Note:** The installation may take a minute or two. Do not interrupt it.

---

## Environment Setup

### 3. Create the `.env` File

The app requires an environment variable to connect to the backend API. In the **root of the project**, create a file named `.env`:

```bash
# On Windows (PowerShell)
New-Item .env

# On Mac/Linux
touch .env
```

Then open the `.env` file and add the following:

```env
VITE_API_BASE_URL=https://agri-smart-bankend.onrender.com/api/v1
```

> **Important:** All Vite environment variables **must** be prefixed with `VITE_` to be accessible in the browser. Never commit your `.env` file to version control — it is already listed in `.gitignore`.

If you are running your own local backend instead, replace the URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## Running the Project

### 4. Start the Development Server

```bash
npm run dev
```

Once the server starts, you will see output like:

```
  VITE vX.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)**.

> The development server features **Hot Module Replacement (HMR)** — your browser will automatically refresh whenever you save a file.

---

## Project Structure

```
Agri-Smart_frontend/
├── public/                   # Static assets (SVGs, images)
├── src/
│   ├── api/                  # API call functions (fetch wrappers)
│   ├── assets/               # Local image/icon assets
│   ├── components/
│   │   └── ui/               # Reusable UI components (Button, Card, Input, Drawer, etc.)
│   ├── constants/            # Shared constants (e.g. Rwanda districts list)
│   ├── hooks/                # Custom React hooks (useAuth, useGroups, etc.)
│   ├── pages/
│   │   ├── auth/             # Login & registration pages
│   │   ├── farmer/           # Farmer dashboard pages & layout
│   │   ├── advisor/          # Agricultural Advisor dashboard
│   │   ├── admin/            # System Administrator dashboard
│   │   └── LandingPage.tsx   # Public landing page
│   ├── App.tsx               # Root component with route definitions
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles & Tailwind CSS imports
├── .env                      # Environment variables (you create this)
├── .gitignore
├── index.html                # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## User Roles & Routes

The application has three protected dashboard areas, each accessible after logging in with the appropriate role:

| Role        | Route                 | Description                                         |
| ----------- | --------------------- | --------------------------------------------------- |
| **Farmer**  | `/farmer`             | Crop management, tasks, weather, cooperative groups |
| **Advisor** | `/advisor`            | Advisory tools, farmer management, knowledge base   |
| **Admin**   | `/admin`              | System administration, user management              |
| **Auth**    | `/login`, `/register` | Public authentication pages                         |
| **Landing** | `/`                   | Public landing page                                 |

Authentication is handled via **JWT tokens** stored in `localStorage`. The app automatically redirects users to their role-specific dashboard after login.

---

## Available Scripts

Run these from the project root:

| Command           | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Start the local development server with HMR                      |
| `npm run build`   | Type-check and build the app for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally                             |
| `npm run lint`    | Run ESLint to check for code quality issues                      |

---

## Tech Stack

| Technology          | Version | Purpose                 |
| ------------------- | ------- | ----------------------- |
| **React**           | 19      | UI framework            |
| **TypeScript**      | ~5.9    | Type safety             |
| **Vite**            | 8       | Build tool & dev server |
| **Tailwind CSS**    | 4       | Utility-first styling   |
| **React Router**    | 7       | Client-side routing     |
| **React Hook Form** | 7       | Form state management   |
| **Yup**             | 1       | Form validation schemas |
| **Lucide React**    | Latest  | Icon library            |
| **React Hot Toast** | 2       | Toast notifications     |
| **jwt-decode**      | 4       | JWT token parsing       |
| **Axios**           | 1       | HTTP client             |

---

## Troubleshooting

### `npm install` fails

- Make sure your Node.js version is **18 or higher**: `node --version`
- Delete `node_modules` and `package-lock.json` and try again:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### The app loads but API calls fail

- Double-check your `.env` file exists in the project root (not inside `src/`)
- Make sure the variable name is exactly `VITE_API_BASE_URL` (no typos, no spaces)
- Restart the dev server after editing `.env` — Vite only reads env files at startup:
  ```bash
  # Stop the server (Ctrl+C), then restart
  npm run dev
  ```

### `npm run build` fails with TypeScript errors

- Run `npm run lint` first to identify code issues
- Make sure all imports are used — TypeScript will error on unused imports
- Check the exact error message; the file and line number are always shown

### Port 5173 is already in use

- Vite will automatically try the next available port (5174, 5175, etc.)
- Or you can specify a port manually:
  ```bash
  npm run dev -- --port 3000
  ```

### White screen / blank page in the browser

- Open browser DevTools (`F12`) → Console tab and check for errors
- Make sure the `.env` file has the correct API URL
- Try a hard refresh: `Ctrl + Shift + R`

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m "feat: describe your change"`
3. Push to your branch: `git push origin feature/your-feature-name`
4. Open a Pull Request on GitHub

---

_Built with ❤️ for Rwandan farmers and agricultural communities._
