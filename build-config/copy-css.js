const fs = require('fs');
const path = require('path');

const sharedDir = path.join(__dirname, '../shared');
const distDir = path.join(sharedDir, 'dist');

// Function to copy CSS files maintaining directory structure
function copyCSSFiles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyCSSFiles(srcPath, destPath);
    } else if (entry.name.endsWith('.css')) {
      // Ensure destination directory exists
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Copy CSS files from components to dist
const componentsDir = path.join(sharedDir, 'components');
const distComponentsDir = path.join(distDir, 'components');

if (fs.existsSync(componentsDir)) {
  copyCSSFiles(componentsDir, distComponentsDir);
  console.log('✅ CSS files copied successfully!');
} else {
  console.log('⚠️  Components directory not found');
}

