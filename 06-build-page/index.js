const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  try {
    // project-dist directory
    await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    console.log('Project-dist directory created successfully');

    // read template file
    const templateContent = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );
    // replace tags
    let modifiedContent = templateContent;
    const tagRegex = /{{([^}]+)}}/g;
    const matches = templateContent.match(tagRegex) || [];

    for (const match of matches) {
      const componentName = match.replace(/[{}]/g, '');
      const componentContent = await getComponentContent(componentName);
      modifiedContent = modifiedContent.replace(match, componentContent);
    }

    // write the modified version
    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      modifiedContent,
    );
    // compile styles and copy assets
    await compileStyles();
    await copyDir(
      path.join(__dirname, 'assets'),
      path.join(__dirname, 'project-dist', 'assets'),
    );
    console.log('Assets copied successfully');
    console.log('HTML file created successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

// get component content
async function getComponentContent(componentName) {
  try {
    const content = await fs.readFile(
      path.join(__dirname, 'components', `${componentName}.html`),
      'utf-8',
    );
    return content;
  } catch (error) {
    console.error(`Error reading component ${componentName}:`, error);
    return '';
  }
}

// compile CSS files
async function compileStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const outputDir = path.join(__dirname, 'project-dist');

  try {
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

    // Write to style.css
    await fs.writeFile(path.join(outputDir, 'style.css'), bundleContent);

    console.log('CSS files compiled successfully');
  } catch (error) {
    console.error('Error compiling CSS files:', error);
  }
}

// copy assets folder
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

buildPage();
