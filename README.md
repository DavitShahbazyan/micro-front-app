# MicroFrontend Application

This is a MicroFrontend application built with React and Webpack Module Federation, featuring independent deployment and runtime component loading.

## Project Structure

```
micro-front-app/
├── apps/
│   ├── host/          # Host/Container application (port 3000)
│   │   └── webpack.config.js
│   └── remote/        # Remote application (port 3001)
│       └── webpack.config.js
├── build-config/      # Shared webpack base configuration
│   └── webpack.base.js
├── shared/            # Shared components package (port 3002)
│   ├── components/
│   │   ├── Button/
│   │   └── Card/
│   └── webpack.config.js
└── package.json       # Root package.json with workspaces
```

## Features

- **Module Federation**: Uses Webpack Module Federation for micro-frontend architecture
- **Runtime Component Loading**: Shared components loaded at runtime via Module Federation
- **Independent Deployment**: Each app can be deployed and updated independently
- **Shared Components**: Common components in the `shared` folder (TypeScript)
- **Three Applications**: 
  - Shared app (port 3002) - Exposes shared components via Module Federation
  - Host app (container) on port 3000 (JavaScript)
  - Remote app on port 3001 (JavaScript)
- **TypeScript**: Shared components use TypeScript
- **Modern Build**: Webpack 5 with Babel, DRY configuration pattern

## Key Architecture Decisions

- **Shared as Module Federation Remote**: Shared components are exposed via Module Federation, allowing apps to load them at runtime without rebuilding
- **Base Webpack Config**: Single source of truth for webpack configuration, reused by all apps
- **App-Specific Configs**: Each app has its own webpack config in its folder for better organization
- **No Rebuild Required**: When shared components change, only shared needs to be rebuilt; apps load the updated components at runtime

## Getting Started

### Installation

```bash
npm install
```

### Running Applications (Development)

**Start all applications (shared, remote, host) with one command:**
```bash
npm start
```

This will start:
- Shared app on port 3002 (green)
- Remote app on port 3001 (cyan)
- Host app on port 3000 (magenta)

### Building

**Build all applications (including shared):**
```bash
npm run build
```

**Build specific application:**
```bash
npm run build:shared    # Builds shared (TypeScript + Webpack)
npm run build:host      # Builds only host app
npm run build:remote    # Builds only remote app
```

> **Note:** 
> - `build:shared` runs both TypeScript compilation and Webpack build (for Module Federation)
> - When you change shared components, you only need to rebuild shared; apps will load the updated components at runtime

### Serving Production Builds

**Serve all applications simultaneously:**
```bash
npm run serve
```

This serves:
- Shared app on port 3002
- Remote app on port 3001
- Host app on port 3000

> **Note:** For Module Federation to work in production, all three apps need to be built and served. Apps load components from each other at runtime.

## How It Works

1. **Shared Application** (`shared/`):
   - Exposes components (`Button`, `Card`) via Module Federation
   - Runs on port 3002
   - Can be updated independently
   - Apps load shared components at runtime (no rebuild required)

2. **Host Application** (`apps/host`): 
   - Main container application
   - Consumes components from remote app and shared app via Module Federation
   - Runs on port 3000

3. **Remote Application** (`apps/remote`):
   - Exposes components (`Button`, `Card`) via Module Federation
   - Consumes shared components at runtime
   - Can run independently
   - Runs on port 3001

4. **Build Configuration**:
   - **Base webpack config** (`build-config/webpack.base.js`) - Reusable base configuration
   - **App configs** (`apps/*/webpack.config.js`) - Use base config with app-specific parameters
   - **Shared config** (`shared/webpack.config.js`) - Uses base config for Module Federation
   - DRY principle - single source of truth for webpack config

## Development Workflow

### Making Changes to Shared Components

1. Make changes in `shared/components/`
2. Rebuild shared: `npm run build:shared`
3. Restart shared serve (if using production mode)
4. **Apps don't need to be rebuilt** - they load updated components at runtime!

### Making Changes to App Code

1. Make changes in `apps/host/` or `apps/remote/`
2. Rebuild that specific app: `npm run build:host` or `npm run build:remote`
3. Restart that app's serve

## Technologies

- React 18
- TypeScript (for shared components)
- JavaScript (for apps)
- Webpack 5
- Module Federation
- Babel
- CSS Modules

## Scripts Reference

- `npm start` - Start all apps in development mode
- `npm run build` - Build all apps (shared + host + remote)
- `npm run build:shared` - Build shared (TypeScript + Webpack)
- `npm run build:host` - Build host app only
- `npm run build:remote` - Build remote app only
- `npm run serve` - Serve all production builds

## Development

The applications use hot module replacement (HMR) for fast development. Changes in shared components will be reflected in both applications when using development mode.

## Production Deployment

Each application can be deployed independently:
- Shared: Deploy to any server, expose on port 3002
- Remote: Deploy to any server, expose on port 3001
- Host: Deploy to any server, expose on port 3000

Configure URLs via environment variables:
- `SHARED_URL` - URL of shared app (default: http://localhost:3002)
- `REMOTE_URL` - URL of remote app (default: http://localhost:3001)
