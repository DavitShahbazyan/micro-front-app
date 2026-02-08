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

### Important: Workspaces are for Local Development Only

**Workspaces** (`package.json` workspaces) are only used for **local development convenience**. In production, each application is deployed as a **standalone project** on separate servers. Each app has its own `package.json` with all required dependencies.

### Deployment Architecture

Each application can be deployed independently to different servers:

```
Production Servers:
├── shared-server.com:3002    # Shared components
├── remote-server.com:3001    # Remote app  
└── host-server.com:3000      # Host app
```

### Step-by-Step Deployment

#### 1. Deploy Shared App

**On Shared Server:**
```bash
# Copy shared folder to server
cd shared

# Install dependencies (standalone, no workspace needed)
npm install

# Build for production
npm run build:webpack

# Serve (or use your preferred server like nginx, PM2, Docker)
npm run serve
# Or configure nginx, PM2, Docker, etc.
```

**Required files on server:**
- `shared/` folder with all contents
- `build-config/` folder (for webpack.base.js)
- `package.json` and `webpack.config.js`

**Environment:**
- Expose on port 3002 (or configure via your server)
- Ensure CORS headers are enabled

#### 2. Deploy Remote App

**On Remote Server:**
```bash
# Copy apps/remote folder to server
cd apps/remote

# Install dependencies (standalone)
npm install

# Build for production
npm run build

# Configure shared URL (if different from localhost)
export SHARED_URL=https://shared-server.com:3002

# Serve
npm run serve
# Or use nginx, PM2, Docker, etc.
```

**Required files on server:**
- `apps/remote/` folder with all contents
- `build-config/` folder (for webpack.base.js)
- `package.json`

**Environment variables:**
- `SHARED_URL` - URL of shared app (default: http://localhost:3002)

#### 3. Deploy Host App

**On Host Server:**
```bash
# Copy apps/host folder to server
cd apps/host

# Install dependencies (standalone)
npm install

# Build for production
npm run build

# Configure remote and shared URLs
export REMOTE_URL=https://remote-server.com:3001
export SHARED_URL=https://shared-server.com:3002

# Serve
npm run serve
# Or use nginx, PM2, Docker, etc.
```

**Required files on server:**
- `apps/host/` folder with all contents
- `build-config/` folder (for webpack.base.js)
- `package.json` and `webpack.config.js`

**Environment variables:**
- `REMOTE_URL` - URL of remote app (default: http://localhost:3001)
- `SHARED_URL` - URL of shared app (default: http://localhost:3002)

### Important Notes

1. **Build Config Dependency**: Each app needs access to `build-config/webpack.base.js`. Options:
   - Copy `build-config/` folder to each server
   - Publish `build-config` as npm package
   - Copy webpack configs directly into each app folder

2. **CORS Configuration**: Ensure all servers have CORS enabled for Module Federation to work:
   ```javascript
   headers: {
     'Access-Control-Allow-Origin': '*',
   }
   ```

3. **HTTPS in Production**: Use HTTPS URLs in production:
   ```bash
   export SHARED_URL=https://shared.yourdomain.com
   export REMOTE_URL=https://remote.yourdomain.com
   ```

4. **No Workspace Needed**: In production, each app is completely independent. No need for root `package.json` or workspaces.

### Alternative: Copy Build Config to Each App

If you want to avoid copying `build-config/` folder, you can copy `webpack.base.js` into each app:

```bash
# In each app folder
cp ../../build-config/webpack.base.js ./webpack.base.js

# Update webpack.config.js to use local path:
const createWebpackConfig = require('./webpack.base');
```
