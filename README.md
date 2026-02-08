# MicroFrontend Application

This is a MicroFrontend application built with React and Webpack Module Federation.

## Project Structure

```
micro-front-app/
├── apps/
│   ├── host/          # Host/Container application (port 3000)
│   └── remote/        # Remote application (port 3001)
├── build-config/      # Shared webpack configurations
├── shared/            # Shared components and utilities
│   └── components/
│       ├── Button/
│       └── Card/
└── package.json       # Root package.json with workspaces
```

## Features

- **Module Federation**: Uses Webpack Module Federation for micro-frontend architecture
- **Shared Components**: Common components in the `shared` folder (TypeScript)
- **Two React Apps**: 
  - Host app (container) on port 3000 (JavaScript)
  - Remote app on port 3001 (JavaScript)
- **TypeScript**: Shared components and build-config use TypeScript
- **Modern Build**: Webpack 5 with Babel

## Getting Started

### Installation

```bash
npm install
```

### Running Applications

**Start both applications with one command:**
```bash
npm start
```
or
```bash
npm run start:all
```

This will start both the remote app (port 3001) and host app (port 3000) simultaneously.

**Or start them separately:**

**Terminal 1 - Remote App:**
```bash
npm run start:remote
```

**Terminal 2 - Host App:**
```bash
npm run start:host
```

> **Note:** Make sure to start the remote app before or together with the host app, as the host app depends on remote components.

### Building

**Build all applications (including shared):**
```bash
npm run build
```

**Build shared components separately:**
```bash
npm run build:shared
```

**Build specific application:**
```bash
npm run build:host
npm run build:remote
```

**Watch mode for shared components (auto-rebuild on changes):**
```bash
npm run build:watch:shared
```

> **Note:** The shared package builds to `shared/dist/` directory with TypeScript declarations and CSS files.

## How It Works

1. **Host Application** (`apps/host`): 
   - Main container application
   - Consumes components from the remote app
   - Uses shared components from the `shared` folder

2. **Remote Application** (`apps/remote`):
   - Exposes components via Module Federation
   - Can run independently
   - Shares components with the host app

3. **Shared Components** (`shared/`):
   - Common components used by both apps (TypeScript)
   - Button and Card components included
   - Type-safe component interfaces
   - Can be built independently as a package
   - Build output: `shared/dist/` (JS, TypeScript declarations, CSS)

4. **Build Configuration**:
   - **Base webpack config** (`build-config/webpack.base.js`) - Reusable base configuration
   - **Host config** (`apps/host/webpack.config.js`) - Uses base config with host-specific parameters
   - **Remote config** (`apps/remote/webpack.config.js`) - Uses base config with remote-specific parameters
   - Module Federation setup
   - Development and production builds
   - DRY (Don't Repeat Yourself) principle - single source of truth for webpack config
   - Each app has its own webpack config in its folder for better organization

## Technologies

- React 18
- TypeScript (for shared components)
- JavaScript (for apps)
- Webpack 5
- Module Federation
- Babel
- CSS Modules

## Development

The applications use hot module replacement (HMR) for fast development. Changes in shared components will be reflected in both applications.

