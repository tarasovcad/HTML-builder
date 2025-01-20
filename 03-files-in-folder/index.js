const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error getting file stats:', err);
        return;
      }
      if (stats.isFile()) {
        const fileName = path.parse(file).name;
        const fileExt = path.parse(file).ext.slice(1);
        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExt} - ${fileSize}b`);
      }
    });
  });
});
