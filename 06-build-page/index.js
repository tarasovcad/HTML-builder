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

buildPage();
