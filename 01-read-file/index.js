const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readStream.pipe(process.stdout);

readStream.on('error', (error) => {
  console.error('Error reading file:', error.message);
});
