const fs = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const outputDir = path.join(__dirname, 'project-dist');
  const outputFile = path.join(outputDir, 'bundle.css');

  try {
    await fs.mkdir(outputDir, { recursive: true });

    // Read styles directory
    const files = await fs.readdir(stylesDir, { withFileTypes: true });

    // filter and collect their contents
    const cssContents = await Promise.all(
      files
        .filter((file) => file.isFile() && path.extname(file.name) === '.css')
        .map(async (file) => {
          const filePath = path.join(stylesDir, file.name);
          return await fs.readFile(filePath, 'utf8');
        }),
    );

    // combine them into a single string
    const bundleContent = cssContents.join('\n');

    // Write to bundle.css
    await fs.writeFile(outputFile, bundleContent);

    console.log('CSS bundle created successfully!');
  } catch (error) {
    console.error('Error creating CSS bundle:', error);
  }
}

mergeStyles();
