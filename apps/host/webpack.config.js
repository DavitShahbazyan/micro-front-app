const createWebpackConfig = require('../../build-config/webpack.base');

// Get remote URL from environment or use localhost
const REMOTE_URL = process.env.REMOTE_URL || 'http://localhost:3001';

module.exports = createWebpackConfig({
  entry: './src/index.jsx',
  port: 3000,
  name: 'host',
  moduleFederation: {
    remotes: {
      remote: `remote@${REMOTE_URL}/remoteEntry.js`,
    },
  },
  htmlTemplate: './public/index.html',
});

