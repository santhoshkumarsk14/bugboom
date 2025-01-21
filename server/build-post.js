import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyDir(src, dest) {
  // Create the destination directory if it doesn't exist
  await fs.mkdir(dest, { recursive: true });

  // Read source directory contents
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directories
      await copyDir(srcPath, destPath);
    } else {
      // Copy files
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function moveFiles() {
  const sourceDir = path.resolve(__dirname, '..', 'dist', 'public');
  const targetDir = path.resolve(__dirname, '..', 'dist');

  try {
    // Copy all files and directories recursively
    await copyDir(sourceDir, targetDir);
    console.log('Successfully copied build files to dist directory');

    // Remove the public directory and its contents
    await fs.rm(sourceDir, { recursive: true, force: true });
    console.log('Cleaned up public directory');
  } catch (error) {
    console.error('Error copying build files:', error);
    process.exit(1);
  }
}

moveFiles();