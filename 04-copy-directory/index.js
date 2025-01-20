const fs = require('fs/promises');
const path = require('path');
const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.rm(targetDir, { recursive: true, force: true });

    await fs.mkdir(targetDir);

    // Read the files in the source directory
    const files = await fs.readdir(sourceDir);

    const copyPromises = files.map((file) => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      return fs.copyFile(sourcePath, targetPath);
    });
    // Wait for all files to be copied
    await Promise.all(copyPromises);

    console.log('Directory copied successfully!');
  } catch (error) {
    console.error('Error copying directory:', error);
  }
}

copyDir();
