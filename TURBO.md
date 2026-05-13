# Turbo Configuration Guide

This project uses **Turbo** for smart, incremental builds in a monorepo environment.

## What is Turbo?

Turbo is a build system optimizer that:
- **Detects Changes**: Automatically identifies which packages have changed
- **Skips Builds**: Only rebuilds packages that have changed
- **Caches Results**: Stores build artifacts for faster subsequent builds
- **Respects Dependencies**: Ensures proper build order (e.g., apps build after shared)
- **Parallel Builds**: Builds independent packages simultaneously

## Configuration Files

### `turbo.json`

Root configuration file that defines:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],      // Build dependencies first
      "outputs": ["dist/**"],        // Cache these outputs
      "cache": true                  // Enable caching for this task
    }
  }
}
```

**Key fields:**
- `dependsOn`: Tasks that must complete first (`^` means in dependency packages)
- `outputs`: Files/folders to cache
- `cache`: Enable/disable caching for this task

### Package.json Scripts

Each package should have:

```json
{
  "scripts": {
    "build": "webpack --config webpack.config.js --mode production"
  }
}
```

Turbo automatically discovers and runs these scripts.

## Build Order

With `dependsOn: ["^build"]`, the build order is:

```
shared#build
├── host#build (waits for shared)
└── remote#build (waits for shared)
```

This ensures dependencies are built first.

## Usage

### Build All Packages

```bash
npm run build
```

Only changed packages rebuild. First run caches everything.

### Build Specific Package

```bash
npm run build:shared   # Only shared
npm run build:host     # Only host
npm run build:remote   # Only remote
```

### Incremental Build (Changed Since Git HEAD)

```bash
npm run build:fast
```

Only rebuilds packages with changes since the last commit.

### View Build Plan (Dry Run)

```bash
npx turbo build --dry-run
```

Shows what Turbo would build without actually running it.

### Clear Cache

```bash
npm run clean
```

Removes all `dist/` folders and `node_modules/`.

### Disable Cache for a Task

Edit `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "cache": false  // Don't cache this task
    }
  }
}
```

## Example Scenario

### First Build (All Changed)

```bash
$ npm run build

Running build in 3 packages
@micro-front-app/shared#build - MISS (not cached)
host#build - MISS (not cached)
remote#build - MISS (not cached)

Time: 45s
```

### Second Build (No Changes)

```bash
$ npm run build

Running build in 3 packages (all cached)
@micro-front-app/shared#build - HIT (cached)
host#build - HIT (cached)
remote#build - HIT (cached)

Time: 0.5s ⚡
```

### Edit shared/ Only

```bash
$ npm run build

Running build in 2 packages
@micro-front-app/shared#build - MISS (changed)
host#build - HIT (cached, shared didn't change)
remote#build - HIT (cached, shared didn't change)

Time: 15s
```

Wait, actually host and remote depend on shared, so they will rebuild:

```bash
$ npm run build

Running build in 3 packages
@micro-front-app/shared#build - MISS (changed)
host#build - MISS (dependency changed)
remote#build - MISS (dependency changed)

Time: 25s
```

## Performance Tips

1. **Use Build Artifacts**: Ensure `outputs` in turbo.json match actual build output paths
2. **Keep Tasks Independent**: Use `dependsOn` to declare dependencies
3. **Use `.turbo/` in .gitignore**: Cache files shouldn't be committed
4. **Monitor Cache Hit Rate**: Run `npx turbo build --dry-run` to see what would build

## Troubleshooting

### Cache Not Working

- Check `turbo.json` has correct `outputs` paths
- Run `npm run clean` to clear cache
- Verify package managers are specified in root `package.json` (`packageManager` field)

### Build Order Wrong

- Check `dependsOn` declarations in `turbo.json`
- Use `npx turbo build --dry-run` to see execution plan
- Add explicit `dependsOn: ["^build"]` for apps that need shared

### Turbo Not Found

```bash
npm install -D turbo
```

### Remote Caching

Turbo can cache to remote storage (Vercel, Turborepo SaaS):

```bash
npx turbo login
npx turbo build --force  # Upload cache
```

(Not configured by default in this project)

## Migration from Old Build System

**Old way (rebuilds everything):**
```bash
npm run build:shared && npm run build --workspaces --if-present
```

**New way (only changed packages):**
```bash
npm run build
```

The new way is faster and should be the default.

