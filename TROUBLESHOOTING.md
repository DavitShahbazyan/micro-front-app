# Troubleshooting Guide

## Module Federation "Eager Consumption" Error

If you see the error:
```
Uncaught Error: Shared module is not available for eager consumption
```

**Solution:** The issue has been fixed by:
1. Setting `eager: false` in shared module configuration
2. Using bootstrap pattern for async React loading
3. Adding proper CORS headers

**Action Required:** Restart both applications after the fix.

## HTTPS/Connection Issues

### Issue: "This site can't provide a secure connection" on https://localhost:3000

**Solution:** Use HTTP instead of HTTPS:
- ✅ Correct: `http://localhost:3000`
- ❌ Wrong: `https://localhost:3000`

### Using IP Address (e.g., http://192.168.31.147:3000)

If you're accessing the app via IP address, you may need to:

1. **Set REMOTE_URL environment variable** when starting the host app:
   ```bash
   REMOTE_URL=http://192.168.31.147:3001 npm run start:host
   ```

2. **Or update the webpack config** to use your IP address:
   Edit `build-config/webpack.host.config.js` and change:
   ```javascript
   const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3001';
   ```
   to:
   ```javascript
   const REMOTE_URL = process.env.REMOTE_URL || 'http://192.168.31.147:3001';
   ```

## Starting the Applications

1. **Terminal 1 - Start Remote App:**
   ```bash
   npm run start:remote
   ```
   Wait for it to start on port 3001

2. **Terminal 2 - Start Host App:**
   ```bash
   npm run start:host
   ```
   Or with custom remote URL:
   ```bash
   REMOTE_URL=http://192.168.31.147:3001 npm run start:host
   ```

3. **Access the application:**
   - Host: `http://localhost:3000` or `http://192.168.31.147:3000`
   - Remote: `http://localhost:3001` or `http://192.168.31.147:3001`

## Common Issues

### Remote components not loading

- Make sure remote app is running first
- Check browser console for CORS errors
- Verify the remote URL in webpack config matches your setup
- Check that `remoteEntry.js` is accessible at the remote URL

### React version mismatch

- Ensure both apps use the same React version (^18.2.0)
- Run `npm install` in root to sync dependencies

